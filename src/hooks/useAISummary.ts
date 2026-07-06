import { useState, useCallback } from 'react'

export type SummaryLength = 'brief' | 'standard' | 'detailed'

const SENTENCE_COUNT: Record<SummaryLength, number> = {
  brief:    2,
  standard: 4,
  detailed: 7,
}

const STOP_WORDS = new Set([
  'a','an','the','is','it','in','on','at','to','for','of','and','or','but',
  'so','yet','both','either','neither','not','only','own','same','than','too',
  'very','can','will','just','should','now','with','as','be','was','are','were',
  'been','has','have','had','do','does','did','that','this','these','those',
  'from','by','up','about','into','through','during','before','after','above',
  'below','between','each','more','most','other','some','such','no','nor','its',
  'also','would','could','which','there','their','they','them','then','when',
  'where','what','who','how','all','any','if','out','my','your','his','her','we',
  'our','us','he','she','i','you','me','him','his','one','two','three','new',
  'back','get','got','go','goes','went','make','made','see','said','may',
])

function splitSentences(text: string): string[] {
  // Split on sentence-ending punctuation, keeping the punctuation
  const raw = text.match(/[^.!?…]+[.!?…]+(?:\s|$)/g) ?? []
  return raw.map(s => s.trim()).filter(s => s.split(/\s+/).length >= 6)
}

function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w))
}

function extractiveSummarize(text: string, numSentences: number): string {
  const sentences = splitSentences(text)
  if (sentences.length === 0) return text.trim()
  if (sentences.length <= numSentences) return sentences.join(' ')

  // Build word frequency map across all sentences
  const freq: Record<string, number> = {}
  sentences.forEach(s => {
    tokenize(s).forEach(w => { freq[w] = (freq[w] ?? 0) + 1 })
  })
  const maxFreq = Math.max(1, ...Object.values(freq))

  // Score each sentence
  const scored = sentences.map((s, i) => {
    const words = tokenize(s)
    if (words.length === 0) return { s, i, score: 0 }

    const termScore = words.reduce((sum, w) => sum + (freq[w] ?? 0) / maxFreq, 0) / words.length

    // Boost sentences near start (often introduce key ideas) and end (often conclude)
    const relPos = i / (sentences.length - 1)
    const posBoost = relPos < 0.2 ? 1.4 : relPos > 0.8 ? 1.15 : 1.0

    // Mild length penalty for very short sentences
    const lengthFactor = Math.min(1, words.length / 10)

    return { s, i, score: termScore * posBoost * lengthFactor }
  })

  // Pick top N by score, then restore original order
  const top = scored
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, numSentences)
    .sort((a, b) => a.i - b.i)

  return top.map(x => x.s).join(' ')
}

export function useAISummary() {
  const [summary, setSummary] = useState<string | null>(null)
  const [error, setError]   = useState<string | null>(null)
  const [length, setLength] = useState<SummaryLength>('standard')

  const summarize = useCallback((text: string) => {
    setError(null)
    setSummary(null)

    const wordCount = text.trim().split(/\s+/).length
    if (wordCount < 40) {
      setError('too_short')
      return
    }

    const result = extractiveSummarize(text, SENTENCE_COUNT[length])
    setSummary(result)
  }, [length])

  const clear = useCallback(() => {
    setSummary(null)
    setError(null)
  }, [])

  return { summary, loading: false, error, length, setLength, summarize, clear }
}
