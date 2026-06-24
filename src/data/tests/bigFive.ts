import type { TestDefinition } from './types'

// Scoring: each question targets one trait (O/C/E/A/N).
// Options are a 4-point agree/disagree scale (0=Strongly Disagree, 3=Strongly Agree).
// If reversed=true, score is (3 - selectedIndex).
// Max score per trait = 4 questions × 3 = 12.

export const bigFiveTest: TestDefinition = {
  id: 'bigFive',
  name: 'Big Five Personality (OCEAN)',
  tagline: 'Measure the five core personality dimensions',
  description: '20 questions across Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Results show your personal profile across all five traits.',
  category: 'personality',
  scoringMode: 'bigFive',
  timeMinutes: 8,
  icon: '🌊',
  color: 'from-teal-500 to-emerald-600',
  disclaimer: 'This is a simplified Big Five indicator for self-awareness and reflection. Validated instruments such as the NEO-PI-R require professional administration.',
  questions: [
    // Openness (O) — 4 questions
    { id: 1,  text: 'I enjoy exploring abstract ideas and theories.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'O' },
    { id: 2,  text: 'I find beauty in art, music, and creative expression.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'O' },
    { id: 3,  text: 'I prefer familiar routines to trying new things.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'O', reversed: true },
    { id: 4,  text: 'I have a vivid imagination and enjoy daydreaming.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'O' },

    // Conscientiousness (C) — 4 questions
    { id: 5,  text: 'I always prepare thoroughly before starting a task.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'C' },
    { id: 6,  text: 'I keep things organised and tidy.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'C' },
    { id: 7,  text: 'I often procrastinate on important tasks.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'C', reversed: true },
    { id: 8,  text: 'I follow through on commitments, even when difficult.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'C' },

    // Extraversion (E) — 4 questions
    { id: 9,  text: 'I feel comfortable starting conversations with strangers.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'E' },
    { id: 10, text: 'I enjoy being the centre of attention in social situations.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'E' },
    { id: 11, text: 'I need a lot of alone time to feel like myself.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'E', reversed: true },
    { id: 12, text: 'I come alive in social settings and group activities.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'E' },

    // Agreeableness (A) — 4 questions
    { id: 13, text: 'I genuinely care about other people\'s wellbeing.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'A' },
    { id: 14, text: 'I avoid conflict even when I believe I\'m right.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'A' },
    { id: 15, text: 'I can be critical or suspicious of others\' motives.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'A', reversed: true },
    { id: 16, text: 'I find it easy to forgive people who have hurt me.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'A' },

    // Neuroticism (N) — 4 questions
    { id: 17, text: 'I worry about things a lot, even small ones.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'N' },
    { id: 18, text: 'My mood can shift quickly in response to events.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'N' },
    { id: 19, text: 'I feel calm and stable even in stressful situations.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'N', reversed: true },
    { id: 20, text: 'I often feel anxious or on edge without a clear reason.', options: ['Strongly Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Strongly Agree'], trait: 'N' },
  ],
}

export const BIG_FIVE_TRAIT_INFO: Record<string, { name: string; low: string; high: string; color: string }> = {
  O: { name: 'Openness',          low: 'Practical & conventional',     high: 'Imaginative & curious',      color: 'bg-purple-400' },
  C: { name: 'Conscientiousness', low: 'Flexible & spontaneous',       high: 'Organised & disciplined',     color: 'bg-blue-400' },
  E: { name: 'Extraversion',      low: 'Introverted & reflective',     high: 'Outgoing & energetic',        color: 'bg-amber-400' },
  A: { name: 'Agreeableness',     low: 'Analytical & competitive',     high: 'Cooperative & compassionate', color: 'bg-green-400' },
  N: { name: 'Neuroticism',       low: 'Stable & resilient',           high: 'Sensitive & emotionally reactive', color: 'bg-red-400' },
}
