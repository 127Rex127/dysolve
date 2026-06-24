import { SCREENING_QUESTIONS } from '../data/screeningQuestions'

export type RiskLevel = 'Low' | 'Medium' | 'High'

export interface ScreeningResult {
  score: number
  risk: RiskLevel
  headline: string
  explanation: string
  strengths: string[]
  suggestions: string[]
  categoryBreakdown: { category: string; categoryIndex: number; score: number; max: number }[]
}

const RISK_COLORS: Record<RiskLevel, string> = {
  Low: '#22c55e',
  Medium: '#f59e0b',
  High: '#ef4444',
}

export { RISK_COLORS }

export function calculateResult(answers: number[], translatedCategories?: string[]): ScreeningResult {
  // Each question scores 0–3, 20 questions = 60 max → normalise to 0–100
  const rawTotal = answers.reduce((sum, a) => sum + a, 0)
  const score = Math.round((rawTotal / 60) * 100)

  // Risk band
  let risk: RiskLevel
  if (score <= 30) risk = 'Low'
  else if (score <= 60) risk = 'Medium'
  else risk = 'High'

  // Per-category scores for breakdown chart
  const categoryBreakdown = SCREENING_QUESTIONS.map((q, i) => ({
    category: translatedCategories?.[i] ?? q.category,
    categoryIndex: i,
    score: answers[i] ?? 0,
    max: 3,
  }))

  // Which areas scored highest (score 2 or 3)?
  const highAreas = categoryBreakdown
    .filter((c) => c.score >= 2)
    .map((c) => c.category)

  // Build personalised explanation
  const headline = getHeadline(risk)
  const explanation = getExplanation(risk, score, highAreas)
  const strengths = getStrengths(risk, answers)
  const suggestions = getSuggestions(highAreas, risk)

  return { score, risk, headline, explanation, strengths, suggestions, categoryBreakdown }
}

function getHeadline(risk: RiskLevel): string {
  switch (risk) {
    case 'Low':
      return 'Great news — your responses suggest a low likelihood of dyslexia.'
    case 'Medium':
      return 'Your responses suggest some reading and writing challenges worth exploring.'
    case 'High':
      return 'Your responses suggest significant reading and writing difficulties.'
  }
}

function getExplanation(risk: RiskLevel, score: number, highAreas: string[]): string {
  const areaList = highAreas.length > 0
    ? `In particular, you scored highly in: ${highAreas.slice(0, 4).join(', ')}.`
    : ''

  switch (risk) {
    case 'Low':
      return `With a score of ${score}/100, your answers don't show strong signs of dyslexia-related difficulty. You may have a few areas where reading or writing feels harder, but overall your profile looks quite typical. ${areaList} Remember — this is not a medical diagnosis, just a friendly guide.`
    case 'Medium':
      return `With a score of ${score}/100, your answers suggest you experience a noticeable level of difficulty in some reading and writing areas. ${areaList} Many people with this profile benefit from dyslexia-friendly tools, extra reading time, and supportive strategies. This does not mean you have dyslexia — only a qualified professional can tell you that — but it may be worth exploring further.`
    case 'High':
      return `With a score of ${score}/100, your answers suggest you experience significant challenges in reading and writing that are consistent with dyslexic traits. ${areaList} These difficulties are very real, and they are not a reflection of your intelligence or effort — many brilliant people have dyslexia. We strongly encourage you to speak with a qualified educational psychologist or dyslexia specialist for a proper assessment. In the meantime, Dysolve is here to help make reading easier for you every day.`
  }
}

function getStrengths(risk: RiskLevel, answers: number[]): string[] {
  const lowScoreIndices = answers
    .map((score, i) => ({ score, i }))
    .filter((a) => a.score === 0)
    .map((a) => SCREENING_QUESTIONS[a.i]?.category)
    .filter(Boolean)
    .slice(0, 3)

  if (lowScoreIndices.length > 0) {
    return lowScoreIndices.map((cat) => `No significant difficulty with ${cat}`)
  }

  if (risk === 'Low') {
    return [
      'Reading speed feels comfortable',
      'Spelling and word memory are generally solid',
      'Written instructions are easy to follow',
    ]
  }

  return [
    'You completed this full assessment — that takes courage',
    'Recognising challenges is the first step to getting the right support',
    'Many very successful people share your profile',
  ]
}

function getSuggestions(highAreas: string[], risk: RiskLevel): string[] {
  const suggestions: string[] = []

  if (highAreas.includes('Reading Speed') || highAreas.includes('Reading Fatigue')) {
    suggestions.push('Use the Text-to-Speech feature to listen while you read — it reduces fatigue significantly.')
  }
  if (highAreas.includes('Losing Your Place') || highAreas.includes('Re-Reading')) {
    suggestions.push('Try the Focus Window tool — it blocks out surrounding text so you can read one line at a time.')
  }
  if (highAreas.includes('Spelling') || highAreas.includes('Word Memory')) {
    suggestions.push('Switch to OpenDyslexic or Comic Neue font — they make letter shapes more distinct and easier to remember.')
  }
  if (highAreas.includes('Letter Reversals') || highAreas.includes('Word Confusion')) {
    suggestions.push('Increase letter spacing and word spacing in the settings — more space between letters reduces confusion.')
  }
  if (highAreas.includes('Reading Fatigue') || highAreas.includes('Frustration & Avoidance')) {
    suggestions.push('Change the background colour to a soft cream or yellow — it reduces eye strain on white backgrounds.')
  }
  if (highAreas.includes('Sounding Out Words') || highAreas.includes('Finding Words')) {
    suggestions.push('Use Text-to-Speech to hear words spoken aloud — hearing the pronunciation helps connect sounds to letters.')
  }
  if (highAreas.includes('Decoding vs. Understanding')) {
    suggestions.push('Try playing calming ambient sounds while reading — it helps free up mental space for understanding.')
  }
  if (risk === 'High') {
    suggestions.push('Consider speaking to a qualified dyslexia assessor — a formal assessment opens doors to official support and adjustments.')
  }

  // Always add a general one
  suggestions.push('All Dysolve tools are free to use any time — explore what combination works best for you.')

  return suggestions.slice(0, 5)
}
