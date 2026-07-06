import { useState, useCallback, useRef } from 'react'
import { ReaderSettings, TTSState, FONT_FAMILY_MAP } from '../../types'
import { WordHighlighter } from './WordHighlighter'
import { WordDefinitionPopup } from './WordDefinitionPopup'
import { useLanguage } from '../../i18n'

interface ReaderViewProps {
  text: string
  settings: ReaderSettings
  ttsState: TTSState
  boldedWords: Map<number, string>
  onToggleBold: (index: number, word: string) => void
  boldModeEnabled?: boolean
  onTextChange?: (text: string) => void
}

interface PopupTarget {
  word: string
  wordIndex: number | null  // null for multi-word drag-selections
  sentence: string
  paragraph: string
  sourceLang: string
  x: number
  y: number
}

function extractSentence(text: string, charPos: number): string {
  const isEnd = (c: string) => /[.!?。！？]/.test(c)
  const isBreak = (c: string) => c === '\n'
  let start = charPos
  while (start > 0 && !isEnd(text[start - 1]) && !isBreak(text[start - 1])) start--
  let end = charPos
  while (end < text.length) {
    if (isEnd(text[end])) { end++; break }
    if (isBreak(text[end])) break
    end++
  }
  return text.slice(start, end).trim()
}

function extractParagraph(text: string, charPos: number): string {
  let start = charPos
  while (start > 0) {
    if (text[start - 1] === '\n' && start >= 2 && text[start - 2] === '\n') break
    start--
  }
  while (start < text.length && text[start] === '\n') start++
  let end = charPos
  while (end < text.length) {
    if (text[end] === '\n' && end + 1 < text.length && text[end + 1] === '\n') break
    end++
  }
  while (end > start && text[end - 1] === '\n') end--
  const result = text.slice(start, end).trim()
  return result || extractSentence(text, charPos)
}

