import { useCallback } from 'react'

interface WordHighlighterProps {
  text: string
  currentWordIndex: number | null
  boldedWordIndices?: Map<number, string>
  onWordClick?: (word: string, wordIndex: number, charStart: number, x: number, y: number) => void
  bionicMode?: boolean
}

function isCJK(ch: string): boolean {
  const cp = ch.codePointAt(0) ?? 0
  return (
    (cp >= 0x4e00 && cp <= 0x9fff)   ||
    (cp >= 0x3400 && cp <= 0x4dbf)   ||
    (cp >= 0x20000 && cp <= 0x2a6df) ||
    (cp >= 0x3040 && cp <= 0x309f)   ||
    (cp >= 0x30a0 && cp <= 0x30ff)   ||
    (cp >= 0xac00 && cp <= 0xd7af)   ||
    (cp >= 0xf900 && cp <= 0xfaff)
  )
}

export function WordHighlighter({ text, currentWordIndex, boldedWordIndices, onWordClick, bionicMode }: WordHighlighterProps) {
  const parts: React.ReactNode[] = []
  let wordIdx = 0
  let i = 0

  const handleClick = useCallback(
    (word: string, wIdx: number, charStart: number, e: React.MouseEvent) => {
      if (!onWordClick) return
      const selection = window.getSelection()
      const selectedText = selection?.toString().trim()
      if (selectedText && selectedText.length > 1) return
      e.stopPropagation()
      onWordClick(word, wIdx, charStart, e.clientX, e.clientY)
    },
    [onWordClick]
  )

  while (i < text.length) {
    const ch = text[i]

    // ── Whitespace ────────────────────────────────────────────────────────────
    if (/\s/.test(ch)) {
      let whitespace = ''
      while (i < text.length && /\s/.test(text[i])) { whitespace += text[i]; i++ }
      parts.push(whitespace)
      continue
    }

    // ── CJK character — each is its own clickable token ───────────────────────
    if (isCJK(ch)) {
      const idx = wordIdx
      const wordStart = i
      const capturedChar = ch
      const isTtsActive = currentWordIndex === idx
      const isBolded = boldedWordIndices?.has(idx) ?? false
      parts.push(
        <span
          key={wordStart}
          data-word-index={idx}
          onClick={(e) => handleClick(capturedChar, idx, wordStart, e)}
          className={[
            'transition-colors duration-150 rounded',
            isTtsActive ? 'bg-sky-200 text-sky-900' : '',
            isBolded ? 'font-bold underline decoration-amber-400 decoration-2' : '',
            onWordClick ? 'cursor-pointer hover:bg-amber-100 hover:text-amber-900' : '',
          ].join(' ')}
        >
          {capturedChar}
        </span>
      )
      wordIdx++
      i++
      continue
    }

    // ── Regular word ──────────────────────────────────────────────────────────
    let word = ''
    const wordStart = i
    while (i < text.length && !/\s/.test(text[i]) && !isCJK(text[i])) {
      word += text[i]; i++
    }

    if (word) {
      const idx = wordIdx
      const capturedWord = word
      const isTtsActive = currentWordIndex === idx
      const isBolded = boldedWordIndices?.has(idx) ?? false
      const boldLen = bionicMode ? Math.max(1, Math.ceil(capturedWord.length * 0.45)) : 0
      parts.push(
        <span
          key={wordStart}
          data-word-index={idx}
          onClick={(e) => handleClick(capturedWord, idx, wordStart, e)}
          className={[
            'transition-colors duration-150 rounded px-0.5',
            isTtsActive ? 'bg-sky-200 text-sky-900' : '',
            isBolded ? 'font-bold underline decoration-amber-400 decoration-2' : '',
            onWordClick ? 'cursor-pointer hover:bg-amber-100 hover:text-amber-900' : '',
          ].join(' ')}
        >
          {bionicMode && !isBolded ? (
            <><b className="font-extrabold">{capturedWord.slice(0, boldLen)}</b>{capturedWord.slice(boldLen)}</>
          ) : capturedWord}
        </span>
      )
      wordIdx++
    }
  }

  return <>{parts}</>
}
