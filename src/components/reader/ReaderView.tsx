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

export function ReaderView({ text, settings, ttsState, boldedWords, onToggleBold, boldModeEnabled }: ReaderViewProps) {
  const bionicMode = settings.bionicMode
  const { t } = useLanguage()
  const [popup, setPopup] = useState<PopupTarget | null>(null)
  const articleRef = useRef<HTMLElement>(null)

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
    <div className="flex-1 min-h-screen transition-colors duration-300" style={{ backgroundColor: settings.backgroundColor }}>
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

      {popup && (
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