export function ReaderView({ text, settings, ttsState, boldedWords, onToggleBold, boldModeEnabled, onTextChange }: ReaderViewProps) {
  const bionicMode = settings.bionicMode
  const { t } = useLanguage()
  const [popup, setPopup] = useState<PopupTarget | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editText, setEditText] = useState(text)
  const articleRef = useRef<HTMLElement>(null)

  function handleEnterEdit() {
    setEditText(text)
    setEditMode(true)
    setPopup(null)
  }

  function handleSaveEdit() {
    onTextChange?.(editText)
    setEditMode(false)
  }

  function handleCancelEdit() {
    setEditMode(false)
  }

  const readerStyle: React.CSSProperties = {
    fontSize: `${settings.fontSize}px`,
    lineHeight: settings.lineHeight,
    maxWidth: `${settings.maxWidth}px`,
    fontFamily: FONT_FAMILY_MAP[settings.fontFamily],
    letterSpacing: `${settings.letterSpacing}em`,
    wordSpacing: `${settings.wordSpacing}em`,
  }

  const handleWordClick = useCallback(
    (word: string, wordIndex: number, charStart: number, x: number, y: number) => {
      const clean = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
      if (!clean) return
      if (boldModeEnabled) {
        onToggleBold(wordIndex, clean)
        return
      }
      setPopup({
        word: clean,
        wordIndex,
        sentence: extractSentence(text, charStart),
        paragraph: extractParagraph(text, charStart),
        sourceLang: t.ttsLangCode,
        x,
        y,
      })
    },
    [text, t.ttsLangCode, boldModeEnabled, onToggleBold]
  )

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      const selection = window.getSelection()
      const selected = selection?.toString().trim()
      if (!selected || selected.length < 1) return
      if (!articleRef.current?.contains(selection?.anchorNode ?? null)) return

      // Bold mode: bold every word span that intersects the selection
      if (boldModeEnabled) {
        const range = selection?.getRangeAt(0)
        if (range) {
          const spans = articleRef.current?.querySelectorAll('[data-word-index]')
          spans?.forEach((span) => {
            const spanRange = document.createRange()
            spanRange.selectNode(span)
            const beforeEnd = range.compareBoundaryPoints(Range.END_TO_START, spanRange) < 0
            const afterStart = range.compareBoundaryPoints(Range.START_TO_END, spanRange) > 0
            if (beforeEnd && afterStart) {
              const idx = parseInt(span.getAttribute('data-word-index') ?? '-1')
              const word = span.textContent?.trim() ?? ''
              if (idx >= 0 && word) onToggleBold(idx, word)
            }
          })
        }
        selection?.removeAllRanges()
        return
      }

      const range = selection?.getRangeAt(0)
      const rect = range?.getBoundingClientRect()
      if (!rect) return
      const x = rect.left + rect.width / 2
      const y = rect.bottom
      const idx = text.indexOf(selected)
      const charPos = idx >= 0 ? idx + Math.floor(selected.length / 2) : 0
      setPopup({
        word: selected,
        wordIndex: null,
        sentence: extractSentence(text, charPos),
        paragraph: extractParagraph(text, charPos),
        sourceLang: t.ttsLangCode,
        x,
        y,
      })
    },
    [text, t.ttsLangCode, boldModeEnabled, onToggleBold]
  )

  const handleClose = useCallback(() => {
    setPopup(null)
    window.getSelection()?.removeAllRanges()
  }, [])

  const handleToggleBold = useCallback(() => {
    if (popup?.wordIndex == null) return
    onToggleBold(popup.wordIndex, popup.word)
  }, [popup, onToggleBold])

  if (!text) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen" style={{ backgroundColor: settings.backgroundColor }}>
        <div className="text-center space-y-3 opacity-40">
          <div className="text-6xl">📖</div>
          <p className="text-slate-500 text-sm">{t.sidebar.noTextYet ?? 'Your text will appear here'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-screen transition-colors duration-300 relative" style={{ backgroundColor: settings.backgroundColor }}>

      {/* Edit mode */}
      {editMode ? (
        <div className="pt-20 pb-24 px-6">
          {/* Edit toolbar */}
          <div className="sticky top-16 z-20 mb-4 flex items-center justify-between gap-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-2xl px-4 py-2.5 shadow-sm" style={{ maxWidth: `${settings.maxWidth}px`, margin: '0 auto 16px' }}>
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              <span className="text-sm font-semibold">Editing</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm"
              >
                Save changes
              </button>
            </div>
          </div>
          <textarea
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="mx-auto block w-full rounded-2xl border-2 border-amber-300 dark:border-amber-700 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-400 resize-none p-6 shadow-inner transition-colors"
            style={{ ...readerStyle, maxWidth: `${settings.maxWidth}px`, minHeight: '60vh' }}
          />
        </div>
      ) : (
        <>
          <div className="pt-24 pb-24 px-6">
            <article
              ref={articleRef}
              className="reader-article mx-auto text-slate-800 whitespace-pre-wrap select-text"
              style={readerStyle}
              onMouseUp={handleMouseUp}
            >
              <WordHighlighter
                text={text}
                currentWordIndex={ttsState.currentWordIndex}
                boldedWordIndices={boldedWords}
                onWordClick={handleWordClick}
                bionicMode={bionicMode}
              />
            </article>
          </div>

          {/* Floating edit button */}
          {onTextChange && (
            <button
              onClick={handleEnterEdit}
              title="Edit text"
              className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-lg text-slate-400 hover:text-amber-500 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-amber-100 dark:hover:shadow-amber-900/30 transition-all hover:scale-110 active:scale-95"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
          )}
        </>
      )}

      {!editMode && popup && (
        <WordDefinitionPopup
          word={popup.word}
          sentence={popup.sentence}
          paragraph={popup.paragraph}
          position={{ x: popup.x, y: popup.y }}
          sourceLang={popup.sourceLang}
          wordIndex={popup.wordIndex}
          isBolded={popup.wordIndex != null && boldedWords.has(popup.wordIndex)}
          onToggleBold={popup.wordIndex != null ? handleToggleBold : undefined}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
