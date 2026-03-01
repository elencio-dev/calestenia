'use client'

import { useState } from 'react'
import { S, Badge, EmojiIcon } from './ui'
import { useUserData } from '@/contexts/UserDataContext'
import { PHASES_INFO, getWeekProgram, getCurrentPhase } from '@/lib/program-data'

export function ProgramScreen() {
  const { userData } = useUserData()
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

  const DN = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const currentPhase = getCurrentPhase(userData.currentWeek)

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <p style={S.label()}>VISÃO GERAL DO PROGRAMA</p>
        <h2 style={{ ...S.title(28), marginTop: 8 }}>52 Semanas de Calistenia</h2>
        <p style={{ fontSize: 13, color: '#555', marginTop: 6, lineHeight: 1.5 }}>
          Do iniciante absoluto ao ginasta — um programa completo e progressivo.
        </p>
      </div>

      {PHASES_INFO.map(phase => {
        const isActive = currentPhase.id === phase.id
        const isPast = userData.currentWeek > phase.weeks[1]
        const expanded = expandedPhase === phase.id

        const weeksInPhase = Array.from(
          { length: phase.weeks[1] - phase.weeks[0] + 1 },
          (_, i) => phase.weeks[0] + i
        )

        return (
          <div key={phase.id} style={{ marginBottom: 12 }}>
            <button
              onClick={() => setExpandedPhase(expanded ? null : phase.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                background: isActive ? `${phase.color}12` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? phase.color + '40' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 14, padding: '14px 16px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <EmojiIcon emoji={phase.icon} size={28} />
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 18,
                    color: isActive ? phase.color : isPast ? '#4ADE80' : '#fff',
                  }}>
                    {phase.name}
                  </span>
                  {isActive && <Badge color={phase.color} sm>ATUAL</Badge>}
                  {isPast && <Badge color="#4ADE80" sm>✓ COMPLETO</Badge>}
                </div>
                <p style={{ margin: '3px 0 0', fontSize: 11, color: '#555' }}>
                  Semanas {phase.weeks[0]}–{phase.weeks[1]} · {phase.goal}
                </p>
              </div>
              <span style={{ color: '#444', fontSize: 18, transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>
                ▾
              </span>
            </button>

            {expanded && (
              <div style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '0 0 14px 14px', padding: 14,
                borderTop: 'none',
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {weeksInPhase.map(w => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeek(selectedWeek === w ? null : w)}
                      style={{
                        background: selectedWeek === w ? phase.color : w === userData.currentWeek ? `${phase.color}20` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${selectedWeek === w ? 'transparent' : w === userData.currentWeek ? phase.color + '50' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 8, padding: '5px 10px', cursor: 'pointer',
                        fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 12,
                        color: selectedWeek === w ? '#fff' : w === userData.currentWeek ? phase.color : '#555',
                        letterSpacing: 0.5,
                      }}
                    >
                      S{w}
                    </button>
                  ))}
                </div>

                {selectedWeek && weeksInPhase.includes(selectedWeek) && (() => {
                  const weekProg = getWeekProgram(selectedWeek)
                  return (
                    <div>
                      <p style={{ ...S.label(phase.color), marginBottom: 10 }}>{weekProg.theme}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {([1, 2, 3, 4, 5, 6, 0] as number[]).map(d => {
                          const dp = weekProg.days[d]
                          if (!dp) return null
                          return (
                            <div key={d} style={{
                              display: 'flex', alignItems: 'center', gap: 10,
                              background: 'rgba(255,255,255,0.02)',
                              border: `1px solid ${dp.color}20`,
                              borderRadius: 8, padding: '8px 12px',
                            }}>
                              <div style={{
                                width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                                background: `${dp.color}20`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 10,
                                color: dp.color,
                              }}>
                                {DN[d]}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 13, color: dp.rest ? '#444' : '#ccc', margin: 0 }}>
                                  {dp.name}
                                </p>
                                {!dp.rest && dp.exercises && (
                                  <p style={{ fontSize: 11, color: '#444', margin: '2px 0 0' }}>
                                    {dp.exercises.length} exercícios · {dp.exercises.reduce((a, e) => a + e.sets, 0)} séries
                                  </p>
                                )}
                              </div>
                              {dp.challenge && (
                                <span style={{ fontSize: 16 }}>🔥</span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
        )
      })}

      {/* Program philosophy */}
      <div style={{ ...S.card({ marginTop: 16 }) }}>
        <p style={{ ...S.label(), marginBottom: 14 }}>📚 PRINCÍPIOS DO PROGRAMA</p>
        {[
          { icon: '🎯', title: 'Progressão Linear', desc: 'Cada semana aumenta em volume ou dificuldade. Nunca fica igual.' },
          { icon: '💪', title: 'Forma Antes de Força', desc: 'Perfira reps perfeitas a muitas reps sloppy. Forma = prevenção de lesão.' },
          { icon: '😴', title: 'Descanso é Treino', desc: 'Domingo é recuperação obrigatória. Seus músculos crescem em repouso.' },
          { icon: '📈', title: 'Paciência + Consistência', desc: '52 semanas parece muito. São só 4 dias por semana. Você consegue.' },
        ].map(p => (
          <div key={p.title} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0 }}><EmojiIcon emoji={p.icon} size={22} color="#ccc" /></span>
            <div>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 14, color: '#ccc', margin: 0 }}>{p.title}</p>
              <p style={{ fontSize: 12, color: '#555', margin: '3px 0 0', lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
