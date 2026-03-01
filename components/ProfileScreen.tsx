'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useUserData } from '@/contexts/UserDataContext'
import { S } from './ui'
import { User, Leaf, Zap, Dumbbell, Trophy, LogOut } from 'lucide-react'

export function ProfileScreen() {
  const { userData, setUserData } = useUserData()
  const [name, setName] = useState(userData.name || '')
  const [weight, setWeight] = useState(userData.weight?.toString() || '')
  const [height, setHeight] = useState(userData.height?.toString() || '')
  const [age, setAge] = useState(userData.age?.toString() || '')
  const [goal, setGoal] = useState(userData.goal || '')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const bmi = weight && height
    ? (parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1)
    : null

  const save = async () => {
    setLoading(true)
    await setUserData({
      name: name || undefined,
      weight: weight ? parseFloat(weight) : undefined,
      height: height ? parseFloat(height) : undefined,
      age: age ? parseInt(age) : undefined,
      goal: goal || undefined,
    })
    setSaved(true)
    setLoading(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const iS: React.CSSProperties = {
    background: '#111', border: '1px solid #222', borderRadius: 9,
    color: '#fff', fontFamily: 'var(--font-dm-sans)',
    fontWeight: 600, fontSize: 16,
    padding: '11px 14px', width: '100%', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div>
      <div style={{ ...S.card({ marginBottom: 18 }) }}>
        {/* Avatar */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20 }}>
          <div style={{
            width: 68, height: 68, borderRadius: '50%',
            background: 'linear-gradient(135deg,#F97316,#F59E0B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, flexShrink: 0,
          }}>
            {name ? name[0].toUpperCase() : <User color="#fff" size={32} />}
          </div>
          <div>
            <h2 style={S.title(24)}>{name || 'Atleta Calistênico'}</h2>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#555' }}>
              Semana {userData.currentWeek} · {userData.totalWorkouts} treinos feitos
            </p>
          </div>
        </div>

        {/* Stats */}
        {bmi && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
            {[
              { l: 'PESO', v: `${weight}kg`, c: '#60A5FA' },
              { l: 'ALTURA', v: `${height}cm`, c: '#4ADE80' },
              { l: 'IMC', v: bmi, c: parseFloat(bmi) > 25 ? '#F97316' : '#4ADE80' },
              { l: 'IDADE', v: `${age}a`, c: '#A855F7' },
            ].map(s => (
              <div key={s.l} style={{
                flex: 1, minWidth: 65, textAlign: 'center',
                background: `${s.c}11`, border: `1px solid ${s.c}33`,
                borderRadius: 10, padding: '10px 6px',
              }}>
                <p style={{ ...S.title(22, s.c), display: 'block' }}>{s.v}</p>
                <p style={{ ...S.label(), marginTop: 4 }}>{s.l}</p>
              </div>
            ))}
          </div>
        )}

        {/* Name input */}
        <p style={{ ...S.label(), marginBottom: 6 }}>SEU NOME</p>
        <input
          style={{ ...iS, marginBottom: 12 }}
          placeholder="Como você quer ser chamado?"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {/* Body stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[
            { l: 'PESO (kg)', k: 'weight', v: weight, set: setWeight, ph: '70' },
            { l: 'ALTURA (cm)', k: 'height', v: height, set: setHeight, ph: '175' },
            { l: 'IDADE', k: 'age', v: age, set: setAge, ph: '25' },
          ].map(f => (
            <div key={f.k}>
              <p style={{ ...S.label(), marginBottom: 6 }}>{f.l}</p>
              <input
                type="number"
                style={iS}
                placeholder={f.ph}
                value={f.v}
                onChange={e => f.set(e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Goal */}
        <p style={{ ...S.label(), marginBottom: 10 }}>OBJETIVO</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
          {[
            { id: 'health', l: 'Saúde & Bem-estar', i: <Leaf size={24} /> },
            { id: 'body', l: 'Emagrecer & Definir', i: <Zap size={24} /> },
            { id: 'strong', l: 'Ficar Forte', i: <Dumbbell size={24} /> },
            { id: 'pro', l: 'Nível Pro / Elite', i: <Trophy size={24} /> },
          ].map(g => (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              style={{
                ...S.btn(goal === g.id ? '#F97316' : '#1a1a1a'),
                border: `1px solid ${goal === g.id ? 'transparent' : '#2a2a2a'}`,
                textAlign: 'left', padding: 14,
              }}
            >
              <div style={{ color: goal === g.id ? '#F97316' : '#fff', marginBottom: 4 }}>{g.i}</div>
              <span style={{ display: 'block', marginTop: 8, fontSize: 13, fontWeight: 600 }}>{g.l}</span>
            </button>
          ))}
        </div>

        <button
          onClick={save}
          disabled={loading}
          style={{ ...S.btn(saved ? '#4ADE80' : '#F97316', 'lg'), width: '100%' }}
        >
          {saved ? '✓ SALVO!' : loading ? 'Salvando...' : 'SALVAR PERFIL'}
        </button>
      </div>

      {/* Week control */}
      <div style={{ ...S.card({ marginBottom: 18 }) }}>
        <p style={{ ...S.label(), marginBottom: 12 }}>📍 CONTROLE DE SEMANA</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setUserData({ currentWeek: Math.max(1, userData.currentWeek - 1) })}
            style={{ ...S.btn('#1a1a1a', 'sm'), border: '1px solid #333' }}
          >‹ Sem anterior</button>
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 28, color: '#F97316' }}>
            {userData.currentWeek}
          </span>
          <button
            onClick={() => setUserData({ currentWeek: Math.min(52, userData.currentWeek + 1) })}
            style={{ ...S.btn('#1a1a1a', 'sm'), border: '1px solid #333' }}
          >Sem {userData.currentWeek + 1} ›</button>
        </div>
      </div>

      {/* Logout */}
      <div style={S.card()}>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          style={{ ...S.btn('#1a1a1a', 'md'), border: '1px solid #2a2a2a', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <LogOut size={18} /> Sair da conta
        </button>
      </div>
    </div>
  )
}
