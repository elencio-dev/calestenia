'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { useSession } from 'next-auth/react'

export interface UserData {
  id?: string
  name?: string
  email?: string
  weight?: number
  height?: number
  age?: number
  goal?: string
  currentWeek: number
  totalWorkouts: number
  streak: number
  workouts: Record<string, Record<string, number>> // week_day -> { exerciseId: setsCompleted }
  challenges: Record<string, number> // week_day -> progress
  skills: Record<string, boolean>
  achievements: string[]
}

interface UserDataContextType {
  userData: UserData
  setUserData: (data: Partial<UserData>) => Promise<void>
  updateWorkout: (weekNum: number, dayNum: number, exerciseId: string, sets: number, duration?: number) => Promise<void>
  updateChallenge: (weekNum: number, dayNum: number, progress: number, target: number) => Promise<void>
  unlockSkill: (skillKey: string) => Promise<void>
  unlockAchievement: (achievementId: string) => Promise<void>
  loading: boolean
  refetch: () => Promise<void>
  isWeekCompleted: (weekNum: number) => boolean
}

const defaultData: UserData = {
  currentWeek: 1,
  totalWorkouts: 0,
  streak: 0,
  workouts: {},
  challenges: {},
  skills: {},
  achievements: [],
}

const UserDataContext = createContext<UserDataContextType>({
  userData: defaultData,
  setUserData: async () => { },
  updateWorkout: async () => { },
  updateChallenge: async () => { },
  unlockSkill: async () => { },
  unlockAchievement: async () => { },
  loading: true,
  refetch: async () => { },
  isWeekCompleted: () => false,
})

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [userData, _setUserData] = useState<UserData>(defaultData)
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(async () => {
    if (!session?.user?.id) return

    try {
      const res = await fetch('/api/user')
      if (!res.ok) return

      const user = await res.json()

      // Build workouts map from DB data
      const workoutsMap: Record<string, Record<string, number>> = {}
      for (const w of user.workouts || []) {
        const key = `w${w.weekNumber}_d${w.dayNumber}`
        workoutsMap[key] = JSON.parse(w.exerciseSets || '{}')
      }

      // Build challenges map
      const challengesMap: Record<string, number> = {}
      for (const c of user.challenges || []) {
        const key = `ch_w${c.weekNumber}_d${c.dayNumber}`
        challengesMap[key] = c.progress
      }

      // Build skills map
      const skillsMap: Record<string, boolean> = {}
      for (const s of user.skills || []) {
        skillsMap[s.skillKey] = true
      }

      // Build achievements array
      const achievementsArr = (user.achievements || []).map((a: { achievementId: string }) => a.achievementId)

      // Dynamically calculate current week based on totalWorkouts
      let computedWeek = 1
      let remainingWorkouts = user.totalWorkouts || 0
      const { getWeekProgram } = require('@/lib/program-data')

      for (let i = 1; i <= 52; i++) {
        const prog = getWeekProgram(i)
        let workoutsThisWeek = 0
        for (let d = 0; d <= 6; d++) {
          if (prog?.days[d] && !prog.days[d].rest && (prog.days[d].exercises || []).length > 0) {
            workoutsThisWeek++
          }
        }

        if (workoutsThisWeek > 0) {
          if (remainingWorkouts >= workoutsThisWeek) {
            remainingWorkouts -= workoutsThisWeek
            computedWeek = i + 1 // Earned next week
          } else {
            break // User is currently in this week
          }
        }
      }

      // Cap at week 52
      if (computedWeek > 52) computedWeek = 52

      _setUserData({
        id: user.id,
        name: user.name,
        email: user.email,
        weight: user.weight,
        height: user.height,
        age: user.age,
        goal: user.goal,
        currentWeek: computedWeek,
        totalWorkouts: user.totalWorkouts || 0,
        streak: user.streak || 0,
        workouts: workoutsMap,
        challenges: challengesMap,
        skills: skillsMap,
        achievements: achievementsArr,
      })
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    } finally {
      setLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (status === 'authenticated') {
      refetch()
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status, refetch])

  const setUserData = useCallback(async (updates: Partial<UserData>) => {
    _setUserData(prev => ({ ...prev, ...updates }))

    // Persist profile/progress updates
    const profileKeys = ['name', 'weight', 'height', 'age', 'goal', 'currentWeek', 'totalWorkouts', 'streak']
    const profileUpdates: Record<string, unknown> = {}
    for (const key of profileKeys) {
      if (key in updates) profileUpdates[key] = (updates as Record<string, unknown>)[key]
    }

    if (Object.keys(profileUpdates).length > 0) {
      try {
        await fetch('/api/user', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileUpdates),
        })
      } catch (error) {
        console.error('Failed to update profile:', error)
      }
    }
  }, [])

  const isWeekCompleted = useCallback((weekNum: number) => {
    // We need prog to know how many non-rest days the week has.
    // However, UserDataContext doesn't import program-data to avoid circular dependencies potentially,
    // or we can just fetch it here. Let's import it.
    const { getWeekProgram } = require('@/lib/program-data')
    const prog = getWeekProgram(weekNum)
    let completedDays = 0
    let totalNonRestDays = 0

    for (let d = 0; d <= 6; d++) {
      const dp = prog?.days[d]
      if (!dp || dp.rest) continue
      totalNonRestDays++

      const k = `w${weekNum}_d${d}`
      const dayProg = userData.workouts[k] || {}
      const exs = dp.exercises || []

      if (exs.length === 0) continue
      const ts = exs.reduce((a: any, e: any) => a + e.sets, 0)
      const ds = exs.reduce((a: any, e: any) => a + Math.min(e.sets, dayProg[e.id] ?? 0), 0)
      if (ds === ts && ts > 0) {
        completedDays++
      }
    }
    return completedDays >= totalNonRestDays && totalNonRestDays > 0
  }, [userData.workouts])

  const updateWorkout = useCallback(async (weekNum: number, dayNum: number, exerciseId: string, sets: number, duration = 0) => {
    _setUserData(prev => {
      const key = `w${weekNum}_d${dayNum}`
      const current = prev.workouts[key] || {}
      return {
        ...prev,
        workouts: {
          ...prev.workouts,
          [key]: { ...current, [exerciseId]: sets },
        },
      }
    })

    // Get current exercise sets for this workout
    const key = `w${weekNum}_d${dayNum}`
    _setUserData(prev => {
      const exerciseSets = prev.workouts[key] || {}
      // Save to API
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo'

      fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weekNumber: weekNum,
          dayNumber: dayNum,
          duration,
          exerciseSets: { ...exerciseSets, [exerciseId]: sets },
          userTimezone,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const data = await res.json()
          alert(`Erro ao salvar: ${data.error || 'Não foi possível registrar o treino.'}`)
          // Rollback the local state if the server rejected it
          _setUserData(prevRollback => ({
            ...prevRollback,
            workouts: {
              ...prevRollback.workouts,
              [key]: exerciseSets, // Restore previous state
            }
          }))
        }
      }).catch(console.error)
      return prev
    })
  }, [])

  const updateChallenge = useCallback(async (weekNum: number, dayNum: number, progress: number, target: number) => {
    const key = `ch_w${weekNum}_d${dayNum}`
    _setUserData(prev => ({
      ...prev,
      challenges: { ...prev.challenges, [key]: progress },
    }))

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo'

    try {
      await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weekNumber: weekNum, dayNumber: dayNum, progress, target, userTimezone }),
      })
    } catch (error) {
      console.error('Failed to update challenge:', error)
    }
  }, [])

  const unlockSkill = useCallback(async (skillKey: string) => {
    _setUserData(prev => ({
      ...prev,
      skills: { ...prev.skills, [skillKey]: true },
    }))

    try {
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillKey }),
      })
    } catch (error) {
      console.error('Failed to unlock skill:', error)
    }
  }, [])

  const unlockAchievement = useCallback(async (achievementId: string) => {
    _setUserData(prev => {
      if (prev.achievements.includes(achievementId)) return prev
      return { ...prev, achievements: [...prev.achievements, achievementId] }
    })

    try {
      await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievementId }),
      })
    } catch (error) {
      console.error('Failed to unlock achievement:', error)
    }
  }, [])

  return (
    <UserDataContext.Provider value={{
      userData, setUserData, updateWorkout, updateChallenge,
      unlockSkill, unlockAchievement, loading, refetch,
      isWeekCompleted
    }}>
      {children}
    </UserDataContext.Provider>
  )
}

export function useUserData() {
  return useContext(UserDataContext)
}
