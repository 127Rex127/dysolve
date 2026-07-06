import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../../i18n'
import { WordDefinitionPopup } from './WordDefinitionPopup'

const GRADIENTS = [
  'from-sky-400 via-blue-500 to-indigo-600',
  'from-emerald-400 via-teal-500 to-cyan-600',
  'from-violet-400 via-purple-500 to-pink-500',
  'from-amber-400 via-orange-500 to-rose-500',
  'from-rose-400 via-pink-500 to-purple-600',
  'from-teal-400 via-cyan-500 to-blue-500',
  'from-indigo-400 via-violet-500 to-purple-600',
  'from-green-400 via-emerald-500 to-teal-600',
]

function pickGradient(keyword: string): string {
  return GRADIENTS[(keyword.charCodeAt(0) ?? 0) % GRADIENTS.length]
}

async function fetchWikipediaImage(keyword: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(keyword)}`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.thumbnail?.source ?? null
  } catch {
    return null
  }
}

interface PopupState {
  word: string
  x: number
  y: number
}

interface SummaryModalProps {
  summary: string
  keywords: string[]
  onClose: () => void
}

export function SummaryModal({ summary, keywords, onClose }: SummaryModalProps) {
  const { t } = useLanguage()
  const s = t.sidebar
  const [mode, setMode] = useState<'illustrated' | 'plain'>('illustrated')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imgFailed, setImgFailed] = useState(false)
  const [popup, setPopup] = useState<PopupState | null>(null)

  const gradient = pickGradient(keywords[0] ?? 'a')
  const wordCount = summary.trim().split(/\s+/).length

  useEffect(() => {
    setImageUrl(null)
    setImgFailed(false)
    if (keywords.length === 0) return
    fetchWikipediaImage(keywords[0]).then(url => setImageUrl(url))
  }, [keywords])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && !popup) onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, popup])

  const handleWordClick = useCallback((e: React.MouseEvent, word: string) => {
    e.stopPropagation()
    const clean = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
    if (!clean) return
    setPopup({ word: clean, x: e.clientX, y: e.clientY })
  }, [])

  const showImage = mode === 'illustrated' && imageUrl && !imgFailed

  // Split summary into clickable word spans
  function ClickableText({ text }: { text: string }) {
    return (
      <>
        {text.split(/(\s+)/).map((chunk, i) =>
          /\s/.test(chunk) ? (
            <span key={i}>{chunk}</span>
          ) : (
            <span
              key={i}
              onClick={(e) => handleWordClick(e, chunk)}
              className="cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:text-violet-700 dark:hover:text-violet-300 rounded px-0.5 transition-colors duration-100"
            >
              {chunk}
            </span>
          )
        )}
      </>
    )
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { if (!popup) onClose() }} />

      {/* Card */}
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">

        {/* Illustrated hero */}
        {mode === 'illustrated' && (
          <div className={`relative h-56 bg-gradient-to-br ${gradient} flex-shrink-0`}>
            {showImage && (
              <img
                src={imageUrl!}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImgFailed(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Header row inside image */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span className="text-white font-semibold text-sm drop-shadow">{s.aiSummaryResultLabel ?? 'Summary'}</span>
                <span className="text-white/60 text-xs drop-shadow">{wordCount} words</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Keyword pills */}
            <div className="absolute bottom-3 left-5 flex flex-wrap gap-1.5">
              {keywords.slice(0, 5).map(kw => (
                <span key={kw} className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium capitalize">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Plain mode header */}
        {mode === 'plain' && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{s.aiSummaryResultLabel ?? 'Summary'}</h2>
                <p className="text-xs text-slate-400">{wordCount} words · tap any word for definition</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}

        {/* Mode toggle + hint */}
        <div className="flex items-center justify-between px-5 py-2 border-b border-slate-100 dark:border-slate-800 flex-shrink-0 bg-slate-50/80 dark:bg-slate-800/80">
          <p className="text-xs text-slate-400 italic">Tap any word for definition</p>
          <div className="flex gap-1">
            {([
              ['illustrated', '🖼', s.aiSummaryIllustrated ?? 'Illustrated'],
              ['plain',       '≡',  s.aiSummaryPlain       ?? 'Plain'],
            ] as [string, string, string][]).map(([m, icon, label]) => (
              <button
                key={m}
                onClick={() => setMode(m as 'illustrated' | 'plain')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  mode === m
                    ? 'bg-violet-500 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {mode === 'illustrated' ? (
            <div className="px-6 py-6">
              <p className="text-xs text-slate-400 italic mb-4 text-center">Tap any word for its definition</p>
              <div className="flex gap-3 items-start">
                <span className="text-violet-400 dark:text-violet-500 text-6xl leading-none font-serif flex-shrink-0 -mt-2 select-none">"</span>
                <p className="text-slate-800 dark:text-slate-100 text-xl leading-relaxed font-medium">
                  <ClickableText text={summary} />
                </p>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-violet-400 dark:text-violet-500 text-6xl leading-none font-serif select-none">"</span>
              </div>
            </div>
          ) : (
            <div className="px-6 py-8">
              <p className="text-slate-700 dark:text-slate-200 text-base leading-loose">
                <ClickableText text={summary} />
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 bg-gradient-to-r from-violet-50/60 to-purple-50/60 dark:from-violet-950/30 dark:to-purple-950/30">
          <p className="text-xs text-slate-400 text-center">
            {s.aiSummaryNote ?? 'Extracts the key sentences — works best on articles & passages'}
          </p>
        </div>
      </div>

      {/* Word definition popup — rendered outside modal card so it can overflow */}
      {popup && (
        <WordDefinitionPopup
          word={popup.word}
          sentence={summary}
          paragraph={summary}
          position={{ x: popup.x, y: popup.y }}
          sourceLang={t.ttsLangCode}
          wordIndex={null}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  )
}
