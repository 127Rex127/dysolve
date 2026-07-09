import { useState, useRef } from 'react'
import { playSound, SoundId, SoundHandle } from '../utils/soundEngine'

function createContext(volume: number): { ctx: AudioContext; master: GainNode } {
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const ctx = new AudioCtx()
  const master = ctx.createGain()
  master.gain.value = volume
  master.connect(ctx.destination)
  return { ctx, master }
}

// Play a silent 1-frame buffer — required to unlock audio on iOS/Safari
function unlockContext(ctx: AudioContext) {
  try {
    const buf = ctx.createBuffer(1, 1, ctx.sampleRate)
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(ctx.destination)
    src.start(0)
  } catch { /* ignore */ }
}

export function useAmbientSound() {
  const [activeSoundId, setActiveSoundId] = useState<SoundId | null>(null)
  const [volume, setVolumeState] = useState(0.5)
  const [error, setError] = useState<string | null>(null)

  const ctxRef    = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const handleRef = useRef<SoundHandle | null>(null)
  const activeRef = useRef<SoundId | null>(null)
  const volRef    = useRef(0.5)

  function stopCurrent() {
    if (handleRef.current) {
      try { handleRef.current.stop() } catch { /* ignore */ }
      handleRef.current = null
    }
  }

  function play(id: SoundId) {
    setError(null)
    stopCurrent()

    // Toggle off if same sound tapped again
    if (activeRef.current === id) {
      activeRef.current = null
      setActiveSoundId(null)
      return
    }

    try {
      // (Re)create context if missing or closed — MUST stay in the synchronous
      // user-gesture callstack for autoplay policy on mobile browsers
      if (!ctxRef.current || ctxRef.current.state === 'closed') {
        const { ctx, master } = createContext(volRef.current)
        ctxRef.current = ctx
        masterRef.current = master
      }

      const ctx    = ctxRef.current
      const master = masterRef.current!

      // Unlock audio — required on iOS Safari before any real sound will play
      unlockContext(ctx)

      // Resume suspended context then play
      const doPlay = () => {
        if (ctx.state !== 'running') {
          setError('Audio is blocked — tap the button once more to start.')
          activeRef.current = null
          setActiveSoundId(null)
          return
        }
        handleRef.current = playSound(ctx, id, master)
        activeRef.current = id
        setActiveSoundId(id)
      }

      if (ctx.state === 'suspended') {
        ctx.resume().then(doPlay).catch(() => {
          setError('Audio blocked by browser — tap again to start.')
          activeRef.current = null
          setActiveSoundId(null)
        })
      } else {
        doPlay()
      }
    } catch (err) {
      console.error('[Ambient] play error:', err)
      setError('Could not start audio. Try tapping again.')
      activeRef.current = null
      setActiveSoundId(null)
    }
  }

  function stop() {
    stopCurrent()
    activeRef.current = null
    setActiveSoundId(null)
  }

  function setVolume(v: number) {
    volRef.current = v
    setVolumeState(v)
    if (masterRef.current) masterRef.current.gain.value = v
  }

  return { activeSoundId, volume, play, stop, setVolume, error }
}
