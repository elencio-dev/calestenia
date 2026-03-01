'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback(() => setRunning(true), [])
  const pause = useCallback(() => setRunning(false), [])
  const reset = useCallback(() => { setRunning(false); setTime(0) }, [])

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setTime(t => t + 1), 1000)
    } else {
      if (ref.current) clearInterval(ref.current)
    }
    return () => { if (ref.current) clearInterval(ref.current) }
  }, [running])

  return { time, running, start, pause, reset }
}

export function useCountdown(initial: number, onDone?: () => void) {
  const [time, setTime] = useState(initial)
  const [running, setRunning] = useState(false)
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  const go = useCallback(() => setRunning(true), [])
  const stop = useCallback(() => setRunning(false), [])
  const reset = useCallback((t = initial) => { setRunning(false); setTime(t) }, [initial])

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setTime(t => {
          if (t <= 1) {
            if (ref.current) clearInterval(ref.current)
            setRunning(false)
            onDoneRef.current?.()
            return 0
          }
          return t - 1
        })
      }, 1000)
    } else {
      if (ref.current) clearInterval(ref.current)
    }
    return () => { if (ref.current) clearInterval(ref.current) }
  }, [running])

  return { time, running, go, stop, reset }
}
