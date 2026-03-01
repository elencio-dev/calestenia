import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const weekNumber = searchParams.get('week')
  const dayNumber = searchParams.get('day')

  const where: Record<string, unknown> = { userId: session.user.id }
  if (weekNumber) where.weekNumber = parseInt(weekNumber)
  if (dayNumber !== null) where.dayNumber = parseInt(dayNumber)

  const workouts = await prisma.workout.findMany({
    where,
    orderBy: { completedAt: 'desc' },
  })

  return NextResponse.json(workouts)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  try {
    const { weekNumber, dayNumber, duration, exerciseSets, isRest, userTimezone } = await req.json()

    if (dayNumber !== undefined && userTimezone) {
      const serverNow = new Date()
      // Create formatter for user's timezone
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: userTimezone,
        weekday: 'long',
      })
      const formatterParts = formatter.formatToParts(serverNow)
      const weekdayStr = formatterParts.find(p => p.type === 'weekday')?.value

      const weekdayMap: Record<string, number> = {
        'Sunday': 0, 'Monday': 1, 'Tuesday': 2,
        'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6
      }

      const currentLocalDay = weekdayStr ? weekdayMap[weekdayStr] : new Date().getDay()

      if (dayNumber > currentLocalDay) {
        return NextResponse.json({ error: 'Você não pode completar treinos referentes a dias futuros da semana.' }, { status: 403 })
      }
    }


    const workout = await prisma.workout.upsert({
      where: {
        userId_weekNumber_dayNumber: {
          userId: session.user.id,
          weekNumber,
          dayNumber,
        },
      },
      update: {
        duration: duration || 0,
        exerciseSets: JSON.stringify(exerciseSets || {}),
        completedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        weekNumber,
        dayNumber,
        duration: duration || 0,
        exerciseSets: JSON.stringify(exerciseSets || {}),
        isRest: isRest || false,
      },
    })

    // Update total workout count
    const completedWorkouts = await prisma.workout.count({
      where: { userId: session.user.id, isRest: false },
    })

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalWorkouts: completedWorkouts,
        lastWorkout: new Date(),
      },
    })

    return NextResponse.json(workout)
  } catch (error) {
    console.error('Workout save error:', error)
    return NextResponse.json({ error: 'Erro ao salvar treino' }, { status: 500 })
  }
}
