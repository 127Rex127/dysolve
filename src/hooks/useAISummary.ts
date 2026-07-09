import { useState, useCallback } from 'react'

export type SummaryLength = 'brief' | 'standard' | 'detailed'

const SENTENCE_COUNT: Record<SummaryLength, number> = {
  brief:    2,
  standard: 4,
  detailed: 7,
}

const LENGTH_WORDS: Record<SummaryLength, number> = {
  brief:    80,
  standard: 180,
  detailed: 350,
}

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'

// Try models in order until one succeeds
const FREE_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'mistralai/mistral-7b-instruct:free',
  'google/gemma-3-4b-it:free',
]

const K = atob('c2stb3ItdjEtOTNiNWNiMzliY2U3MzRiYjY0M2NkNjcyNjlhODg1ZjJmN2I0ODc5YzJmYTVhY2QwNjA4YjI5YzEwM2Q1ODA5Mw==')

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
  const freq: Record<string, number> = {}
  sentences.forEach(s => { tokenize(s).forEach(w => { freq[w] = (freq[w] ?? 0) + 1 }) })
  const maxFreq = Math.max(1, ...Object.values(freq))
  const scored = sentences.map((s, i) => {
    const words = tokenize(s)
    if (words.length === 0) return { s, i, score: 0 }
    const termScore = words.reduce((sum, w) => sum + (freq[w] ?? 0) / maxFreq, 0) / words.length
    const relPos = i / (sentences.length - 1)
    const posBoost = relPos < 0.2 ? 1.4 : relPos > 0.8 ? 1.15 : 1.0
    return { s, i, score: termScore * posBoost * Math.min(1, words.length / 10) }
  })
  return scored.slice().sort((a, b) => b.score - a.score).slice(0, numSentences).sort((a, b) => a.i - b.i).map(x => x.s).join(' ')
}

function extractKeywords(text: string, n = 5): string[] {
  const freq: Record<string, number> = {}
  tokenize(text).forEach(w => { freq[w] = (freq[w] ?? 0) + 1 })
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, n).map(([w]) => w)
}

async function callOpenRouter(text: string, length: SummaryLength, model: string): Promise<string> {
  const wordTarget = LENGTH_WORDS[length]
  const prompt = `You are a skilled summariser. Write a clear, flowing ${wordTarget}-word summary of the text below. Important rules:
- Write in YOUR OWN WORDS — do not copy sentences from the text
- Use natural prose, no bullet points or lists
- Capture the core ideas and conclusions
- Return ONLY the summary text, nothing else

Text to summarise:
${text.slice(0, 7000)}`

  const res = await fetch(OPENROUTER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${K}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Dysolve',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: wordTarget * 4,
      temperature: 0.5,
    }),
    signal: AbortSignal.timeout(25000),
  })

  if (!res.ok) {
    const status = res.status
    if (status === 401 || status === 403) throw new Error('auth')
    if (status === 429) throw new Error('rate_limit')
    throw new Error(`http_${status}`)
  }

  const data = await res.json()
  const result: string | undefined = data.choices?.[0]?.message?.content
  if (!result || result.trim().length < 20) throw new Error('empty')
  return result.trim()
}

export function useAISummary() {
  const [summary,  setSummary]  = useState<string | null>(null)
  const [keywords, setKeywords] = useState<string[]>([])
  const [error,    setError]    = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)
  const [length,   setLength]   = useState<SummaryLength>('standard')
  const [isAI,     setIsAI]     = useState(false)

  const summarize = useCallback(async (text: string): Promise<boolean> => {
    setError(null)
    setSummary(null)
    setKeywords([])
    setIsAI(false)

    const wordCount = text.trim().split(/\s+/).length
    if (wordCount < 40) {
      setError('too_short')
      return false
    }

    setLoading(true)
    let lastError = ''

    try {
      // Try each model in sequence
      for (const model of FREE_MODELS) {
        try {
          const result = await callOpenRouter(text, length, model)
          setSummary(result)
          setKeywords(extractKeywords(text))
          setIsAI(true)
          return true
        } catch (e: unknown) {
          lastError = e instanceof Error ? e.message : 'unknown'
          // Auth failure — no point trying other models
          if (lastError === 'auth') break
          // Otherwise try next model
          continue
        }
      }

      // All models failed — show error, no silent extractive fallback
      setError(lastError === 'auth'
        ? 'API key invalid. Contact support.'
        : lastError === 'rate_limit'
        ? 'AI rate limit reached. Please wait a moment and try again.'
        : `AI unavailable (${lastError}). Please try again shortly.`)
      return false

    } finally {
      setLoading(false)
    }
  }, [length])

  const clear = useCallback(() => {
    setSummary(null)
    setKeywords([])
    setError(null)
    setIsAI(false)
  }, [])

  return { summary, keywords, loading, error, length, setLength, summarize, clear, isAI }
}
