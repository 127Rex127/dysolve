import { useState, useRef } from 'react'
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

  async function play(id: SoundId) {
    setError(null)
    stopCurrent()

    // Toggle off if same sound clicked again
    if (activeIdRef.current === id) {
      activeIdRef.current = null
      setActiveSoundId(null)
      return
    }

    try {
      // Always create a fresh AudioContext if none exists or it's closed
      if (!ctxRef.current || ctxRef.current.state === 'closed') {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        const gain = ctx.createGain()
        gain.gain.value = volumeRef.current
        gain.connect(ctx.destination)
        ctxRef.current = ctx
        masterRef.current = gain
      }

      const ctx = ctxRef.current
      const master = masterRef.current!

      // Resume suspended context — must happen in user gesture callstack
      if (ctx.state === 'suspended') {
        await ctx.resume()
      }

      // Verify it actually started
      if (ctx.state !== 'running') {
        setError('Audio blocked by browser. Click anywhere and try again.')
        return
      }

      handleRef.current = playSound(ctx, id, master)
      activeIdRef.current = id
      setActiveSoundId(id)
    } catch (err) {
      console.error('[Ambient] play error:', err)
      setError('Could not start audio. Try clicking again.')
      activeIdRef.current = null
      setActiveSoundId(null)
    }
  }

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
