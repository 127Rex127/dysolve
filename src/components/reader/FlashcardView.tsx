import { useState, useEffect, useCallback } from 'react'
import { useWordDefinition } from '../../hooks/useWordDefinition'
import { LANG_NAMES } from '../../hooks/useWordDefinition'
import { useLanguage } from '../../i18n'

interface FlashcardViewProps {
  boldedWords: Map<number, string>
  sourceLang: string
  onClose: () => void
}

interface CardState {
  wordIndex: number
  word: string
  flipped: boolean
  learned: boolean
}

function SingleCard({
  word,
  sourceLang,
  targetLang,
  flipped,
  onFlip,
}: {
  word: string
  sourceLang: string
  targetLang: string
  flipped: boolean
  onFlip: () => void
}) {
  const { state, lookup } = useWordDefinition()
  const { t } = useLanguage()
  const s = t.sidebar

  useEffect(() => {
    lookup(word, sourceLang, targetLang)
  }, [word, sourceLang, targetLang]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{ perspective: '1200px', height: 280 }}
      onClick={onFlip}
    >
      {/* Front */}
      <div
        className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center bg-white shadow-2xl border border-slate-100 transition-all duration-500 backface-hidden px-8"
        style={{
          backfaceVisibility: 'hidden',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">{s.flashcardTapReveal ?? 'Tap to reveal'}</p>
        <p className="text-4xl font-bold text-slate-800 text-center leading-tight">{word}</p>
        <p className="mt-4 text-xs text-sky-500">{LANG_NAMES[sourceLang] ?? sourceLang}</p>
      </div>

      {/* Back */}
      <div
        className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 shadow-2xl border border-sky-100 transition-all duration-500 px-8"
        style={{
          backfaceVisibility: 'hidden',
          transform: flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
        }}
      >
        {state.status === 'loading' && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-sky-300 border-t-sky-600 animate-spin" />
            <span className="text-sm text-slate-400">{s.flashcardLoading ?? 'Loading…'}</span>
          </div>
        )}
        {state.status === 'found' && (
          <div className="text-center space-y-3 w-full">
            {state.sourceLang !== state.targetLang && (
              <div>
                <p className="text-xs font-semibold text-sky-400 uppercase tracking-wide mb-1">
                  {LANG_NAMES[state.targetLang] ?? state.targetLang}
                </p>
                <p className="text-2xl font-bold text-slate-800">{state.translation}</p>
              </div>
            )}
            {state.entries && state.entries[0] && (
              <div className="mt-2">
                <span className="inline-block text-xs font-semibold text-white bg-sky-400 rounded-full px-2 py-0.5 mb-1">
                  {state.entries[0].partOfSpeech}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed">{state.entries[0].definition}</p>
                {state.entries[0].example && (
                  <p className="mt-1.5 text-xs text-slate-400 italic">"{state.entries[0].example}"</p>
                )}
              </div>
            )}
          </div>
        )}
        {(state.status === 'not_found' || state.status === 'error') && (
          <p className="text-sm text-slate-400">{s.flashcardCantLoad ?? 'Could not load definition'}</p>
        )}
      </div>
    </div>
  )
}

