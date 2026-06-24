import { useState, useMemo } from 'react'
import { TTSState } from '../../types'
import { Button } from '../ui/Button'
import { useLanguage, interp } from '../../i18n'

interface TTSControlProps {
  ttsState: TTSState
  hasText: boolean
  totalWords: number
  availableVoices: SpeechSynthesisVoice[]
  selectedVoiceURI: string
  onSpeak: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  onVoiceChange: (uri: string) => void
}

// Get a human-readable language name from a BCP-47 tag
function getLangDisplayName(langTag: string): string {
  try {
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(langTag) ?? langTag
  } catch {
    return langTag
  }
}

// Build voice display label: "Samantha (English, US) · ♀"
function getVoiceLabel(voice: SpeechSynthesisVoice): string {
  const langName = getLangDisplayName(voice.lang)
  const n = voice.name.toLowerCase()
  const isMale = /\b(alex|daniel|fred|ralph|thomas|arthur|oliver|bruce|gordon|lee|tom|rishi|carlos|jorge|diego|luca|matteo|henrik|stefan|yuri)\b/.test(n)
  const isFemale = /\b(samantha|victoria|karen|moira|tessa|fiona|kate|sarah|lisa|alice|veena|siri|aurora|emily|jessica|ashley|joanna|zira|hazel)\b/.test(n)
  const gender = isMale ? ' · ♂' : isFemale ? ' · ♀' : ''
  return `${voice.name} (${langName})${gender}`
}

// Short label for display in the button (not the dropdown)
function getVoiceShortLabel(voice: SpeechSynthesisVoice): string {
  const langName = getLangDisplayName(voice.lang)
  return `${voice.name} (${langName})`
}

// Group voices by language tag
function groupVoices(
  voices: SpeechSynthesisVoice[],
  ttsLangCode: string
): { label: string; voices: SpeechSynthesisVoice[] }[] {
  const matching: SpeechSynthesisVoice[] = []
  const other: SpeechSynthesisVoice[] = []

  for (const v of voices) {
    if (v.lang.toLowerCase().startsWith(ttsLangCode.toLowerCase())) {
      matching.push(v)
    } else {
      other.push(v)
    }
  }

  const groups: { label: string; voices: SpeechSynthesisVoice[] }[] = []

  if (matching.length > 0) {
    // Sub-group by dialect
    const dialectMap: Record<string, SpeechSynthesisVoice[]> = {}
    for (const v of matching) {
      if (!dialectMap[v.lang]) dialectMap[v.lang] = []
      dialectMap[v.lang].push(v)
    }
    for (const [lang, vv] of Object.entries(dialectMap)) {
      groups.push({ label: getLangDisplayName(lang), voices: vv })
    }
  }

  if (other.length > 0) {
    // Group other languages together
    const otherByLang: Record<string, SpeechSynthesisVoice[]> = {}
    for (const v of other) {
      if (!otherByLang[v.lang]) otherByLang[v.lang] = []
      otherByLang[v.lang].push(v)
    }
    // Sort other languages alphabetically
    const sortedOther = Object.entries(otherByLang).sort(([a], [b]) =>
      getLangDisplayName(a).localeCompare(getLangDisplayName(b))
    )
    for (const [lang, vv] of sortedOther) {
      groups.push({ label: getLangDisplayName(lang), voices: vv })
    }
  }

  return groups
}

export function TTSControl({
  ttsState,
  hasText,
  totalWords,
  availableVoices,
  selectedVoiceURI,
  onSpeak,
  onPause,
  onResume,
  onStop,
  onVoiceChange,
}: TTSControlProps) {
  const { t } = useLanguage()
  const s = t.sidebar
  const [showVoices, setShowVoices] = useState(false)
  const [search, setSearch] = useState('')
  const { isPlaying, isPaused, currentWordIndex } = ttsState
  const isActive = isPlaying || isPaused

  const currentVoice = availableVoices.find((v) => v.voiceURI === selectedVoiceURI)
  const currentVoiceLabel = currentVoice ? getVoiceShortLabel(currentVoice) : s.voiceLabel

  // Filter voices by search term
  const filteredVoices = useMemo(() => {
    if (!search.trim()) return availableVoices
    const q = search.toLowerCase()
    return availableVoices.filter((v) => {
      const label = getVoiceLabel(v).toLowerCase()
      const lang = getLangDisplayName(v.lang).toLowerCase()
      return label.includes(q) || lang.includes(q) || v.lang.toLowerCase().includes(q)
    })
  }, [availableVoices, search])

  const groups = groupVoices(filteredVoices, t.ttsLangCode)

  return (
    <div className="space-y-3">
      {/* Play / Pause / Stop row */}
      <div className="flex gap-2">
        {!isPlaying ? (
          <Button variant="primary" size="sm" onClick={isPaused ? onResume : onSpeak} disabled={!hasText} className="flex-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            {isPaused ? s.resumeBtn : s.speakBtn}
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={onPause} className="flex-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            </svg>
            {s.pauseBtn}
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onStop} disabled={!isActive}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="16" height="16"/>
          </svg>
          {s.stopBtn}
        </Button>
      </div>

      {/* Speaking indicator */}
      {isPlaying && (
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1 bg-sky-400 rounded-full animate-bounce"
              style={{ height: `${10 + i * 3}px`, animationDelay: `${i * 0.12}s` }}
            />
          ))}
          <span className="text-xs text-sky-500 font-medium ml-1">{s.speaking}</span>
        </div>
      )}

      {isActive && currentWordIndex !== null && (
        <div className="text-xs text-slate-400 text-center">
          {interp(s.wordProgress, { current: currentWordIndex + 1, total: totalWords })}
        </div>
      )}

      {/* Voice selector */}
      <div className="space-y-1.5">
        {/* Current voice button */}
        <button
          onClick={() => { setShowVoices((v) => !v); setSearch('') }}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/50 transition-all text-left"
        >
          <div className="flex items-center gap-2 min-w-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-500 shrink-0">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
            <span className="text-xs text-slate-600 font-medium truncate">{currentVoiceLabel}</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`text-slate-400 shrink-0 transition-transform ${showVoices ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {/* Dropdown with search */}
        {showVoices && (
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-lg">
            {/* Search box */}
            <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 shrink-0">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={s.voiceSearch ?? 'Search voice or language…'}
                  autoFocus
                  className="flex-1 text-xs bg-transparent outline-none text-slate-600 placeholder:text-slate-400"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-52 overflow-y-auto">
              {availableVoices.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">{s.noVoices}</p>
              ) : groups.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">{s.voiceNoMatch ?? 'No voices match'} "{search}"</p>
              ) : (
                groups.map((group) => (
                  <div key={group.label}>
                    <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100 sticky top-0">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{group.label}</span>
                    </div>
                    {group.voices.map((voice) => (
                      <button
                        key={voice.voiceURI}
                        onClick={() => { onVoiceChange(voice.voiceURI); setShowVoices(false); setSearch('') }}
                        className={`w-full text-left px-3 py-2.5 text-xs transition-colors border-b border-slate-50 last:border-0
                          ${selectedVoiceURI === voice.voiceURI
                            ? 'bg-sky-50 text-sky-700 font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        {getVoiceLabel(voice)}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-300 text-center leading-relaxed">{s.firefoxNote}</p>
    </div>
  )
}
