'use client'

import { useEffect } from 'react'
import { Ring, S, fmt } from './ui'
import { useCountdown } from '@/hooks/useTimer'

export function RestOverlay({ duration, onDone }: { duration: number; onDone: () => void }) {
  const colorFor = (t: number) => t < 10 ? '#F97316' : t < 20 ? '#F59E0B' : '#4ADE80'
  const { time, go, reset } = useCountdown(duration, onDone)

  useEffect(() => { go() }, [])
  
  const c = colorFor(time)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(18px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <p style={S.label()}>⏸ DESCANSANDO</p>
      <div style={{ marginTop: 28 }}>
        <Ring value={time} max={duration} size={200} color={c} thick={10}>
          <span style={{ ...S.title(56, c) }}>{fmt(time)}</span>
          <span style={{ fontSize: 12, color: '#444', marginTop: 4 }}>segundos</span>
        </Ring>
      </div>
      <p style={{ color: '#444', fontSize: 13, marginTop: 20, fontFamily: 'var(--font-barlow)', letterSpacing: 1 }}>
        Respire. Você está indo bem. 💪
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <button onClick={onDone} style={S.btn('#1a1a1a', 'md')}>Pular ⏩</button>
        <button onClick={() => reset(duration)} style={S.btn('#333', 'md')}>↺ Reset</button>
        <button onClick={onDone} style={S.btn(c, 'md')}>Pronto ✓</button>
      </div>
    </div>
  )
}