export function FlashcardView({ boldedWords, sourceLang, onClose }: FlashcardViewProps) {
  const { t } = useLanguage()
  const [cards, setCards] = useState<CardState[]>(() =>
    Array.from(boldedWords.entries()).map(([idx, word]) => ({
      wordIndex: idx,
      word,
      flipped: false,
      learned: false,
    }))
  )
  const [currentIdx, setCurrentIdx] = useState(0)
  const [targetLang, setTargetLang] = useState('en')
  const [showFinish, setShowFinish] = useState(false)

  const activeCards = cards.filter((c) => !c.learned)
  const current = activeCards[currentIdx] ?? null
  const learnedCount = cards.length - activeCards.length

  const handleFlip = useCallback(() => {
    if (!current) return
    setCards((prev) =>
      prev.map((c) =>
        c.wordIndex === current.wordIndex ? { ...c, flipped: !c.flipped } : c
      )
    )
  }, [current])

  const handleMarkLearned = useCallback(() => {
    if (!current) return
    setCards((prev) =>
      prev.map((c) =>
        c.wordIndex === current.wordIndex ? { ...c, learned: true, flipped: false } : c
      )
    )
    const nextActive = cards.filter((c) => !c.learned && c.wordIndex !== current.wordIndex)
    if (nextActive.length === 0) {
      setShowFinish(true)
    } else {
      setCurrentIdx((i) => Math.min(i, nextActive.length - 1))
    }
  }, [current, cards])

  const handleNext = useCallback(() => {
    if (activeCards.length === 0) return
    setCurrentIdx((i) => (i + 1) % activeCards.length)
  }, [activeCards.length])

  const handlePrev = useCallback(() => {
    if (activeCards.length === 0) return
    setCurrentIdx((i) => (i - 1 + activeCards.length) % activeCards.length)
  }, [activeCards.length])

  const handleRestart = useCallback(() => {
    setCards((prev) => prev.map((c) => ({ ...c, learned: false, flipped: false })))
    setCurrentIdx(0)
    setShowFinish(false)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') handleNext()
      else if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === ' ') { e.preventDefault(); handleFlip() }
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleNext, handlePrev, handleFlip, onClose])

  const targetOptions = Object.entries(LANG_NAMES).sort((a, b) => a[1].localeCompare(b[1]))

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-xl hover:bg-slate-100"
            aria-label="Close flashcards"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div>
            <h2 className="text-base font-bold text-slate-800">{t.sidebar.flashcardTitle ?? 'Flashcard Revision'}</h2>
            <p className="text-xs text-slate-400">{cards.length} {t.sidebar.flashcardBolded ?? 'bolded words'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Target language selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">{t.sidebar.flashcardTranslateTo ?? 'Translate to'}</span>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-300"
            >
              {targetOptions.map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          {/* Progress badge */}
          <div className="text-xs font-semibold text-white bg-sky-500 rounded-full px-3 py-1">
            {learnedCount}/{cards.length} {t.sidebar.flashcardLearned ?? 'learned'}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="shrink-0 h-1 bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-500"
          style={{ width: `${cards.length > 0 ? (learnedCount / cards.length) * 100 : 0}%` }}
        />
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-auto">
        {showFinish || activeCards.length === 0 ? (
          <div className="text-center space-y-5">
            <div className="text-6xl">🎉</div>
            <h3 className="text-2xl font-bold text-slate-800">{t.sidebar.flashcardAllDone ?? 'All done!'}</h3>
            <p className="text-sm text-slate-500">{(t.sidebar.flashcardReviewed ?? 'You reviewed all {count} words.').replace('{count}', String(cards.length))}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 bg-sky-500 text-white rounded-xl font-semibold text-sm hover:bg-sky-600 transition-colors"
              >
                {t.sidebar.flashcardRestart ?? 'Restart'}
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors"
              >
                {t.sidebar.flashcardBack ?? 'Back to reading'}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg space-y-6">
            {/* Counter */}
            <p className="text-center text-xs text-slate-400 font-medium">
              {currentIdx + 1} {t.sidebar.flashcardOf ?? 'of'} {activeCards.length} {t.sidebar.flashcardRemaining ?? 'remaining'}
            </p>

            {/* Card */}
            <SingleCard
              key={`${current.wordIndex}-${targetLang}`}
              word={current.word}
              sourceLang={sourceLang}
              targetLang={targetLang}
              flipped={current.flipped}
              onFlip={handleFlip}
            />

            {/* Hint */}
            {!current.flipped && (
              <p className="text-center text-xs text-slate-300">
                {t.sidebar.flashcardFlipHint ?? 'Tap card or press'} <kbd className="bg-slate-100 text-slate-400 rounded px-1 py-0.5 font-mono">Space</kbd>
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                disabled={activeCards.length <= 1}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-500 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                {t.sidebar.flashcardPrev ?? 'Prev'}
              </button>

              {current.flipped && (
                <button
                  onClick={handleMarkLearned}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-emerald-600 bg-transparent border-2 border-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white hover:border-emerald-500 active:bg-emerald-600 active:border-emerald-600 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t.sidebar.flashcardGotIt ?? 'Got it'}
                </button>
              )}

              {!current.flipped && (
                <button
                  onClick={handleFlip}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-sky-600 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors"
                >
                  {t.sidebar.flashcardReveal ?? 'Reveal answer'}
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={activeCards.length <= 1}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-500 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-30"
              >
                {t.sidebar.flashcardNext ?? 'Next'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

            {/* Learned words list (collapsed) */}
            {learnedCount > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-400 text-center">
                  {learnedCount} {t.sidebar.wordsLabel ?? 'words'} {t.sidebar.flashcardLearned ?? 'learned'}: {
                    cards.filter((c) => c.learned).map((c) => c.word).join(', ')
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
