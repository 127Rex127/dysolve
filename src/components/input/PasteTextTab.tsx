import { useState } from 'react'
import { Button } from '../ui/Button'
import { useLanguage } from '../../i18n'
import { SAMPLE_TEXTS } from '../../data/sampleTexts'
import { type RecentText, timeAgo } from '../../hooks/useRecentTexts'

interface PasteTextTabProps {
  onTextLoaded: (text: string) => void
  recent?: RecentText[]
  onRemoveRecent?: (id: string) => void
}

export function PasteTextTab({ onTextLoaded, recent = [], onRemoveRecent }: PasteTextTabProps) {
  const { t, langCode } = useLanguage()
  const [inputText, setInputText] = useState('')

  const sampleText = SAMPLE_TEXTS[langCode] ?? SAMPLE_TEXTS['en']

  function handleLoad() {
    const trimmed = inputText.trim()
    if (trimmed) onTextLoaded(trimmed)
  }

  return (
    <div className="space-y-4">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={t.input.placeholder}
        className="w-full h-56 px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100 text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />
      <div className="flex gap-3">
        <Button
          variant="primary"
          onClick={handleLoad}
          disabled={!inputText.trim()}
          className="flex-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {t.input.loadBtn}
        </Button>
        <Button variant="secondary" onClick={() => onTextLoaded(sampleText)}>
          {t.input.sampleBtn}
        </Button>
      </div>

      {/* Recent texts */}
      {recent.length > 0 && (
        <div className="pt-1">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">{t.input.recentLabel ?? 'Recent'}</p>
          <div className="space-y-2">
            {recent.map((r) => (
              <div
                key={r.id}
                className="group flex items-start gap-2 p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/40 hover:border-sky-200 dark:hover:border-sky-700 hover:bg-sky-50/50 dark:hover:bg-sky-900/20 transition-all cursor-pointer"
                onClick={() => onTextLoaded(r.text)}
              >
                <svg className="text-slate-300 dark:text-slate-600 mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug line-clamp-2">{r.preview}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{timeAgo(r.timestamp)}</p>
                </div>
                {onRemoveRecent && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemoveRecent(r.id) }}
                    className="opacity-0 group-hover:opacity-100 text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 transition-all shrink-0 p-0.5"
                    aria-label="Remove from history"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
