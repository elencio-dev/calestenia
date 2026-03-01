'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUserData, UserDataProvider } from '@/contexts/UserDataContext'
import { getCurrentPhase } from '@/lib/program-data'
import { Dumbbell, Flame, TrendingUp, ClipboardList, User, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { LucideIcon } from './ui'
import { OnboardingScreen } from './OnboardingScreen'

function Header() {
  const { userData } = useUserData()
  const phase = getCurrentPhase(userData.currentWeek)
  const streak = Math.min(7, userData.totalWorkouts % 8)

  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '12px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      background: 'var(--bg-base)',
      backdropFilter: 'blur(20px)',
      zIndex: 50,
      paddingTop: 'max(12px, env(safe-area-inset-top))',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: 'linear-gradient(135deg,#F97316,#F59E0B)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, boxShadow: '0 0 18px rgba(249,115,22,0.4)',
          flexShrink: 0,
        }}>
          <Dumbbell color="#fff" size={20} />
        </div>
        <div>
          <p style={{
            margin: 0, fontFamily: 'var(--font-barlow)', fontWeight: 800,
            fontSize: 20, letterSpacing: 2, color: 'var(--text-base)',
          }}>
            CALISTENIA <span style={{ color: 'var(--accent-primary)' }}>PRO</span>
          </p>
          <p style={{
            margin: 0, fontSize: 10, color: 'var(--text-muted)', letterSpacing: 1,
            fontFamily: 'var(--font-barlow)', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 4
          }}>
            SEM. {userData.currentWeek} · <LucideIcon name={phase.icon} size={10} color="var(--text-muted)" /> {phase.name}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {streak > 0 && (
          <div style={{
            background: 'rgba(249,115,22,0.1)',
            border: '1px solid rgba(249,115,22,0.3)',
            borderRadius: 20, padding: '4px 11px',
            fontFamily: 'var(--font-barlow)', fontWeight: 700,
            fontSize: 12, color: '#F97316',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Flame size={12} /> {streak} dias
          </div>
        )}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 20, padding: '4px 11px',
          fontFamily: 'var(--font-barlow)', fontWeight: 700,
          fontSize: 12, color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <Dumbbell size={12} /> {userData.totalWorkouts}
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark' || theme === 'system' // simplistic fallback for initial render

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      style={{
        background: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        color: 'var(--text-muted)',
        cursor: 'pointer',
      }}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

function BottomNav() {
  const pathname = usePathname()

  const nav = [
    { path: '/treino', icon: <Dumbbell size={22} />, label: 'Treino' },
    { path: '/progresso', icon: <TrendingUp size={22} />, label: 'Progresso' },
    { path: '/programa', icon: <ClipboardList size={22} />, label: 'Programa' },
    { path: '/perfil', icon: <User size={22} />, label: 'Perfil' },
  ]

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: 'var(--bg-base)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      paddingTop: 8,
      paddingBottom: 'max(18px, env(safe-area-inset-bottom))',
    }}>
      {nav.map(item => {
        const active = pathname === item.path
        return (
          <Link key={item.path} href={item.path} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4, padding: '6px 0',
            textDecoration: 'none', color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
          }}>
            <span style={{ display: 'flex' }}>
              {React.cloneElement(item.icon as React.ReactElement, {
                color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
                strokeWidth: active ? 2.5 : 2
              })}
            </span>
            <span style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 700,
              fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase',
              color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
            }}>
              {item.label}
            </span>
            {active && (
              <div style={{
                width: 4, height: 4, borderRadius: '50%',
                background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)',
              }} />
            )}
          </Link>
        )
      })}
    </div>
  )
}

function AppContent({ children }: { children: React.ReactNode }) {
  const { userData, setUserData, loading } = useUserData()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg-base)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg,#F97316,#F59E0B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 16px',
            boxShadow: '0 0 32px rgba(249,115,22,0.4)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}>
            <Dumbbell color="#fff" size={32} />
          </div>
          <p style={{ fontFamily: 'var(--font-barlow)', fontSize: 16, color: 'var(--text-muted)', letterSpacing: 2 }}>
            CARREGANDO...
          </p>
        </div>
      </div>
    )
  }

  if (!userData.hasCompletedOnboarding) {
    return (
      <OnboardingScreen onComplete={() => {
        // Optimistically set UI and dispatch backend persisting through UserDataContext hook
        setUserData({ hasCompletedOnboarding: true })
      }} />
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-base)' }}>
      <Header />
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 14px 100px' }}>
        {children}
      </div>
      <BottomNav />
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserDataProvider>
      <AppContent>{children}</AppContent>
    </UserDataProvider>
  )
}
