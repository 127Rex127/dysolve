export type SoundId =
  | 'light-rain'
  | 'heavy-rain'
  | 'thunderstorm'
  | 'ocean'
  | 'stream'
  | 'wind'
  | 'white-noise'
  | 'brown-noise'
  | 'pink-noise'
  | 'fireplace'
  | 'fan'
  | 'forest'
  | 'crickets'
  | 'underwater'
  | 'cafe'
  | 'rain-roof'
  | 'tibetan-bowl'
  | 'space'

export interface SoundHandle {
  stop: () => void
}

export const SOUNDS: { id: SoundId; label: string; emoji: string; desc: string }[] = [
  { id: 'light-rain',    label: 'Light Rain',       emoji: '🌧️',  desc: 'Soft patter with drips' },
  { id: 'heavy-rain',    label: 'Heavy Rain',        emoji: '🌨️',  desc: 'Downpour on a window' },
  { id: 'thunderstorm',  label: 'Thunderstorm',      emoji: '⛈️',  desc: 'Rain with distant thunder' },
  { id: 'rain-roof',     label: 'Rain on Tin Roof',  emoji: '🏚️',  desc: 'Rhythmic rain on metal roof' },
  { id: 'ocean',         label: 'Ocean Waves',       emoji: '🌊',  desc: 'Rolling shore with surf' },
  { id: 'stream',        label: 'Forest Brook',      emoji: '💧',  desc: 'Babbling stream over rocks' },
  { id: 'underwater',    label: 'Underwater',        emoji: '🐋',  desc: 'Deep ocean ambience' },
  { id: 'wind',          label: 'Wind',              emoji: '💨',  desc: 'Gentle sighing wind' },
  { id: 'fireplace',     label: 'Fireplace',         emoji: '🔥',  desc: 'Crackling log fire' },
  { id: 'forest',        label: 'Forest Birds',      emoji: '🌲',  desc: 'Birdsong in a woodland' },
  { id: 'crickets',      label: 'Night Crickets',    emoji: '🌙',  desc: 'Warm summer night' },
  { id: 'cafe',          label: 'Coffee Shop',       emoji: '☕',  desc: 'Cosy café background hum' },
  { id: 'tibetan-bowl',  label: 'Singing Bowl',      emoji: '🎵',  desc: 'Meditative resonant tones' },
  { id: 'space',         label: 'Deep Space',        emoji: '🪐',  desc: 'Vast cosmic ambience' },
  { id: 'white-noise',   label: 'White Noise',       emoji: '📻',  desc: 'All frequencies equally' },
  { id: 'brown-noise',   label: 'Brown Noise',       emoji: '🎛️',  desc: 'Deep, warm rumble' },
  { id: 'pink-noise',    label: 'Pink Noise',        emoji: '🌸',  desc: 'Balanced focus noise' },
  { id: 'fan',           label: 'Fan / AC',          emoji: '🌀',  desc: 'Steady hum of a fan' },
]

// ─── Noise buffer generators ─────────────────────────────────────────────────

function whiteBuffer(ctx: AudioContext, secs = 3): AudioBuffer {
  const n = ctx.sampleRate * secs
  const buf = ctx.createBuffer(1, n, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1
  return buf
}

function brownBuffer(ctx: AudioContext, secs = 3): AudioBuffer {
  const n = ctx.sampleRate * secs
  const buf = ctx.createBuffer(1, n, ctx.sampleRate)
  const d = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1
    d[i] = (last + 0.02 * w) / 1.02
    last = d[i]
    d[i] *= 3.5
  }
  return buf
}

function pinkBuffer(ctx: AudioContext, secs = 3): AudioBuffer {
  const n = ctx.sampleRate * secs
  const buf = ctx.createBuffer(1, n, ctx.sampleRate)
  const d = buf.getChannelData(0)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + w * 0.0555179
    b1 = 0.99332 * b1 + w * 0.0750759
    b2 = 0.96900 * b2 + w * 0.1538520
    b3 = 0.86650 * b3 + w * 0.3104856
    b4 = 0.55000 * b4 + w * 0.5329522
    b5 = -0.7616 * b5 - w * 0.0168980
    d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11
    b6 = w * 0.115926
  }
  return buf
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loopSrc(ctx: AudioContext, buf: AudioBuffer): AudioBufferSourceNode {
  const src = ctx.createBufferSource()
  src.buffer = buf
  src.loop = true
  return src
}

