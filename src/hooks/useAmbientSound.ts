import { useState, useRef, useCallback } from 'react'
import { playSound, SoundId, SoundHandle } from '../utils/soundEngine'

export function useAmbientSound() {
  const [activeSoundId, setActiveSoundId] = useState<SoundId | null>(null)
  const [volume, setVolumeState] = useState(0.5)
  const [error, setError] = useState<string | null>(null)

  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const handleRef = useRef<SoundHandle | null>(null)
  const activeIdRef = useRef<SoundId | null>(null)
  const volumeRef = useRef(0.5)

  function stopCurrent() {
    if (handleRef.current) {
      try { handleRef.current.stop() } catch { /* ignore */ }
      handleRef.current = null
    }
  }

  // Ensure a running AudioContext — call synchronously in user gesture
  function ensureContext(): AudioContext {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      const gain = ctx.createGain()
      gain.gain.value = volumeRef.current
      gain.connect(ctx.destination)
      ctxRef.current = ctx
      masterRef.current = gain
    }
    return ctxRef.current
  }

  const play = useCallback((id: SoundId) => {
    setError(null)
    stopCurrent()

    if (activeIdRef.current === id) {
      activeIdRef.current = null
      setActiveSoundId(null)
      return
    }

    try {
      // Create / reuse context synchronously (must stay in user gesture callstack)
      const ctx = ensureContext()
      const master = masterRef.current!

      // Resume if suspended — fire and don't await so we stay in the gesture context
      const startPlayback = () => {
        if (ctx.state !== 'running') {
          setError('Audio blocked by browser — tap again to unlock.')
          activeIdRef.current = null
          setActiveSoundId(null)
          return
        }
        try {
          handleRef.current = playSound(ctx, id, master)
          activeIdRef.current = id
          setActiveSoundId(id)
        } catch (err) {
          console.error('[Ambient] playSound error:', err)
          setError('Could not start sound. Please try again.')
          activeIdRef.current = null
          setActiveSoundId(null)
        }
      }

      if (ctx.state === 'suspended') {
        ctx.resume().then(startPlayback).catch(() => {
          setError('Audio blocked by browser — tap again to unlock.')
          activeIdRef.current = null
          setActiveSoundId(null)
        })
      } else {
        startPlayback()
      }
    } catch (err) {
      console.error('[Ambient] play error:', err)
      setError('Could not start audio. Try tapping again.')
      activeIdRef.current = null
      setActiveSoundId(null)
    }
  }, [])

  function stop() {
    stopCurrent()
    activeIdRef.current = null
    setActiveSoundId(null)
  }

  function setVolume(v: number) {
    volumeRef.current = v
    setVolumeState(v)
    if (masterRef.current) {
      masterRef.current.gain.value = v
    }
  }

  return { activeSoundId, volume, play, stop, setVolume, error }
}
