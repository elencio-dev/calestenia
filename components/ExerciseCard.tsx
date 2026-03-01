'use client'

import { useState, useEffect } from 'react'
import { S, Ring, fmt, LucideIcon } from './ui'
import { useCountdown } from '@/hooks/useTimer'
import { MOV, ExerciseEntry } from '@/lib/program-data'
import { CheckCircle2 } from 'lucide-react'

interface ExCardProps {
  exData: ExerciseEntry
  dayProgress: Record<string, number>
  onUpdate: (id: string, val: number) => void
  onRest: (duration: number) => void
  idx: number
}

export function ExCard({ exData, dayProgress, onUpdate, onRest, idx }: ExCardProps) {
  const { id, sets, reps, duration: dur, rest: restTime } = exData
  const done = dayProgress[id] ?? 0
  const isComplete = done >= sets
  const isTimed = !!dur
  const [expanded, setExpanded] = useState(false)
  const [counting, setCounting] = useState(false)

  const mov = MOV[id]
  if (!mov) return null

  const { time: cdTime, running: cdRunning, go: cdGo, reset: cdReset } = useCountdown(
    dur || 30,
    () => { setCounting(false); handleSet() }
  )

  const handleSet = () => {
    if (done >= sets) return
    const newDone = done + 1
    onUpdate(id, newDone)
    if (newDone < sets && restTime) {
      onRest(restTime)
    }
  }

  const handleTimedSet = () => {
    if (counting) {
      setCounting(false)
      cdReset()
    } else {
      setCounting(true)
      cdGo()
    }
  }

  const setColor = '#F97316'
  const doneColor = '#4ADE80'
  const catColors: Record<string, string> = {
    push: '#F97316', pull: '#60A5FA', legs: '#4ADE80',
    core: '#A855F7', skill: '#F59E0B', mobility: '#EC4899',
  }
  const catColor = catColors[mov.cat] || '#F97316'

  return (
    <div style={{
      ...S.card({ marginBottom: 10, opacity: isComplete ? 0.7 : 1 }),
      border: isComplete ? '1px solid rgba(74,222,128,0.2)' : '1px solid rgba(255,255,255,0.07)',
      transition: 'all 0.2s',
    }}>
      {/* Header */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
        onClick={() => setExpanded(e => !e)}
      >
        <div style={{
          width: 44, height: 44, borderRadius: 10, flexShrink: 0,
          background: isComplete ? 'rgba(74,222,128,0.1)' : `${catColor}15`,
          border: `1px solid ${isComplete ? 'rgba(74,222,128,0.3)' : catColor + '33'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {isComplete ? <CheckCircle2 size={24} color="#4ADE80" /> : <LucideIcon name={mov.icon} size={24} color={catColor} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <p style={{ ...S.title(16), flex: '0 0 auto', maxWidth: '100%' }}>{mov.name}</p>
            {isComplete && <span style={{ fontSize: 10, color: '#4ADE80', fontFamily: 'var(--font-barlow)', fontWeight: 700, letterSpacing: 1 }}>✓ FEITO</span>}
          </div>
          <p style={{ ...S.label(catColor), marginTop: 3 }}>{mov.cat.toUpperCase()}</p>
        </div>
        <Ring value={done} max={sets} size={52} color={isComplete ? '#4ADE80' : setColor} thick={4}>
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 14, color: isComplete ? '#4ADE80' : '#fff' }}>
            {done}/{sets}
          </span>
        </Ring>
      </div>

      {/* Action row */}
      {!isComplete && (
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {isTimed ? (
            <>
              <button
                onClick={handleTimedSet}
                style={{
                  ...S.btn(counting ? '#F97316' : '#1a1a1a', 'md'),
                  border: counting ? 'none' : '1px solid #2a2a2a',
                  minWidth: 120,
                }}
              >
                {counting ? `⏱ ${fmt(cdTime)}` : `▶ ${dur}s`}
              </button>
              {counting && (
                <Ring value={cdTime} max={dur || 30} size={40} color="#F97316" thick={3}>
                  <span style={{ fontSize: 10, color: '#F97316', fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>{cdTime}</span>
                </Ring>
              )}
            </>
          ) : (
            <>
              <button onClick={handleSet} style={S.btn('#F97316', 'md')}>
                + Série ({reps} reps)
              </button>
              {[5, 10, 15, 20].filter(v => v !== reps).slice(0, 3).map(v => (
                <button key={v} onClick={handleSet} style={{ ...S.btn('#1a1a1a', 'sm'), border: '1px solid #2a2a2a' }}>
                  +{v}
                </button>
              ))}
            </>
          )}
          {done > 0 && (
            <button onClick={() => onUpdate(id, done - 1)} style={{ ...S.btn('#1a1a1a', 'sm'), border: '1px solid #2a2a2a' }}>
              ↩
            </button>
          )}
        </div>
      )}

      {/* Expanded details */}
      {expanded && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ ...S.label('#60A5FA'), marginBottom: 10 }}>🎯 PONTOS DE FORMA</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            {mov.cues.map((cue, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#F97316', fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                  {i + 1}.
                </span>
                <span style={{ fontSize: 13, color: '#ccc', lineHeight: 1.5 }}>{cue}</span>
              </div>
            ))}
          </div>

          <p style={{ ...S.label('#60A5FA'), margin: '14px 0 8px' }}>📹 COMO EXECUTAR</p>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 }}>{mov.how}</p>

          {mov.progression && (
            <>
              <p style={{ ...S.label('#A855F7'), margin: '14px 0 8px' }}>📈 LINHA DE PROGRESSÃO</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {mov.progression.split(' → ').map((step, i, arr) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      background: step === mov.name ? '#A855F722' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${step === mov.name ? '#A855F7' : 'transparent'}`,
                      borderRadius: 6, padding: '3px 10px', fontSize: 11,
                      color: step === mov.name ? '#A855F7' : '#777',
                    }}>
                      {step}
                    </span>
                    {i < arr.length - 1 && <span style={{ color: '#333', fontSize: 12 }}>→</span>}
                  </span>
                ))}
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: '#444' }}>⏱ Descanso: <strong style={{ color: '#aaa' }}>{restTime}s</strong></span>
            <span style={{ fontSize: 12, color: '#444' }}>{isTimed ? `⏳ Duração: ${dur}s` : `🔁 Reps: ${reps}`}</span>
            <span style={{ fontSize: 12, color: '#444' }}>📦 Séries: {sets}</span>
          </div>
        </div>
      )}
    </div>
  )
}
