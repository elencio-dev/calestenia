'use client'

import React from 'react'
import { Trophy, Compass, ArrowRight, ArrowLeftRight, Crown, CornerRightUp, Star, Circle, Hand, Target, Rocket, Activity, Dumbbell, Swords, Sword, Calendar, Shield, Flag, CheckCircle2, Moon, Sparkles, Scale, HeartPulse, SquareActivity, Maximize, PlayCircle, Zap, BicepsFlexed } from 'lucide-react'

// Design tokens
export const S = {
  card: (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 14,
    padding: 18,
    ...extra,
  }),
  label: (col = 'var(--text-muted)'): React.CSSProperties => ({
    margin: 0, fontSize: 10, color: col, letterSpacing: 3,
    fontFamily: 'var(--font-barlow)', fontWeight: 700, textTransform: 'uppercase' as const,
  }),
  title: (sz = 24, col = 'var(--text-base)'): React.CSSProperties => ({
    margin: 0, fontFamily: 'var(--font-barlow)', fontWeight: 800,
    fontSize: sz, color: col, letterSpacing: 0.5, lineHeight: 1,
  }),
  btn: (bg = 'var(--accent-primary)', sz: 'sm' | 'md' | 'lg' = 'md', extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: bg, border: 'none', borderRadius: 9, cursor: 'pointer', color: '#fff',
    fontFamily: 'var(--font-barlow)', fontWeight: 700,
    fontSize: sz === 'lg' ? 18 : sz === 'sm' ? 11 : 14,
    letterSpacing: 1.5,
    padding: sz === 'lg' ? '13px 32px' : sz === 'sm' ? '5px 12px' : '9px 20px',
    transition: 'all 0.15s',
    ...extra,
  }),
}

export function Ring({
  value, max, size = 80, color = '#F97316', thick = 6, children,
}: {
  value: number; max: number; size?: number; color?: string; thick?: number; children?: React.ReactNode
}) {
  const r = (size - thick * 2) / 2
  const C2 = 2 * Math.PI * r
  const pct = max > 0 ? Math.min(1, value / max) : 0

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={thick} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
          strokeWidth={thick} strokeLinecap="round"
          strokeDasharray={C2} strokeDashoffset={C2 - pct * C2}
          style={{ transition: 'stroke-dashoffset 0.4s ease', filter: `drop-shadow(0 0 5px ${color}88)` }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}

export function Badge({ color = '#F97316', children, sm }: { color?: string; children: React.ReactNode; sm?: boolean }) {
  return (
    <span style={{
      background: `${color}22`, color, border: `1px solid ${color}44`,
      borderRadius: 5, padding: sm ? '2px 7px' : '4px 10px',
      fontSize: sm ? 10 : 11, fontFamily: 'var(--font-barlow)',
      fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
    }}>
      {children}
    </span>
  )
}

export const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export function LucideIcon({ name, size = 20, color = "currentColor" }: { name: string, size?: number, color?: string }) {
  const map: Record<string, any> = {
    'Trophy': Trophy, 'Activity': Activity, 'Zap': Zap, 'Flame': Zap,
    'Dumbbell': Dumbbell, 'Target': Target, 'Rocket': Rocket, 'Star': Star,
    'Calendar': Calendar, 'Shield': Shield, 'Swords': Swords, 'Sword': Sword,
    'Flag': Flag, 'CheckCircle2': CheckCircle2, 'Moon': Moon, 'Scale': Scale,
    'HeartPulse': HeartPulse, 'SquareActivity': SquareActivity, 'Maximize': Maximize,
    'PlayCircle': PlayCircle, 'Compass': Compass, 'ArrowRight': ArrowRight,
    'ArrowLeftRight': ArrowLeftRight, 'Crown': Crown, 'CornerRightUp': CornerRightUp,
    'Circle': Circle, 'Hand': Hand, 'BicepsFlexed': BicepsFlexed, 'Sparkles': Sparkles
  }
  const Comp = map[name] || Dumbbell
  return <span style={{ display: 'inline-flex', alignItems: 'center' }}><Comp size={size} color={color} /></span>
}
