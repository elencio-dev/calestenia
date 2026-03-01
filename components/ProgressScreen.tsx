'use client'

import { S, Badge, LucideIcon } from './ui'
import { useUserData } from '@/contexts/UserDataContext'
import { CheckCircle2 } from 'lucide-react'
import { getCurrentPhase, PHASES_INFO, ACHIEVEMENTS_DEF } from '@/lib/program-data'

export function ProgressScreen() {
  const { userData, unlockSkill, unlockAchievement } = useUserData()
  const phase = getCurrentPhase(userData.currentWeek)

  const newAchievements = ACHIEVEMENTS_DEF.filter(a => !userData.achievements.includes(a.id))
  const unlockedAchievements = ACHIEVEMENTS_DEF.filter(a => userData.achievements.includes(a.id))

  const skillsList = [
    { key: 'pistol', name: 'Pistol Squat', icon: '🔫' },
    { key: 'muscleup', name: 'Muscle-Up', icon: '👑' },
    { key: 'handstand', name: 'Handstand 30s', icon: '🤸' },
    { key: 'frontlever', name: 'Front Lever', icon: '🌠' },
  ]

  // Build weekly activity for past 8 weeks
  const weeklyData = Array.from({ length: 8 }, (_, i) => {
    const w = userData.currentWeek - 7 + i
    if (w < 1) return { week: w, workouts: 0 }
    let count = 0
    for (let d = 0; d <= 6; d++) {
      if (userData.workouts[`w${w}_d${d}`]) count++
    }
    return { week: w, workouts: count }
  })

  const maxW = Math.max(...weeklyData.map(x => x.workouts), 6)

  return (
    <div>
      {/* Phase progress */}
      <div style={{
        background: `linear-gradient(135deg,${phase.color}15,${phase.color}05)`,
        border: `1px solid ${phase.color}30`,
        borderRadius: 14, padding: 20, marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <LucideIcon name={phase.icon} size={36} color={phase.color} />
          <div>
            <p style={{ ...S.label(phase.color) }}>FASE ATUAL</p>
            <h2 style={{ ...S.title(28, phase.color), marginTop: 4 }}>{phase.name}</h2>
            <p style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{phase.goal}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {[
            { l: 'SEMANA', v: userData.currentWeek, c: phase.color },
            { l: 'TREINOS', v: userData.totalWorkouts, c: '#4ADE80' },
            { l: 'STREAK', v: `${Math.min(7, userData.totalWorkouts % 8)}d`, c: '#F59E0B' },
          ].map(s => (
            <div key={s.l} style={{
              background: `${s.c}11`, border: `1px solid ${s.c}22`,
              borderRadius: 10, padding: '12px 10px', textAlign: 'center',
            }}>
              <p style={{ ...S.title(28, s.c), display: 'block' }}>{s.v}</p>
              <p style={{ ...S.label(), marginTop: 4 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phase timeline */}
      <div style={{ ...S.card({ marginBottom: 16 }) }}>
        <p style={{ ...S.label(), marginBottom: 14 }}>📍 JORNADA DAS 52 SEMANAS</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PHASES_INFO.map(p => {
            const isActive = phase.id === p.id
            const isPast = userData.currentWeek > p.weeks[1]
            const progress = isPast ? 100 : isActive
              ? Math.round(((userData.currentWeek - p.weeks[0]) / (p.weeks[1] - p.weeks[0] + 1)) * 100)
              : 0
            return (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flexShrink: 0 }}><LucideIcon name={p.icon} size={16} color={isActive ? p.color : isPast ? '#4ADE80' : '#444'} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{
                      fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 12,
                      color: isActive ? p.color : isPast ? '#4ADE80' : '#333',
                      letterSpacing: 1,
                    }}>
                      {p.name} {isActive ? '← VOCÊ' : isPast ? '✓' : ''}
                    </span>
                    <span style={{ fontSize: 11, color: '#444' }}>Sem. {p.weeks[0]}–{p.weeks[1]}</span>
                  </div>
                  <div style={{ background: '#111', borderRadius: 999, height: 5, overflow: 'hidden' }}>
                    <div style={{
                      width: `${progress}%`, height: '100%',
                      background: isPast ? '#4ADE80' : `linear-gradient(90deg,${p.color},${p.color}aa)`,
                      borderRadius: 999, transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: 11, color: '#444', flexShrink: 0 }}>{progress}%</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Weekly chart */}
      <div style={{ ...S.card({ marginBottom: 16 }) }}>
        <p style={{ ...S.label(), marginBottom: 16 }}>📊 ATIVIDADE SEMANAL</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
          {weeklyData.map((w, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: '100%', borderRadius: 4,
                height: w.workouts > 0 ? `${Math.max(10, (w.workouts / maxW) * 70)}px` : 4,
                background: w.week === userData.currentWeek
                  ? 'linear-gradient(180deg,#F97316,#F59E0B)'
                  : w.workouts > 0 ? '#2a2a2a' : '#111',
                transition: 'height 0.4s ease',
              }} />
              <span style={{ fontSize: 9, color: '#333', fontFamily: 'var(--font-barlow)', fontWeight: 700 }}>
                {w.week > 0 ? `S${w.week}` : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills tracker */}
      <div style={{ ...S.card({ marginBottom: 16 }) }}>
        <p style={{ ...S.label(), marginBottom: 14 }}>🏆 HABILIDADES DESBLOQUEADAS</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {skillsList.map(skill => {
            const unlocked = userData.skills[skill.key]
            return (
              <button
                key={skill.key}
                onClick={() => !unlocked && unlockSkill(skill.key)}
                style={{
                  background: unlocked ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${unlocked ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 12, padding: 14, cursor: unlocked ? 'default' : 'pointer',
                  textAlign: 'left', transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ display: 'flex' }}>
                    {unlocked ? <CheckCircle2 size={24} color="#4ADE80" /> : <LucideIcon name={skill.icon} size={24} color="#666" />}
                  </span>
                  {unlocked && <Badge color="#4ADE80" sm>DESBLOQUEADO</Badge>}
                </div>
                <p style={{
                  fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 14,
                  color: unlocked ? '#4ADE80' : '#666', margin: 0,
                }}>
                  {skill.name}
                </p>
                {!unlocked && <p style={{ fontSize: 11, color: '#444', marginTop: 4 }}>Toque quando conseguir!</p>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ ...S.card({ marginBottom: 16 }) }}>
        <p style={{ ...S.label(), marginBottom: 14 }}>
          🎖️ CONQUISTAS ({unlockedAchievements.length}/{ACHIEVEMENTS_DEF.length})
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {unlockedAchievements.map(a => (
            <div key={a.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: 10, padding: '10px 14px',
            }}>
              <LucideIcon name={a.icon} size={24} color="#F97316" />
              <div>
                <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 14, color: '#F97316', margin: 0 }}>{a.name}</p>
                <p style={{ fontSize: 12, color: '#555', margin: '2px 0 0' }}>{a.desc}</p>
              </div>
            </div>
          ))}
          {newAchievements.slice(0, 5).map(a => (
            <div key={a.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 10, padding: '10px 14px',
            }}>
              <LucideIcon name={a.icon} size={24} color="#444" />
              <div>
                <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 14, color: '#444', margin: 0 }}>{a.name}</p>
                <p style={{ fontSize: 12, color: '#333', margin: '2px 0 0' }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
