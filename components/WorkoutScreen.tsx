'use client'

import { useState, useEffect } from 'react'
import { S, Ring, fmt } from './ui'
import { RestOverlay } from './RestOverlay'
import { ExCard } from './ExerciseCard'
import { useUserData } from '@/contexts/UserDataContext'
import { getWeekProgram, getCurrentPhase } from '@/lib/program-data'
import { useTimer } from '@/hooks/useTimer'
import { Flame, Trophy, Play, Pause, RotateCcw, Moon, CheckCircle2, HelpCircle, Dumbbell, Activity, Target, Zap, ActivitySquare, Lock } from 'lucide-react'

function ChallengeWidget({ challenge, progress, onAdd }: {
  challenge: { name: string; target: number; unit: string; icon: string }
  progress: number
  onAdd: (n: number) => void
}) {
  const [n, setN] = useState(10)
  const done = progress >= challenge.target
  const pct = Math.min(100, (progress / challenge.target) * 100)

  return (
    <div style={{
      background: 'linear-gradient(135deg,rgba(249,115,22,0.1),rgba(249,115,22,0.02))',
      border: `1px solid ${done ? 'rgba(74,222,128,0.4)' : 'rgba(249,115,22,0.3)'}`,
      borderRadius: 16, padding: 18, marginBottom: 18, transition: 'border-color 0.3s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <p style={S.label('#F97316')}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Flame size={14} color="#F97316" /> DESAFIO DO DIA</span></p>
          <p style={{ ...S.title(22), marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>{challenge.icon} {challenge.name}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ ...S.title(42, done ? '#4ADE80' : '#F97316'), display: 'block' }}>{progress}</span>
          <span style={{ fontSize: 12, color: '#555' }}>/ {challenge.target} {challenge.unit}</span>
        </div>
      </div>
      <div style={{ background: '#111', borderRadius: 999, height: 7, overflow: 'hidden', marginBottom: done ? 0 : 16 }}>
        <div style={{
          width: `${pct}%`, height: '100%', borderRadius: 999,
          background: done ? '#4ADE80' : 'linear-gradient(90deg,#F97316,#F59E0B)',
          transition: 'width 0.5s ease',
          boxShadow: `0 0 10px ${done ? '#4ADE80' : '#F97316'}88`,
        }} />
      </div>
      {done ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
          <Trophy size={28} color="#4ADE80" />
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 20, color: '#4ADE80', letterSpacing: 1 }}>
            DESAFIO CONCLUÍDO! INCRÍVEL!
          </span>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number" min={1} max={500} value={n}
            onChange={e => setN(Math.max(1, Number(e.target.value)))}
            style={{
              background: '#111', border: '1px solid #222', borderRadius: 8,
              color: '#fff', fontFamily: 'var(--font-barlow)', fontWeight: 700,
              fontSize: 20, width: 70, padding: '8px 12px', textAlign: 'center', outline: 'none',
            }}
          />
          <button onClick={() => onAdd(n)} style={S.btn('#F97316')}>+ Adicionar</button>
          {[5, 10, 20, 50].map(v => (
            <button key={v} onClick={() => onAdd(v)} style={{ ...S.btn('#1a1a1a', 'sm'), border: '1px solid #2a2a2a' }}>
              +{v}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function WorkoutScreen() {
  const { userData, setUserData, updateWorkout, updateChallenge } = useUserData()
  const today = new Date().getDay()
  const [selDay, setSelDay] = useState(today)
  const [restDur, setRestDur] = useState<number | null>(null)
  const { time: wTime, running: wRunning, start: wStart, pause: wPause, reset: wReset } = useTimer()

  const weekNum = userData.currentWeek
  const prog = getWeekProgram(weekNum)
  const dayData = prog?.days[selDay]
  const phase = getCurrentPhase(weekNum)

  const wKey = `w${weekNum}_d${selDay}`
  const dayProg = userData.workouts[wKey] || {}
  const exs = dayData?.exercises || []
  const totalSets = exs.reduce((a, e) => a + e.sets, 0)
  const doneSets = exs.reduce((a, e) => a + Math.min(e.sets, dayProg[e.id] ?? 0), 0)
  const pct = totalSets > 0 ? (doneSets / totalSets) * 100 : 0
  const allDone = pct === 100 && exs.length > 0

  const challengeKey = `ch_w${weekNum}_d${selDay}`
  const challengeVal = userData.challenges[challengeKey] || 0

  const handleUpdExercise = (id: string, val: number) => {
    updateWorkout(weekNum, selDay, id, val, wTime)
    // Check if workout is now complete
    const newDayProg = { ...dayProg, [id]: val }
    const newDoneSets = exs.reduce((a, e) => a + Math.min(e.sets, newDayProg[e.id] ?? 0), 0)
    if (newDoneSets === totalSets && totalSets > 0) {
      setUserData({ totalWorkouts: userData.totalWorkouts + 1 })
    }
  }

  const handleAddChallenge = (n: number) => {
    const newProg = challengeVal + n
    updateChallenge(weekNum, selDay, newProg, dayData?.challenge?.target || 100)
  }

  const DN = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const getDayIcon = (d: number) => {
    const dp = prog?.days[d]
    if (!dp) return <HelpCircle size={22} />
    if (dp.rest) return <Moon size={22} />
    const name = (dp.name || '').toLowerCase()
    if (name.includes('empurrar') || name.includes('push')) return <Dumbbell size={22} />
    if (name.includes('puxar') || name.includes('pull')) return <ActivitySquare size={22} />
    if (name.includes('perna') || name.includes('leg')) return <Activity size={22} />
    if (name.includes('core')) return <Target size={22} />
    if (name.includes('full') || name.includes('celebração')) return <Zap size={22} />
    return <Activity size={22} />
  }

  const isDayDone = (d: number) => {
    const k = `w${weekNum}_d${d}`
    const dp2 = userData.workouts[k] || {}
    const dp3 = prog?.days[d]
    if (!dp3 || dp3.rest) return false
    const ex2 = dp3.exercises || []
    if (ex2.length === 0) return false
    const ts = ex2.reduce((a, e) => a + e.sets, 0)
    const ds = ex2.reduce((a, e) => a + Math.min(e.sets, dp2[e.id] ?? 0), 0)
    return ds === ts
  }

  // Calculate highest unlocked day for the active week
  const getIsDayUnlocked = (d: number) => {
    return d === today
  }

  const isDayUnlocked = getIsDayUnlocked(selDay)

  return (
    <div>
      {restDur !== null && <RestOverlay duration={restDur} onDone={() => setRestDur(null)} />}

      {/* Phase badge */}
      <div style={{
        background: `linear-gradient(135deg,${phase.color}18,${phase.color}06)`,
        border: `1px solid ${phase.color}33`,
        borderRadius: 10, padding: '10px 16px', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ display: 'flex' }}>{phase.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, color: phase.color, fontSize: 13, letterSpacing: 1 }}>
            FASE {phase.name} · SEMANA {weekNum}
          </span>
          <p style={{ margin: 0, fontSize: 11, color: '#555' }}>{phase.goal}</p>
        </div>
      </div>

      {/* Day selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5, marginBottom: 18 }}>
        {[1, 2, 3, 4, 5, 6, 0].map(d => {
          const dp = prog?.days[d]
          const active = selDay === d
          const done2 = isDayDone(d)
          const isToday = d === today
          return (
            <button
              key={d}
              onClick={() => {
                if (getIsDayUnlocked(d)) {
                  setSelDay(d)
                }
              }}
              style={{
                background: active ? '#F97316' : done2 ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.03)',
                border: active ? '2px solid #F97316' : done2 ? '1px solid rgba(74,222,128,0.3)' : isToday ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '8px 4px',
                cursor: getIsDayUnlocked(d) ? 'pointer' : 'not-allowed',
                opacity: getIsDayUnlocked(d) ? 1 : 0.4,
                transition: 'all 0.15s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}
            >
              <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 11, color: active ? '#fff' : '#555', letterSpacing: 1 }}>
                {DN[d]}
              </span>
              <span style={{ display: 'flex', color: done2 ? '#4ADE80' : (active ? '#fff' : '#888') }}>
                {!getIsDayUnlocked(d) ? <Lock size={22} /> : done2 ? <CheckCircle2 size={22} /> : getDayIcon(d)}
              </span>
              {isToday && !active && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#F97316' }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Day title */}
      {dayData && (
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ ...S.label(), marginBottom: 4 }}>
              {DN[selDay].toUpperCase()} · {(dayData.name || '').toUpperCase()}
            </p>
            <h2 style={{ ...S.title(28), lineHeight: 1.1 }}>{prog?.theme}</h2>
          </div>
          <Ring value={pct} max={100} size={80} color={allDone ? '#4ADE80' : '#F97316'}>
            <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 14, color: allDone ? '#4ADE80' : '#fff' }}>
              {Math.round(pct)}%
            </span>
          </Ring>
        </div>
      )}

      {/* Rest day */}
      {dayData?.rest ? (
        <div style={{
          ...S.card({ padding: 32, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }),
          marginBottom: 16,
        }}>
          <Moon size={48} color="#555" style={{ margin: '0 auto' }} />
          <h3 style={{ ...S.title(24), marginTop: 12 }}>{dayData.name}</h3>
          <p style={{ color: '#555', fontSize: 14, marginTop: 8 }}>Recuperação é parte do treino. Seu corpo cresce no descanso.</p>
        </div>
      ) : (
        <>
          {/* Locked State Overlay */}
          {!isDayUnlocked ? (
            <div style={{
              ...S.card({ padding: 32, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', marginTop: 16 }),
            }}>
              <Lock size={48} color="#555" style={{ margin: '0 auto' }} />
              <h3 style={{ ...S.title(24), marginTop: 12 }}>Dia Bloqueado</h3>
              <p style={{ color: '#555', fontSize: 14, marginTop: 8 }}>
                Você só pode realizar o treino correspondente ao dia exato de hoje. Volte no dia correto!
              </p>
            </div>
          ) : (
            <>
              {/* Timer */}
              <div style={{ ...S.card({ padding: '12px 18px', marginBottom: 16 }), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={S.label()}>TEMPO DE TREINO</p>
                  <span style={{ ...S.title(40, wRunning ? '#F97316' : '#fff'), display: 'block', marginTop: 2 }}>
                    {fmt(wTime)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {!wRunning
                    ? <button onClick={wStart} style={{ ...S.btn('#F97316'), display: 'flex', alignItems: 'center', gap: 4 }}><Play size={16} /> INICIAR</button>
                    : <button onClick={wPause} style={{ ...S.btn('#333'), display: 'flex', alignItems: 'center', gap: 4 }}><Pause size={16} /> PAUSAR</button>
                  }
                  <button onClick={wReset} style={{ ...S.btn('#1a1a1a', 'sm'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RotateCcw size={16} /></button>
                </div>
              </div>

              {/* Challenge */}
              {dayData?.challenge && (
                <ChallengeWidget
                  challenge={dayData.challenge}
                  progress={challengeVal}
                  onAdd={handleAddChallenge}
                />
              )}

              {/* Completion banner */}
              {allDone && (
                <div style={{
                  background: 'linear-gradient(135deg,rgba(74,222,128,0.15),rgba(74,222,128,0.05))',
                  border: '1px solid rgba(74,222,128,0.4)',
                  borderRadius: 14, padding: '16px 20px', marginBottom: 16,
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <Trophy size={32} color="#4ADE80" />
                  <div>
                    <p style={{ ...S.title(18, '#4ADE80') }}>TREINO COMPLETO!</p>
                    <p style={{ fontSize: 12, color: '#555', marginTop: 4 }}>Excelente trabalho! Descanse e volte amanhã.</p>
                  </div>
                </div>
              )}

              {/* Exercises */}
              <div>
                {exs.map((e, i) => (
                  <ExCard
                    key={e.id}
                    exData={e}
                    dayProgress={dayProg}
                    onUpdate={handleUpdExercise}
                    onRest={setRestDur}
                    idx={i}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
