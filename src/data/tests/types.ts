export type ScoringMode =
  | 'rightWrong'   // one correct answer — IQ, math, logic, english
  | 'likert'       // 0-3 scale — EQ, PHQ-9, GAD-7
  | 'mbti'         // dichotomy pole scoring → 16 types
  | 'bigFive'      // 5 trait scores → OCEAN bars
  | 'sbti'         // 4 behavioral dimension scores → type label
  | 'typeTest'     // 4-type classification (like sbti but with custom type names)

export type TestCategory =
  | 'cognitive'
  | 'personality'
  | 'emotional'
  | 'academic'
  | 'mental-health'
  | 'behavioral'

export interface TestQuestion {
  id: number
  text: string
  options: string[]          // always 4 options
  correctIndex?: number      // rightWrong: index of correct answer
  dichotomy?: 'EI' | 'SN' | 'TF' | 'JP'  // mbti: which dichotomy this measures
  // mbti: scores per option — positive = first letter (E/S/T/J), negative = second (I/N/F/P)
  dichotomyScores?: [number, number, number, number]
  trait?: 'O' | 'C' | 'E' | 'A' | 'N'   // bigFive: which OCEAN trait
  reversed?: boolean                        // bigFive: reverse scoring
  sbtiDimension?: 'driver' | 'expressive' | 'amiable' | 'analytical'  // sbti
}

export interface TestResultBand {
  min: number      // inclusive
  max: number      // inclusive
  label: string
  description: string
  color: string    // Tailwind bg colour class e.g. 'bg-green-100'
  textColor: string
}

export interface TypeInfo {
  name: string
  emoji: string
  description: string
  strengths: string[]
  growthAreas: string[]
  worksWith?: string
}

export interface TestDefinition {
  id: string
  name: string
  tagline: string
  description: string
  category: TestCategory
  scoringMode: ScoringMode
  questions: TestQuestion[]
  /** If set, randomly pick this many questions from the full pool each run */
  selectCount?: number
  /** Custom type dimensions for typeTest mode: [dim0, dim1, dim2, dim3] */
  typeDimensions?: [string, string, string, string]
  /** Custom type info for typeTest/sbti mode — keyed by dimension name */
  typeInfo?: Record<string, TypeInfo>
  timeMinutes: number
  icon: string             // emoji
  color: string            // Tailwind gradient classes for card
  disclaimer?: string
  resultBands?: TestResultBand[]   // for rightWrong / likert
}

// Computed result shapes passed to TestResultView
export interface RightWrongResult {
  mode: 'rightWrong'
  score: number        // 0-100 percentage
  correct: number
  total: number
}

export interface LikertResult {
  mode: 'likert'
  score: number        // raw sum
  maxScore: number
}

export interface MbtiResult {
  mode: 'mbti'
  type: string         // e.g. "INFP"
  scores: { EI: number; SN: number; TF: number; JP: number }
  // positive = first letter, negative = second letter
}

export interface BigFiveResult {
  mode: 'bigFive'
  scores: { O: number; C: number; E: number; A: number; N: number }
  maxPerTrait: number
}

export interface SbtiResult {
  mode: 'sbti'
  scores: { driver: number; expressive: number; amiable: number; analytical: number }
  primaryType: string
  secondaryType: string
}

export interface TypeTestResult {
  mode: 'typeTest'
  scores: Record<string, number>
  primaryType: string
  secondaryType: string
}

export type TestResult = RightWrongResult | LikertResult | MbtiResult | BigFiveResult | SbtiResult | TypeTestResult

export interface CompletedTest {
  testId: string
  result: TestResult
  answers: number[]    // selected option index per question
  completedAt: number  // timestamp
}