function lfo(ctx: AudioContext, freq: number, depth: number): [OscillatorNode, GainNode] {
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = freq
  const g = ctx.createGain()
  g.gain.value = depth
  osc.connect(g)
  osc.start()
  return [osc, g]
}

function safeStop(node: AudioScheduledSourceNode) {
  try { node.stop() } catch { /* already stopped */ }
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function playSound(
  ctx: AudioContext,
  id: SoundId,
  master: GainNode
): SoundHandle {
  const cleanups: (() => void)[] = []

  switch (id) {

    // ── Pure noise ──────────────────────────────────────────────────────────

    case 'white-noise': {
      const src = loopSrc(ctx, whiteBuffer(ctx))
      src.connect(master)
      src.start()
      cleanups.push(() => safeStop(src))
      break
    }

    case 'brown-noise': {
      const src = loopSrc(ctx, brownBuffer(ctx))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 400
      src.connect(lpf)
      lpf.connect(master)
      src.start()
      cleanups.push(() => safeStop(src))
      break
    }

    case 'pink-noise': {
      const src = loopSrc(ctx, pinkBuffer(ctx))
      src.connect(master)
      src.start()
      cleanups.push(() => safeStop(src))
      break
    }

    // ── Rain family ──────────────────────────────────────────────────────────

    case 'light-rain': {
      // Soft pink noise base
      const base = loopSrc(ctx, pinkBuffer(ctx, 4))
      const hpf = ctx.createBiquadFilter()
      hpf.type = 'highpass'
      hpf.frequency.value = 1400
      const amp = ctx.createGain()
      amp.gain.value = 0.55
      const [lfoOsc, lfoG] = lfo(ctx, 2, 0.12)
      lfoG.connect(amp.gain)
      base.connect(hpf); hpf.connect(amp); amp.connect(master)
      base.start()

      // Individual drip layer — random short noise bursts
      let stopped = false
      let dripTimer: ReturnType<typeof setTimeout> | null = null
      const dripBuf = whiteBuffer(ctx, 0.08)
      function drip() {
        if (stopped) return
        const d = ctx.createBufferSource()
        d.buffer = dripBuf
        const g = ctx.createGain()
        const f = ctx.createBiquadFilter()
        f.type = 'bandpass'
        f.frequency.value = 2000 + Math.random() * 3000
        f.Q.value = 3
        g.gain.setValueAtTime(0.15 + Math.random() * 0.25, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
        d.connect(f); f.connect(g); g.connect(master)
        d.start()
        setTimeout(() => safeStop(d), 120)
        dripTimer = setTimeout(drip, 120 + Math.random() * 600)
      }
      drip()

      cleanups.push(() => { stopped = true; if (dripTimer) clearTimeout(dripTimer); safeStop(base); safeStop(lfoOsc) })
      break
    }

    case 'heavy-rain': {
      const src = loopSrc(ctx, pinkBuffer(ctx, 4))
      const hpf = ctx.createBiquadFilter()
      hpf.type = 'highpass'
      hpf.frequency.value = 700
      // Second layer — low rumble of heavy downpour
      const src2 = loopSrc(ctx, brownBuffer(ctx, 3))
      const lpf2 = ctx.createBiquadFilter()
      lpf2.type = 'lowpass'
      lpf2.frequency.value = 600
      const rumbleGain = ctx.createGain()
      rumbleGain.gain.value = 0.3
      const amp = ctx.createGain()
      amp.gain.value = 1.1
      const [lfoOsc, lfoG] = lfo(ctx, 3.5, 0.28)
      lfoG.connect(amp.gain)
      src.connect(hpf); hpf.connect(amp); amp.connect(master)
      src2.connect(lpf2); lpf2.connect(rumbleGain); rumbleGain.connect(master)
      src.start(); src2.start()
      cleanups.push(() => { safeStop(src); safeStop(src2); safeStop(lfoOsc) })
      break
    }

    case 'thunderstorm': {
      // Rain base
      const src = loopSrc(ctx, pinkBuffer(ctx, 4))
      const hpf = ctx.createBiquadFilter()
      hpf.type = 'highpass'
      hpf.frequency.value = 900
      const amp = ctx.createGain()
      amp.gain.value = 1.0
      const [lfoOsc, lfoG] = lfo(ctx, 3.5, 0.25)
      lfoG.connect(amp.gain)
      src.connect(hpf); hpf.connect(amp); amp.connect(master)
      src.start()

      // Scheduled thunder bursts
      let stopped = false
      let timer: ReturnType<typeof setTimeout> | null = null
      const thunderBuf = brownBuffer(ctx, 5)

      function boom() {
        if (stopped) return
        const tSrc = ctx.createBufferSource()
        tSrc.buffer = thunderBuf
        const tGain = ctx.createGain()
        const tLpf = ctx.createBiquadFilter()
        tLpf.type = 'lowpass'
        tLpf.frequency.value = 180
        // Build-up before the crack
        tGain.gain.setValueAtTime(0, ctx.currentTime)
        tGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.02)
        tGain.gain.linearRampToValueAtTime(3.2, ctx.currentTime + 0.07)
        tGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5)
        tSrc.connect(tLpf); tLpf.connect(tGain); tGain.connect(master)
        tSrc.start()
        setTimeout(() => safeStop(tSrc), 5000)
      }

      function scheduleNext() {
        if (stopped) return
        timer = setTimeout(() => { boom(); scheduleNext() }, 10000 + Math.random() * 25000)
      }
      scheduleNext()

      cleanups.push(() => { stopped = true; if (timer) clearTimeout(timer); safeStop(src); safeStop(lfoOsc) })
      break
    }

    case 'rain-roof': {
      // Higher-frequency metallic impacts — rain on tin/corrugated roof
      const base = loopSrc(ctx, whiteBuffer(ctx, 3))
      const bpf = ctx.createBiquadFilter()
      bpf.type = 'bandpass'
      bpf.frequency.value = 3500
      bpf.Q.value = 0.8
      const baseGain = ctx.createGain()
      baseGain.gain.value = 0.5
      const [lfoOsc, lfoG] = lfo(ctx, 5, 0.3)
      lfoG.connect(baseGain.gain)
      base.connect(bpf); bpf.connect(baseGain); baseGain.connect(master)
      base.start()

      // Heavier drop "ticks" — metallic thud of larger drops
      let stopped = false
      let tickTimer: ReturnType<typeof setTimeout> | null = null
      const tickBuf = whiteBuffer(ctx, 0.05)
      function tick() {
        if (stopped) return
        const t = ctx.createBufferSource()
        t.buffer = tickBuf
        const tGain = ctx.createGain()
        const tBpf = ctx.createBiquadFilter()
        tBpf.type = 'bandpass'
        tBpf.frequency.value = 1800 + Math.random() * 2000
        tBpf.Q.value = 5
        tGain.gain.setValueAtTime(0.4 + Math.random() * 0.5, ctx.currentTime)
        tGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
        t.connect(tBpf); tBpf.connect(tGain); tGain.connect(master)
        t.start()
        setTimeout(() => safeStop(t), 80)
        tickTimer = setTimeout(tick, 60 + Math.random() * 200)
      }
      tick()

      cleanups.push(() => { stopped = true; if (tickTimer) clearTimeout(tickTimer); safeStop(base); safeStop(lfoOsc) })
      break
    }

    // ── Water family ─────────────────────────────────────────────────────────

    case 'ocean': {
      // Brown noise base
      const src = loopSrc(ctx, brownBuffer(ctx, 6))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 700
      const amp = ctx.createGain()
      amp.gain.value = 0.7
      // Very slow wave swell
      const [swellOsc, swellG] = lfo(ctx, 0.08, 0.5)
      swellG.connect(amp.gain)

      // Mid-frequency surf layer
      const surf = loopSrc(ctx, pinkBuffer(ctx, 4))
      const surfBpf = ctx.createBiquadFilter()
      surfBpf.type = 'bandpass'
      surfBpf.frequency.value = 900
      surfBpf.Q.value = 0.5
      const surfGain = ctx.createGain()
      surfGain.gain.value = 0.35
      const [surfLfoOsc, surfLfoG] = lfo(ctx, 0.12, 0.25)
      surfLfoG.connect(surfGain.gain)

      src.connect(lpf); lpf.connect(amp); amp.connect(master)
      surf.connect(surfBpf); surfBpf.connect(surfGain); surfGain.connect(master)
      src.start(); surf.start()
      cleanups.push(() => { safeStop(src); safeStop(surf); safeStop(swellOsc); safeStop(surfLfoOsc) })
      break
    }

    case 'stream': {
      // Gurgling bandpass white noise
      const src = loopSrc(ctx, whiteBuffer(ctx, 4))
      const bpf = ctx.createBiquadFilter()
      bpf.type = 'bandpass'
      bpf.frequency.value = 1600
      bpf.Q.value = 0.35
      const amp = ctx.createGain()
      amp.gain.value = 1.3
      const [lfoOsc, lfoG] = lfo(ctx, 1.0, 0.18)
      lfoG.connect(amp.gain)

      // Second gurgle layer, slightly offset
      const src2 = loopSrc(ctx, whiteBuffer(ctx, 3))
      const bpf2 = ctx.createBiquadFilter()
      bpf2.type = 'bandpass'
      bpf2.frequency.value = 2600
      bpf2.Q.value = 0.6
      const amp2 = ctx.createGain()
      amp2.gain.value = 0.5
      const [lfoOsc2, lfoG2] = lfo(ctx, 1.7, 0.2)
      lfoG2.connect(amp2.gain)

      src.connect(bpf); bpf.connect(amp); amp.connect(master)
      src2.connect(bpf2); bpf2.connect(amp2); amp2.connect(master)
      src.start(); src2.start()
      cleanups.push(() => { safeStop(src); safeStop(src2); safeStop(lfoOsc); safeStop(lfoOsc2) })
      break
    }

    case 'underwater': {
      const src = loopSrc(ctx, brownBuffer(ctx, 5))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 160
      const amp = ctx.createGain()
      amp.gain.value = 1.0
      const [lfoOsc, lfoG] = lfo(ctx, 0.06, 0.4)
      lfoG.connect(amp.gain)
      // Subtle high-frequency shimmer
      const src2 = loopSrc(ctx, whiteBuffer(ctx, 3))
      const shimmerBpf = ctx.createBiquadFilter()
      shimmerBpf.type = 'bandpass'
      shimmerBpf.frequency.value = 1200
      shimmerBpf.Q.value = 10
      const shimmer = ctx.createGain()
      shimmer.gain.value = 0.05
      src2.connect(shimmerBpf); shimmerBpf.connect(shimmer); shimmer.connect(master)
      src.connect(lpf); lpf.connect(amp); amp.connect(master)
      src.start(); src2.start()
      cleanups.push(() => { safeStop(src); safeStop(src2); safeStop(lfoOsc) })
      break
    }

    // ── Atmosphere ───────────────────────────────────────────────────────────

    case 'wind': {
      const src = loopSrc(ctx, pinkBuffer(ctx, 5))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 900
      const amp = ctx.createGain()
      amp.gain.value = 0.85
      // Very slow gust envelope
      const [gustOsc, gustG] = lfo(ctx, 0.04, 0.65)
      gustG.connect(amp.gain)
      // Second layer — higher frequency whistle
      const src2 = loopSrc(ctx, pinkBuffer(ctx, 4))
      const hpf2 = ctx.createBiquadFilter()
      hpf2.type = 'bandpass'
      hpf2.frequency.value = 2200
      hpf2.Q.value = 2
      const whistleGain = ctx.createGain()
      whistleGain.gain.value = 0.12
      const [whistleLfo, whistleLfoG] = lfo(ctx, 0.09, 0.1)
      whistleLfoG.connect(whistleGain.gain)
      src.connect(lpf); lpf.connect(amp); amp.connect(master)
      src2.connect(hpf2); hpf2.connect(whistleGain); whistleGain.connect(master)
      src.start(); src2.start()
      cleanups.push(() => { safeStop(src); safeStop(src2); safeStop(gustOsc); safeStop(whistleLfo) })
      break
    }

    case 'fan': {
      const src = loopSrc(ctx, brownBuffer(ctx, 3))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 450
      // Subtle periodic blade wobble
      const amp = ctx.createGain()
      amp.gain.value = 0.8
      const [bladeLfo, bladeLfoG] = lfo(ctx, 0.8, 0.07)
      bladeLfoG.connect(amp.gain)
      src.connect(lpf); lpf.connect(amp); amp.connect(master)
      src.start()
      cleanups.push(() => { safeStop(src); safeStop(bladeLfo) })
      break
    }

    // ── Fire ─────────────────────────────────────────────────────────────────

    case 'fireplace': {
      // Low base rumble
      const src = loopSrc(ctx, brownBuffer(ctx, 4))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 220
      const baseGain = ctx.createGain()
      baseGain.gain.value = 0.6
      // Slow flame flutter LFO
      const [flutterOsc, flutterG] = lfo(ctx, 0.35, 0.2)
      flutterG.connect(baseGain.gain)
      src.connect(lpf); lpf.connect(baseGain); baseGain.connect(master)
      src.start()

      // Random crackles — vary size and gap for realism
      let stopped = false
      let crackleTimer: ReturnType<typeof setTimeout> | null = null
      const crackBuf = whiteBuffer(ctx, 0.06)

      function crackle() {
        if (stopped) return
        const size = Math.random()
        const duration = 0.02 + size * 0.08
        const cSrc = ctx.createBufferSource()
        cSrc.buffer = crackBuf
        const cGain = ctx.createGain()
        const hpf = ctx.createBiquadFilter()
        hpf.type = 'highpass'
        hpf.frequency.value = 1500 + Math.random() * 2000
        cGain.gain.setValueAtTime(0.3 + size * 0.9, ctx.currentTime)
        cGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
        cSrc.connect(hpf); hpf.connect(cGain); cGain.connect(master)
        cSrc.start()
        setTimeout(() => safeStop(cSrc), (duration + 0.02) * 1000)
        // Occasional double-crackle (wood popping)
        if (Math.random() < 0.3) {
          crackleTimer = setTimeout(crackle, 50 + Math.random() * 100)
        } else {
          crackleTimer = setTimeout(crackle, 200 + Math.random() * 900)
        }
      }
      crackle()

      cleanups.push(() => {
        stopped = true
        if (crackleTimer) clearTimeout(crackleTimer)
        safeStop(src); safeStop(flutterOsc)
      })
      break
    }

    // ── Nature ───────────────────────────────────────────────────────────────

    case 'forest': {
      // Wind-through-trees background
      const src = loopSrc(ctx, pinkBuffer(ctx, 4))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 1200
      const bgGain = ctx.createGain()
      bgGain.gain.value = 0.2
      src.connect(lpf); lpf.connect(bgGain); bgGain.connect(master)
      src.start()

      // Bird calls using FM synthesis for more natural timbre
      let stopped = false
      let birdTimer: ReturnType<typeof setTimeout> | null = null

      function chirp() {
        if (stopped) return
        const baseFreq = 1600 + Math.random() * 2800
        const numNotes = 1 + Math.floor(Math.random() * 4)
        const bird = Math.random() // different bird "personalities"

        for (let n = 0; n < numNotes; n++) {
          const tOffset = n * (0.1 + Math.random() * 0.15)
          // Carrier oscillator
          const osc = ctx.createOscillator()
          osc.type = bird < 0.5 ? 'sine' : 'triangle'
          osc.frequency.setValueAtTime(baseFreq + n * 150, ctx.currentTime + tOffset)
          osc.frequency.linearRampToValueAtTime(baseFreq * (1.1 + bird * 0.3), ctx.currentTime + tOffset + 0.06)
          osc.frequency.linearRampToValueAtTime(baseFreq * 0.95, ctx.currentTime + tOffset + 0.14)
          // FM modulator for trill quality
          const mod = ctx.createOscillator()
          const modGain = ctx.createGain()
          mod.frequency.value = baseFreq * (0.5 + bird * 0.3)
          modGain.gain.value = 40 + bird * 80
          mod.connect(modGain); modGain.connect(osc.frequency)
          // Amplitude envelope
          const g = ctx.createGain()
          g.gain.setValueAtTime(0, ctx.currentTime + tOffset)
          g.gain.linearRampToValueAtTime(0.07 + bird * 0.05, ctx.currentTime + tOffset + 0.02)
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tOffset + 0.18)
          osc.connect(g); g.connect(master)
          osc.start(ctx.currentTime + tOffset)
          mod.start(ctx.currentTime + tOffset)
          setTimeout(() => { safeStop(osc); safeStop(mod) }, (tOffset + 0.3) * 1000)
        }

        birdTimer = setTimeout(chirp, 2000 + Math.random() * 6000)
      }
      chirp()

      cleanups.push(() => {
        stopped = true
        if (birdTimer) clearTimeout(birdTimer)
        safeStop(src)
      })
      break
    }

    case 'crickets': {
      // Two layers for chorus effect
      const src = loopSrc(ctx, whiteBuffer(ctx, 3))
      const bpf = ctx.createBiquadFilter()
      bpf.type = 'bandpass'
      bpf.frequency.value = 5200; bpf.Q.value = 6
      const amp = ctx.createGain()
      amp.gain.value = 0.8
      const [lfoOsc, lfoG] = lfo(ctx, 19, 0.72)
      lfoG.connect(amp.gain)

      const src2 = loopSrc(ctx, whiteBuffer(ctx, 3))
      const bpf2 = ctx.createBiquadFilter()
      bpf2.type = 'bandpass'
      bpf2.frequency.value = 4700; bpf2.Q.value = 6
      const amp2 = ctx.createGain()
      amp2.gain.value = 0.55
      const [lfoOsc2, lfoG2] = lfo(ctx, 21.5, 0.68)
      lfoG2.connect(amp2.gain)

      // Third distant layer for depth
      const src3 = loopSrc(ctx, whiteBuffer(ctx, 4))
      const bpf3 = ctx.createBiquadFilter()
      bpf3.type = 'bandpass'
      bpf3.frequency.value = 6000; bpf3.Q.value = 7
      const amp3 = ctx.createGain()
      amp3.gain.value = 0.25
      const [lfoOsc3, lfoG3] = lfo(ctx, 17.5, 0.6)
      lfoG3.connect(amp3.gain)

      src.connect(bpf); bpf.connect(amp); amp.connect(master)
      src2.connect(bpf2); bpf2.connect(amp2); amp2.connect(master)
      src3.connect(bpf3); bpf3.connect(amp3); amp3.connect(master)
      src.start(); src2.start(); src3.start()
      cleanups.push(() => {
        safeStop(src); safeStop(src2); safeStop(src3)
        safeStop(lfoOsc); safeStop(lfoOsc2); safeStop(lfoOsc3)
      })
      break
    }

    // ── NEW: Cafe / Coffee Shop ──────────────────────────────────────────────

    case 'cafe': {
      // Crowd murmur — low bandpass noise
      const src = loopSrc(ctx, pinkBuffer(ctx, 5))
      const bpf = ctx.createBiquadFilter()
      bpf.type = 'bandpass'
      bpf.frequency.value = 500
      bpf.Q.value = 0.3
      const murmurGain = ctx.createGain()
      murmurGain.gain.value = 0.55
      const [murmurLfo, murmurLfoG] = lfo(ctx, 0.15, 0.18)
      murmurLfoG.connect(murmurGain.gain)
      src.connect(bpf); bpf.connect(murmurGain); murmurGain.connect(master)
      src.start()

      // Occasional distant clatter/clink — metallic transients
      let stopped = false
      let clinkTimer: ReturnType<typeof setTimeout> | null = null
      const clinkBuf = whiteBuffer(ctx, 0.04)

      function clink() {
        if (stopped) return
        const c = ctx.createBufferSource()
        c.buffer = clinkBuf
        const g = ctx.createGain()
        const bpfc = ctx.createBiquadFilter()
        bpfc.type = 'bandpass'
        bpfc.frequency.value = 2000 + Math.random() * 4000
        bpfc.Q.value = 8 + Math.random() * 8
        g.gain.setValueAtTime(0.12 + Math.random() * 0.2, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
        c.connect(bpfc); bpfc.connect(g); g.connect(master)
        c.start()
        setTimeout(() => safeStop(c), 80)
        clinkTimer = setTimeout(clink, 2000 + Math.random() * 8000)
      }
      clink()

      // Gentle HVAC/ambience hum underneath
      const hum = loopSrc(ctx, brownBuffer(ctx, 4))
      const humLpf = ctx.createBiquadFilter()
      humLpf.type = 'lowpass'
      humLpf.frequency.value = 200
      const humGain = ctx.createGain()
      humGain.gain.value = 0.15
      hum.connect(humLpf); humLpf.connect(humGain); humGain.connect(master)
      hum.start()

      cleanups.push(() => {
        stopped = true
        if (clinkTimer) clearTimeout(clinkTimer)
        safeStop(src); safeStop(hum); safeStop(murmurLfo)
      })
      break
    }

    // ── NEW: Singing / Tibetan Bowl ──────────────────────────────────────────

    case 'tibetan-bowl': {
      // Core resonant frequency ~432 Hz + harmonics
      const freqs = [432, 864, 648, 1296]
      const oscs: OscillatorNode[] = []
      const gains: GainNode[] = []
      const volumes = [0.18, 0.07, 0.05, 0.03]

      for (let h = 0; h < freqs.length; h++) {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freqs[h]
        const g = ctx.createGain()
        g.gain.value = volumes[h]
        osc.connect(g); g.connect(master)
        osc.start()
        oscs.push(osc); gains.push(g)
      }

      // Slow pulsing amplitude — the "singing" effect
      const [pulseOsc, pulseG] = lfo(ctx, 0.2, 0.06)
      pulseG.connect(gains[0].gain)
      const [pulseOsc2, pulseG2] = lfo(ctx, 0.31, 0.03)
      pulseG2.connect(gains[1].gain)

      // Periodic gentle strike/re-excitation
      let stopped = false
      let strikeTimer: ReturnType<typeof setTimeout> | null = null

      function strike() {
        if (stopped) return
        // Brief amplitude swell to simulate rim strike
        gains[0].gain.setValueAtTime(gains[0].gain.value, ctx.currentTime)
        gains[0].gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.05)
        gains[0].gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 2.0)
        strikeTimer = setTimeout(strike, 6000 + Math.random() * 8000)
      }
      strikeTimer = setTimeout(strike, 1000)

      cleanups.push(() => {
        stopped = true
        if (strikeTimer) clearTimeout(strikeTimer)
        oscs.forEach(safeStop); safeStop(pulseOsc); safeStop(pulseOsc2)
      })
      break
    }

    // ── NEW: Deep Space ──────────────────────────────────────────────────────

    case 'space': {
      // Sub-bass cosmic drone
      const drone = loopSrc(ctx, brownBuffer(ctx, 8))
      const droneLpf = ctx.createBiquadFilter()
      droneLpf.type = 'lowpass'
      droneLpf.frequency.value = 80
      const droneGain = ctx.createGain()
      droneGain.gain.value = 1.2
      const [droneLfo, droneLfoG] = lfo(ctx, 0.02, 0.6)
      droneLfoG.connect(droneGain.gain)
      drone.connect(droneLpf); droneLpf.connect(droneGain); droneGain.connect(master)
      drone.start()

      // Very faint high shimmer (cosmic background radiation feel)
      const shimmer = loopSrc(ctx, whiteBuffer(ctx, 5))
      const shimmerLpf = ctx.createBiquadFilter()
      shimmerLpf.type = 'lowpass'
      shimmerLpf.frequency.value = 4000
      const shimmerGain = ctx.createGain()
      shimmerGain.gain.value = 0.04
      shimmer.connect(shimmerLpf); shimmerLpf.connect(shimmerGain); shimmerGain.connect(master)
      shimmer.start()

      // Distant radio-signal pings
      let stopped = false
      let pingTimer: ReturnType<typeof setTimeout> | null = null

      function ping() {
        if (stopped) return
        const freq = 200 + Math.random() * 600
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq
        const g = ctx.createGain()
        g.gain.setValueAtTime(0, ctx.currentTime)
        g.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5)
        osc.connect(g); g.connect(master)
        osc.start()
        setTimeout(() => safeStop(osc), 3000)
        pingTimer = setTimeout(ping, 8000 + Math.random() * 20000)
      }
      pingTimer = setTimeout(ping, 3000)

      cleanups.push(() => {
        stopped = true
        if (pingTimer) clearTimeout(pingTimer)
        safeStop(drone); safeStop(shimmer); safeStop(droneLfo)
      })
      break
    }
  }

  return { stop: () => cleanups.forEach((fn) => fn()) }
}
