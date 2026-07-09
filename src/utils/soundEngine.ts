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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loopSrc(ctx: AudioContext, buf: AudioBuffer): AudioBufferSourceNode {
  const src = ctx.createBufferSource()
  src.buffer = buf
  src.loop = true
  return src
}

function makeLFO(ctx: AudioContext, freq: number, depth: number): [OscillatorNode, GainNode] {
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
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 8000
      src.connect(lpf); lpf.connect(master)
      src.start()
      cleanups.push(() => safeStop(src))
      break
    }

    case 'brown-noise': {
      const src = loopSrc(ctx, brownBuffer(ctx))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 600
      src.connect(lpf); lpf.connect(master)
      src.start()
      cleanups.push(() => safeStop(src))
      break
    }

    case 'pink-noise': {
      const src = loopSrc(ctx, pinkBuffer(ctx))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 9000
      src.connect(lpf); lpf.connect(master)
      src.start()
      cleanups.push(() => safeStop(src))
      break
    }

    // ── Rain family ──────────────────────────────────────────────────────────
    // Rain = noise bed + individual drop impacts. The impacts are what make it
    // sound like RAIN rather than wind. Each drop is a short bandpass burst.

    case 'light-rain': {
      // Full-spectrum rain bed — not high-passed so it has body
      const bed = loopSrc(ctx, pinkBuffer(ctx, 4))
      const bedLpf = ctx.createBiquadFilter()
      bedLpf.type = 'lowpass'; bedLpf.frequency.value = 5000
      const bedHpf = ctx.createBiquadFilter()
      bedHpf.type = 'highpass'; bedHpf.frequency.value = 200
      const bedGain = ctx.createGain(); bedGain.gain.value = 0.28
      bed.connect(bedHpf); bedHpf.connect(bedLpf); bedLpf.connect(bedGain); bedGain.connect(master)
      bed.start()

      // High spray shimmer
      const spray = loopSrc(ctx, whiteBuffer(ctx, 3))
      const sprayHpf = ctx.createBiquadFilter()
      sprayHpf.type = 'highpass'; sprayHpf.frequency.value = 4000
      const sprayGain = ctx.createGain(); sprayGain.gain.value = 0.08
      spray.connect(sprayHpf); sprayHpf.connect(sprayGain); sprayGain.connect(master)
      spray.start()

      // Individual drip impacts — the defining character of rain
      let stopped = false
      let dripTimer: ReturnType<typeof setTimeout> | null = null
      const dripBuf = whiteBuffer(ctx, 0.1)

      function drip() {
        if (stopped) return
        const d = ctx.createBufferSource()
        d.buffer = dripBuf
        const f = ctx.createBiquadFilter()
        f.type = 'bandpass'
        f.frequency.value = 300 + Math.random() * 900
        f.Q.value = 1.8
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.18 + Math.random() * 0.28, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07)
        d.connect(f); f.connect(g); g.connect(master)
        d.start()
        setTimeout(() => safeStop(d), 110)
        dripTimer = setTimeout(drip, 70 + Math.random() * 380)
      }
      drip()

      cleanups.push(() => {
        stopped = true
        if (dripTimer) clearTimeout(dripTimer)
        safeStop(bed); safeStop(spray)
      })
      break
    }

    case 'heavy-rain': {
      // Deep body — downpour has real low-end weight
      const body = loopSrc(ctx, brownBuffer(ctx, 3))
      const bodyLpf = ctx.createBiquadFilter()
      bodyLpf.type = 'lowpass'; bodyLpf.frequency.value = 700
      const bodyGain = ctx.createGain(); bodyGain.gain.value = 0.55
      body.connect(bodyLpf); bodyLpf.connect(bodyGain); bodyGain.connect(master)
      body.start()

      // Mid hiss — sheets of rain
      const mid = loopSrc(ctx, pinkBuffer(ctx, 4))
      const midBpf = ctx.createBiquadFilter()
      midBpf.type = 'bandpass'; midBpf.frequency.value = 1000; midBpf.Q.value = 0.4
      const midGain = ctx.createGain(); midGain.gain.value = 0.65
      // Slow intensity swell — gusts of heavier rain
      const [gustOsc, gustG] = makeLFO(ctx, 0.25, 0.2)
      gustG.connect(midGain.gain)
      mid.connect(midBpf); midBpf.connect(midGain); midGain.connect(master)
      mid.start()

      // High spray
      const spray = loopSrc(ctx, whiteBuffer(ctx, 3))
      const sprayHpf = ctx.createBiquadFilter()
      sprayHpf.type = 'highpass'; sprayHpf.frequency.value = 3500
      const sprayGain = ctx.createGain(); sprayGain.gain.value = 0.18
      spray.connect(sprayHpf); sprayHpf.connect(sprayGain); sprayGain.connect(master)
      spray.start()

      // Heavy impacts — faster, deeper splashes
      let stopped = false
      let dripTimer: ReturnType<typeof setTimeout> | null = null
      const dripBuf = whiteBuffer(ctx, 0.12)

      function splash() {
        if (stopped) return
        const d = ctx.createBufferSource()
        d.buffer = dripBuf
        const f = ctx.createBiquadFilter()
        f.type = 'bandpass'
        f.frequency.value = 150 + Math.random() * 700
        f.Q.value = 1.2
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.25 + Math.random() * 0.45, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)
        d.connect(f); f.connect(g); g.connect(master)
        d.start()
        setTimeout(() => safeStop(d), 130)
        dripTimer = setTimeout(splash, 30 + Math.random() * 120)
      }
      splash()

      cleanups.push(() => {
        stopped = true
        if (dripTimer) clearTimeout(dripTimer)
        safeStop(body); safeStop(mid); safeStop(spray); safeStop(gustOsc)
      })
      break
    }

    case 'thunderstorm': {
      // Heavy rain base
      const body = loopSrc(ctx, brownBuffer(ctx, 3))
      const bodyLpf = ctx.createBiquadFilter()
      bodyLpf.type = 'lowpass'; bodyLpf.frequency.value = 600
      const bodyGain = ctx.createGain(); bodyGain.gain.value = 0.5
      body.connect(bodyLpf); bodyLpf.connect(bodyGain); bodyGain.connect(master)
      body.start()

      const rain = loopSrc(ctx, pinkBuffer(ctx, 4))
      const rainBpf = ctx.createBiquadFilter()
      rainBpf.type = 'bandpass'; rainBpf.frequency.value = 1200; rainBpf.Q.value = 0.4
      const rainGain = ctx.createGain(); rainGain.gain.value = 0.7
      const [gustOsc, gustG] = makeLFO(ctx, 0.3, 0.22)
      gustG.connect(rainGain.gain)
      rain.connect(rainBpf); rainBpf.connect(rainGain); rainGain.connect(master)
      rain.start()

      // Rain drops
      let stopped = false
      let dripTimer: ReturnType<typeof setTimeout> | null = null
      const dripBuf = whiteBuffer(ctx, 0.1)
      function drip() {
        if (stopped) return
        const d = ctx.createBufferSource(); d.buffer = dripBuf
        const f = ctx.createBiquadFilter(); f.type = 'bandpass'
        f.frequency.value = 200 + Math.random() * 800; f.Q.value = 1.2
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.2 + Math.random() * 0.4, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)
        d.connect(f); f.connect(g); g.connect(master)
        d.start(); setTimeout(() => safeStop(d), 130)
        dripTimer = setTimeout(drip, 35 + Math.random() * 130)
      }
      drip()

      // Thunder — low-frequency rumble that builds and fades
      const thunderBuf = brownBuffer(ctx, 5)
      let timer: ReturnType<typeof setTimeout> | null = null

      function boom() {
        if (stopped) return
        const tSrc = ctx.createBufferSource()
        tSrc.buffer = thunderBuf
        const tGain = ctx.createGain()
        const tLpf = ctx.createBiquadFilter()
        tLpf.type = 'lowpass'; tLpf.frequency.value = 150
        tGain.gain.setValueAtTime(0, ctx.currentTime)
        tGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.03)
        tGain.gain.linearRampToValueAtTime(3.5, ctx.currentTime + 0.08)
        tGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.0)
        tSrc.connect(tLpf); tLpf.connect(tGain); tGain.connect(master)
        tSrc.start()
        setTimeout(() => safeStop(tSrc), 6000)
        timer = setTimeout(() => { boom() }, 12000 + Math.random() * 20000)
      }
      timer = setTimeout(boom, 3000 + Math.random() * 8000)

      cleanups.push(() => {
        stopped = true
        if (dripTimer) clearTimeout(dripTimer)
        if (timer) clearTimeout(timer)
        safeStop(body); safeStop(rain); safeStop(gustOsc)
      })
      break
    }

    case 'rain-roof': {
      // Lower steady rain noise base
      const bed = loopSrc(ctx, pinkBuffer(ctx, 3))
      const bedBpf = ctx.createBiquadFilter()
      bedBpf.type = 'bandpass'; bedBpf.frequency.value = 1200; bedBpf.Q.value = 0.6
      const bedGain = ctx.createGain(); bedGain.gain.value = 0.35
      bed.connect(bedBpf); bedBpf.connect(bedGain); bedGain.connect(master)
      bed.start()

      // Metallic resonance layer — tin roof has a characteristic ring
      const ring = loopSrc(ctx, whiteBuffer(ctx, 3))
      const ringBpf = ctx.createBiquadFilter()
      ringBpf.type = 'bandpass'; ringBpf.frequency.value = 2200; ringBpf.Q.value = 3
      const ringGain = ctx.createGain(); ringGain.gain.value = 0.12
      ring.connect(ringBpf); ringBpf.connect(ringGain); ringGain.connect(master)
      ring.start()

      // Individual metallic ticks — the defining sound of rain on metal
      let stopped = false
      let tickTimer: ReturnType<typeof setTimeout> | null = null
      const tickBuf = whiteBuffer(ctx, 0.05)

      function tick() {
        if (stopped) return
        const t = ctx.createBufferSource(); t.buffer = tickBuf
        const tBpf = ctx.createBiquadFilter()
        tBpf.type = 'bandpass'
        // Metallic ping: 1000-3000 Hz with high Q for resonant quality
        tBpf.frequency.value = 1000 + Math.random() * 2000
        tBpf.Q.value = 6 + Math.random() * 6
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.3 + Math.random() * 0.5, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
        t.connect(tBpf); tBpf.connect(g); g.connect(master)
        t.start()
        setTimeout(() => safeStop(t), 90)
        tickTimer = setTimeout(tick, 50 + Math.random() * 180)
      }
      tick()

      cleanups.push(() => {
        stopped = true
        if (tickTimer) clearTimeout(tickTimer)
        safeStop(bed); safeStop(ring)
      })
      break
    }

    // ── Water family ─────────────────────────────────────────────────────────
    // Water sounds are distinct from wind because they have RAPID IRREGULAR
    // amplitude modulation at multiple frequency bands simultaneously.
    // This is what makes gurgling sound liquid, not like wind.

    case 'ocean': {
      // Ocean = very slow wave swell (8-14 second period = ~0.07 Hz)
      // Three layers: deep rumble, surf crash, foam hiss

      // Deep bass rumble — the body of the wave
      const rumble = loopSrc(ctx, brownBuffer(ctx, 6))
      const rumbleLpf = ctx.createBiquadFilter()
      rumbleLpf.type = 'lowpass'; rumbleLpf.frequency.value = 250
      const rumbleGain = ctx.createGain(); rumbleGain.gain.value = 0.65
      const [swellOsc, swellG] = makeLFO(ctx, 0.068, 0.55)  // ~14s wave period
      swellG.connect(rumbleGain.gain)
      rumble.connect(rumbleLpf); rumbleLpf.connect(rumbleGain); rumbleGain.connect(master)
      rumble.start()

      // Mid surf — the wave breaking
      const surf = loopSrc(ctx, pinkBuffer(ctx, 5))
      const surfBpf = ctx.createBiquadFilter()
      surfBpf.type = 'bandpass'; surfBpf.frequency.value = 700; surfBpf.Q.value = 0.5
      const surfGain = ctx.createGain(); surfGain.gain.value = 0.55
      const [surfSwell, surfSwellG] = makeLFO(ctx, 0.068, 0.45)
      surfSwellG.connect(surfGain.gain)
      surf.connect(surfBpf); surfBpf.connect(surfGain); surfGain.connect(master)
      surf.start()

      // Foam hiss — the receding water over sand/pebbles
      const foam = loopSrc(ctx, whiteBuffer(ctx, 4))
      const foamHpf = ctx.createBiquadFilter()
      foamHpf.type = 'highpass'; foamHpf.frequency.value = 2500
      const foamLpf = ctx.createBiquadFilter()
      foamLpf.type = 'lowpass'; foamLpf.frequency.value = 7000
      const foamGain = ctx.createGain(); foamGain.gain.value = 0.12
      // Foam comes AFTER the wave peak — slightly delayed phase
      const [foamSwell, foamSwellG] = makeLFO(ctx, 0.068, 0.10)
      foamSwellG.connect(foamGain.gain)
      foam.connect(foamHpf); foamHpf.connect(foamLpf); foamLpf.connect(foamGain); foamGain.connect(master)
      foam.start()

      cleanups.push(() => {
        safeStop(rumble); safeStop(surf); safeStop(foam)
        safeStop(swellOsc); safeStop(surfSwell); safeStop(foamSwell)
      })
      break
    }

    case 'stream': {
      // Babbling brook = multiple bandpass noise sources each with its own
      // RAPID LFO at incommensurable rates — this creates the gurgling quality
      // that distinguishes water from wind.

      const noiseBuf = whiteBuffer(ctx, 6)

      // Low base flow — water mass moving
      const base = loopSrc(ctx, brownBuffer(ctx, 5))
      const baseLpf = ctx.createBiquadFilter()
      baseLpf.type = 'lowpass'; baseLpf.frequency.value = 350
      const baseGain = ctx.createGain(); baseGain.gain.value = 0.45
      base.connect(baseLpf); baseLpf.connect(baseGain); baseGain.connect(master)
      base.start()

      // Gurgle layers — multiple frequencies, each modulated at different rates
      // The incommensurable rates prevent repetition and create organic feel
      const layers = [
        { freq: 220, q: 0.7, gain: 0.42, lfoHz: 1.1,  depth: 0.35 },
        { freq: 480, q: 0.5, gain: 0.52, lfoHz: 2.3,  depth: 0.45 },
        { freq: 850, q: 0.6, gain: 0.38, lfoHz: 4.1,  depth: 0.32 },
        { freq: 1500, q: 0.8, gain: 0.22, lfoHz: 6.7, depth: 0.20 },
      ]

      for (const layer of layers) {
        const src = loopSrc(ctx, noiseBuf)
        const bpf = ctx.createBiquadFilter()
        bpf.type = 'bandpass'; bpf.frequency.value = layer.freq; bpf.Q.value = layer.q
        const amp = ctx.createGain(); amp.gain.value = layer.gain * 0.22
        const lfoOsc = ctx.createOscillator()
        lfoOsc.type = 'sine'; lfoOsc.frequency.value = layer.lfoHz
        const lfoGain = ctx.createGain()
        lfoGain.gain.value = layer.depth * layer.gain * 0.22
        lfoOsc.connect(lfoGain); lfoGain.connect(amp.gain)
        lfoOsc.start()
        src.connect(bpf); bpf.connect(amp); amp.connect(master)
        src.start()
        cleanups.push(() => { safeStop(src); safeStop(lfoOsc) })
      }

      // Bubble pops — air escaping from under rocks
      let stopped = false
      let bubbleTimer: ReturnType<typeof setTimeout> | null = null
      const bubbleBuf = whiteBuffer(ctx, 0.08)

      function bubble() {
        if (stopped) return
        const b = ctx.createBufferSource(); b.buffer = bubbleBuf
        const bpf = ctx.createBiquadFilter()
        bpf.type = 'bandpass'
        bpf.frequency.value = 350 + Math.random() * 1000; bpf.Q.value = 3
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.14 + Math.random() * 0.22, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)
        b.connect(bpf); bpf.connect(g); g.connect(master)
        b.start(); setTimeout(() => safeStop(b), 130)
        bubbleTimer = setTimeout(bubble, 100 + Math.random() * 1000)
      }
      bubble()

      cleanups.push(() => {
        stopped = true
        if (bubbleTimer) clearTimeout(bubbleTimer)
        safeStop(base)
      })
      break
    }

    case 'underwater': {
      // Very muffled deep low end, slow pressure changes, bubble trail
      const deep = loopSrc(ctx, brownBuffer(ctx, 5))
      const deepLpf = ctx.createBiquadFilter()
      deepLpf.type = 'lowpass'; deepLpf.frequency.value = 120
      const deepGain = ctx.createGain(); deepGain.gain.value = 0.9
      const [pressOsc, pressG] = makeLFO(ctx, 0.05, 0.5)
      pressG.connect(deepGain.gain)
      deep.connect(deepLpf); deepLpf.connect(deepGain); deepGain.connect(master)
      deep.start()

      // Subtle resonant body — underwater has a hollow quality
      const hollow = loopSrc(ctx, pinkBuffer(ctx, 4))
      const hollowBpf = ctx.createBiquadFilter()
      hollowBpf.type = 'bandpass'; hollowBpf.frequency.value = 320; hollowBpf.Q.value = 2
      const hollowGain = ctx.createGain(); hollowGain.gain.value = 0.18
      hollow.connect(hollowBpf); hollowBpf.connect(hollowGain); hollowGain.connect(master)
      hollow.start()

      // Bubble streams
      let stopped = false
      let bubbleTimer: ReturnType<typeof setTimeout> | null = null
      const bubbleBuf = whiteBuffer(ctx, 0.06)

      function bubble() {
        if (stopped) return
        const b = ctx.createBufferSource(); b.buffer = bubbleBuf
        const bpf = ctx.createBiquadFilter()
        bpf.type = 'bandpass'; bpf.frequency.value = 800 + Math.random() * 1500; bpf.Q.value = 5
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.08 + Math.random() * 0.14, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
        b.connect(bpf); bpf.connect(g); g.connect(master)
        b.start(); setTimeout(() => safeStop(b), 90)
        bubbleTimer = setTimeout(bubble, 80 + Math.random() * 600)
      }
      bubble()

      cleanups.push(() => {
        stopped = true
        if (bubbleTimer) clearTimeout(bubbleTimer)
        safeStop(deep); safeStop(hollow); safeStop(pressOsc)
      })
      break
    }

    // ── Atmosphere ───────────────────────────────────────────────────────────

    case 'wind': {
      // Wind has a SMOOTH slow swell — the opposite of water's rapid gurgling
      const src = loopSrc(ctx, pinkBuffer(ctx, 5))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'; lpf.frequency.value = 1200
      const hpf = ctx.createBiquadFilter()
      hpf.type = 'highpass'; hpf.frequency.value = 80
      const amp = ctx.createGain(); amp.gain.value = 0.75
      // Very slow gust — 25-40 second period
      const [gustOsc, gustG] = makeLFO(ctx, 0.03, 0.55)
      gustG.connect(amp.gain)

      // Whistle layer — wind through a gap/crack
      const src2 = loopSrc(ctx, pinkBuffer(ctx, 4))
      const whistleBpf = ctx.createBiquadFilter()
      whistleBpf.type = 'bandpass'; whistleBpf.frequency.value = 600; whistleBpf.Q.value = 3
      const whistleGain = ctx.createGain(); whistleGain.gain.value = 0.14
      const [whistleLfo, whistleLfoG] = makeLFO(ctx, 0.07, 0.10)
      whistleLfoG.connect(whistleGain.gain)

      src.connect(hpf); hpf.connect(lpf); lpf.connect(amp); amp.connect(master)
      src2.connect(whistleBpf); whistleBpf.connect(whistleGain); whistleGain.connect(master)
      src.start(); src2.start()
      cleanups.push(() => { safeStop(src); safeStop(src2); safeStop(gustOsc); safeStop(whistleLfo) })
      break
    }

    case 'fan': {
      // Fan motor: fundamental tone at 120 Hz + harmonics, plus air noise
      const motorFreqs = [120, 240, 360, 480]
      const motorGains = [0.12, 0.06, 0.03, 0.015]
      const motorOscs: OscillatorNode[] = []

      for (let i = 0; i < motorFreqs.length; i++) {
        const osc = ctx.createOscillator()
        osc.type = 'sine'; osc.frequency.value = motorFreqs[i]
        const g = ctx.createGain(); g.gain.value = motorGains[i]
        osc.connect(g); g.connect(master)
        osc.start()
        motorOscs.push(osc)
      }

      // Air movement — white noise filtered to mid range
      const air = loopSrc(ctx, whiteBuffer(ctx, 3))
      const airBpf = ctx.createBiquadFilter()
      airBpf.type = 'bandpass'; airBpf.frequency.value = 400; airBpf.Q.value = 0.3
      const airGain = ctx.createGain(); airGain.gain.value = 0.3
      // Blade wobble — slight rhythmic amplitude pulse
      const [bladeOsc, bladeG] = makeLFO(ctx, 5.5, 0.06)
      bladeG.connect(airGain.gain)
      air.connect(airBpf); airBpf.connect(airGain); airGain.connect(master)
      air.start()

      cleanups.push(() => { motorOscs.forEach(safeStop); safeStop(air); safeStop(bladeOsc) })
      break
    }

    // ── Fire ─────────────────────────────────────────────────────────────────

    case 'fireplace': {
      // Deep combustion rumble
      const rumble = loopSrc(ctx, brownBuffer(ctx, 4))
      const rumbleLpf = ctx.createBiquadFilter()
      rumbleLpf.type = 'lowpass'; rumbleLpf.frequency.value = 180
      const rumbleGain = ctx.createGain(); rumbleGain.gain.value = 0.55
      // Slow flame breathe
      const [breathOsc, breathG] = makeLFO(ctx, 0.4, 0.18)
      breathG.connect(rumbleGain.gain)
      rumble.connect(rumbleLpf); rumbleLpf.connect(rumbleGain); rumbleGain.connect(master)
      rumble.start()

      // Crackle source
      let stopped = false
      let crackleTimer: ReturnType<typeof setTimeout> | null = null
      const crackBuf = whiteBuffer(ctx, 0.08)

      function crackle() {
        if (stopped) return
        const size = Math.random()
        const duration = 0.015 + size * 0.07
        const cSrc = ctx.createBufferSource(); cSrc.buffer = crackBuf
        const hpf = ctx.createBiquadFilter()
        hpf.type = 'highpass'
        // Most crackles 600-2500 Hz; occasional higher-pitched spark
        hpf.frequency.value = 500 + size * 1500
        const cGain = ctx.createGain()
        cGain.gain.setValueAtTime(0.35 + size * 0.85, ctx.currentTime)
        cGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
        cSrc.connect(hpf); hpf.connect(cGain); cGain.connect(master)
        cSrc.start()
        setTimeout(() => safeStop(cSrc), (duration + 0.02) * 1000)

        // Small crackles come rapid-fire; big pops are isolated
        if (size < 0.3) {
          crackleTimer = setTimeout(crackle, 20 + Math.random() * 80)
        } else if (size < 0.7) {
          crackleTimer = setTimeout(crackle, 120 + Math.random() * 500)
        } else {
          crackleTimer = setTimeout(crackle, 400 + Math.random() * 1200)
        }
      }
      crackle()

      cleanups.push(() => {
        stopped = true
        if (crackleTimer) clearTimeout(crackleTimer)
        safeStop(rumble); safeStop(breathOsc)
      })
      break
    }

    // ── Nature ───────────────────────────────────────────────────────────────

    case 'forest': {
      // Subtle wind-through-leaves background — quieter than before
      const src = loopSrc(ctx, pinkBuffer(ctx, 4))
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'; lpf.frequency.value = 800
      const bgGain = ctx.createGain(); bgGain.gain.value = 0.14
      const [windOsc, windG] = makeLFO(ctx, 0.04, 0.08)
      windG.connect(bgGain.gain)
      src.connect(lpf); lpf.connect(bgGain); bgGain.connect(master)
      src.start()

      // Bird calls — FM synthesis
      let stopped = false
      let birdTimer: ReturnType<typeof setTimeout> | null = null

      function chirp() {
        if (stopped) return
        const baseFreq = 1800 + Math.random() * 2400
        const numNotes = 1 + Math.floor(Math.random() * 5)
        const bird = Math.random()

        for (let n = 0; n < numNotes; n++) {
          const tOffset = n * (0.09 + Math.random() * 0.14)
          const osc = ctx.createOscillator()
          osc.type = bird < 0.5 ? 'sine' : 'triangle'
          osc.frequency.setValueAtTime(baseFreq + n * 120, ctx.currentTime + tOffset)
          osc.frequency.linearRampToValueAtTime(baseFreq * (1.08 + bird * 0.25), ctx.currentTime + tOffset + 0.06)
          osc.frequency.linearRampToValueAtTime(baseFreq * 0.96, ctx.currentTime + tOffset + 0.14)
          const mod = ctx.createOscillator()
          const modGain = ctx.createGain()
          mod.frequency.value = baseFreq * (0.5 + bird * 0.3)
          modGain.gain.value = 30 + bird * 60
          mod.connect(modGain); modGain.connect(osc.frequency)
          const g = ctx.createGain()
          g.gain.setValueAtTime(0, ctx.currentTime + tOffset)
          g.gain.linearRampToValueAtTime(0.09 + bird * 0.04, ctx.currentTime + tOffset + 0.02)
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tOffset + 0.2)
          osc.connect(g); g.connect(master)
          osc.start(ctx.currentTime + tOffset)
          mod.start(ctx.currentTime + tOffset)
          setTimeout(() => { safeStop(osc); safeStop(mod) }, (tOffset + 0.35) * 1000)
        }
        birdTimer = setTimeout(chirp, 1500 + Math.random() * 5000)
      }
      chirp()

      cleanups.push(() => {
        stopped = true
        if (birdTimer) clearTimeout(birdTimer)
        safeStop(src); safeStop(windOsc)
      })
      break
    }

    case 'crickets': {
      // Real crickets: amplitude-modulated tones (stridulation), not bandpass noise
      // Each "colony" is a carrier oscillator with fast AM at the chirp rate (~18 Hz)
      // Multiple colonies at slightly different frequencies = chorus effect

      const colonies = [
        { carrier: 3200, chirpRate: 18.5, gain: 0.22 },
        { carrier: 3600, chirpRate: 20.2, gain: 0.18 },
        { carrier: 2900, chirpRate: 17.1, gain: 0.14 },
        { carrier: 4100, chirpRate: 21.8, gain: 0.10 },
      ]
      const oscNodes: OscillatorNode[] = []

      for (const colony of colonies) {
        const carrier = ctx.createOscillator()
        carrier.type = 'sine'; carrier.frequency.value = colony.carrier
        const ampEnv = ctx.createGain(); ampEnv.gain.value = 0
        // AM oscillator — the wing-stroke rate
        const amOsc = ctx.createOscillator()
        amOsc.type = 'sine'; amOsc.frequency.value = colony.chirpRate
        const amGain = ctx.createGain(); amGain.gain.value = colony.gain
        // DC offset so amplitude doesn't go negative
        const dc = ctx.createGain(); dc.gain.value = colony.gain
        amOsc.connect(amGain); amGain.connect(ampEnv.gain)
        dc.connect(ampEnv.gain)
        carrier.connect(ampEnv); ampEnv.connect(master)
        carrier.start(); amOsc.start()
        oscNodes.push(carrier, amOsc)
      }

      // Night ambience — very soft low noise bed
      const night = loopSrc(ctx, brownBuffer(ctx, 4))
      const nightLpf = ctx.createBiquadFilter()
      nightLpf.type = 'lowpass'; nightLpf.frequency.value = 200
      const nightGain = ctx.createGain(); nightGain.gain.value = 0.1
      night.connect(nightLpf); nightLpf.connect(nightGain); nightGain.connect(master)
      night.start()

      cleanups.push(() => { oscNodes.forEach(safeStop); safeStop(night) })
      break
    }

    // ── Cafe / Coffee Shop ───────────────────────────────────────────────────

    case 'cafe': {
      // Low murmur of voices — bandpass noise with formant character
      const murmur = loopSrc(ctx, pinkBuffer(ctx, 5))
      const murmurBpf = ctx.createBiquadFilter()
      murmurBpf.type = 'bandpass'; murmurBpf.frequency.value = 350; murmurBpf.Q.value = 0.4
      const murmurGain = ctx.createGain(); murmurGain.gain.value = 0.5
      const [murmurLfo, murmurLfoG] = makeLFO(ctx, 0.12, 0.15)
      murmurLfoG.connect(murmurGain.gain)
      murmur.connect(murmurBpf); murmurBpf.connect(murmurGain); murmurGain.connect(master)
      murmur.start()

      // Higher voice register — consonant/speech presence
      const chatter = loopSrc(ctx, pinkBuffer(ctx, 4))
      const chatterBpf = ctx.createBiquadFilter()
      chatterBpf.type = 'bandpass'; chatterBpf.frequency.value = 1400; chatterBpf.Q.value = 0.5
      const chatterGain = ctx.createGain(); chatterGain.gain.value = 0.18
      const [chatterLfo, chatterLfoG] = makeLFO(ctx, 0.23, 0.14)
      chatterLfoG.connect(chatterGain.gain)
      chatter.connect(chatterBpf); chatterBpf.connect(chatterGain); chatterGain.connect(master)
      chatter.start()

      // HVAC / room hum underneath
      const hum = loopSrc(ctx, brownBuffer(ctx, 4))
      const humLpf = ctx.createBiquadFilter()
      humLpf.type = 'lowpass'; humLpf.frequency.value = 180
      const humGain = ctx.createGain(); humGain.gain.value = 0.18
      hum.connect(humLpf); humLpf.connect(humGain); humGain.connect(master)
      hum.start()

      // Occasional cup/cutlery clink
      let stopped = false
      let clinkTimer: ReturnType<typeof setTimeout> | null = null
      const clinkBuf = whiteBuffer(ctx, 0.05)

      function clink() {
        if (stopped) return
        const c = ctx.createBufferSource(); c.buffer = clinkBuf
        const bpfc = ctx.createBiquadFilter()
        bpfc.type = 'bandpass'
        bpfc.frequency.value = 2500 + Math.random() * 3500
        bpfc.Q.value = 10 + Math.random() * 10
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.1 + Math.random() * 0.18, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
        c.connect(bpfc); bpfc.connect(g); g.connect(master)
        c.start(); setTimeout(() => safeStop(c), 80)
        clinkTimer = setTimeout(clink, 3000 + Math.random() * 10000)
      }
      clink()

      cleanups.push(() => {
        stopped = true
        if (clinkTimer) clearTimeout(clinkTimer)
        safeStop(murmur); safeStop(chatter); safeStop(hum)
        safeStop(murmurLfo); safeStop(chatterLfo)
      })
      break
    }

    // ── Singing / Tibetan Bowl ───────────────────────────────────────────────

    case 'tibetan-bowl': {
      const freqs = [432, 864, 648, 1296]
      const volumes = [0.20, 0.08, 0.06, 0.03]
      const oscs: OscillatorNode[] = []
      const gains: GainNode[] = []

      for (let h = 0; h < freqs.length; h++) {
        const osc = ctx.createOscillator()
        osc.type = 'sine'; osc.frequency.value = freqs[h]
        const g = ctx.createGain(); g.gain.value = volumes[h]
        osc.connect(g); g.connect(master)
        osc.start()
        oscs.push(osc); gains.push(g)
      }

      const [pulseOsc, pulseG] = makeLFO(ctx, 0.2, 0.07)
      pulseG.connect(gains[0].gain)
      const [pulseOsc2, pulseG2] = makeLFO(ctx, 0.31, 0.04)
      pulseG2.connect(gains[1].gain)

      let stopped = false
      let strikeTimer: ReturnType<typeof setTimeout> | null = null

      function strike() {
        if (stopped) return
        gains[0].gain.setValueAtTime(gains[0].gain.value, ctx.currentTime)
        gains[0].gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.06)
        gains[0].gain.exponentialRampToValueAtTime(0.20, ctx.currentTime + 2.5)
        strikeTimer = setTimeout(strike, 7000 + Math.random() * 9000)
      }
      strikeTimer = setTimeout(strike, 800)

      cleanups.push(() => {
        stopped = true
        if (strikeTimer) clearTimeout(strikeTimer)
        oscs.forEach(safeStop); safeStop(pulseOsc); safeStop(pulseOsc2)
      })
      break
    }

    // ── Deep Space ───────────────────────────────────────────────────────────

    case 'space': {
      const drone = loopSrc(ctx, brownBuffer(ctx, 8))
      const droneLpf = ctx.createBiquadFilter()
      droneLpf.type = 'lowpass'; droneLpf.frequency.value = 80
      const droneGain = ctx.createGain(); droneGain.gain.value = 1.1
      const [droneLfo, droneLfoG] = makeLFO(ctx, 0.02, 0.55)
      droneLfoG.connect(droneGain.gain)
      drone.connect(droneLpf); droneLpf.connect(droneGain); droneGain.connect(master)
      drone.start()

      const shimmer = loopSrc(ctx, whiteBuffer(ctx, 5))
      const shimmerLpf = ctx.createBiquadFilter()
      shimmerLpf.type = 'lowpass'; shimmerLpf.frequency.value = 5000
      const shimmerGain = ctx.createGain(); shimmerGain.gain.value = 0.03
      shimmer.connect(shimmerLpf); shimmerLpf.connect(shimmerGain); shimmerGain.connect(master)
      shimmer.start()

      let stopped = false
      let pingTimer: ReturnType<typeof setTimeout> | null = null

      function ping() {
        if (stopped) return
        const freq = 180 + Math.random() * 500
        const osc = ctx.createOscillator()
        osc.type = 'sine'; osc.frequency.value = freq
        const g = ctx.createGain()
        g.gain.setValueAtTime(0, ctx.currentTime)
        g.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.15)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0)
        osc.connect(g); g.connect(master)
        osc.start(); setTimeout(() => safeStop(osc), 3500)
        pingTimer = setTimeout(ping, 9000 + Math.random() * 22000)
      }
      pingTimer = setTimeout(ping, 4000)

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
