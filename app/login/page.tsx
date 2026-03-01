'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Dumbbell, Rocket, AlertTriangle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'register') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Erro ao criar conta')
          setLoading(false)
          return
        }
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou senha incorretos')
        setLoading(false)
        return
      }

      router.push('/treino')
      router.refresh()
    } catch {
      setError('Erro de conexão. Tente novamente.')
      setLoading(false)
    }
  }

  const iS = {
    background: '#111',
    border: '1px solid #222',
    borderRadius: 10,
    color: '#fff',
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 16,
    padding: '14px 16px',
    width: '100%',
    outline: 'none',
  } as React.CSSProperties

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg,#F97316,#F59E0B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 16px',
            boxShadow: '0 0 32px rgba(249,115,22,0.4)',
          }}>
            <Dumbbell color="#fff" size={32} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 800, fontSize: 36,
            letterSpacing: 2, color: '#fff',
          }}>CALISTENIA <span style={{ color: '#F97316' }}>PRO</span></h1>
          <p style={{ color: '#444', fontSize: 13, marginTop: 4, letterSpacing: 1 }}>
            52 SEMANAS · 5 FASES · DO ZERO AO PRO
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', background: '#111',
          borderRadius: 12, padding: 4, marginBottom: 28,
        }}>
          {(['login', 'register'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: '11px 0',
              background: mode === m ? '#F97316' : 'transparent',
              border: 'none', borderRadius: 9,
              fontFamily: 'var(--font-barlow)', fontWeight: 700,
              fontSize: 14, letterSpacing: 1.5, textTransform: 'uppercase',
              color: mode === m ? '#fff' : '#555',
              transition: 'all 0.2s',
            }}>
              {m === 'login' ? 'Entrar' : 'Criar Conta'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#555', marginBottom: 8, textTransform: 'uppercase' }}>SEU NOME</p>
              <input
                style={iS}
                placeholder="Como quer ser chamado?"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#555', marginBottom: 8, textTransform: 'uppercase' }}>EMAIL</p>
            <input
              style={iS}
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#555', marginBottom: 8, textTransform: 'uppercase' }}>SENHA</p>
            <input
              style={iS}
              type="password"
              placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : '••••••••'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 10, padding: '12px 16px', marginBottom: 16,
              fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 14, color: '#EF4444',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <AlertTriangle size={18} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '16px',
              background: loading ? '#333' : 'linear-gradient(135deg,#F97316,#F59E0B)',
              border: 'none', borderRadius: 12,
              fontFamily: 'var(--font-barlow)', fontWeight: 800,
              fontSize: 18, letterSpacing: 2, color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(249,115,22,0.4)',
            }}
          >
            {loading ? '...' : mode === 'login' ? (
              <span style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>ENTRAR <Dumbbell size={20} /></span>
            ) : (
              <span style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>COMEÇAR AGORA <Rocket size={20} /></span>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#333', letterSpacing: 0.5 }}>
          Programa 100% gratuito · Sem equipamentos necessários
        </p>
      </div>
    </div>
  )
}
