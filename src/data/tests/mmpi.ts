import type { TestDefinition } from './types'

export const mmpiTest: TestDefinition = {
  id: 'mmpi',
  name: 'MMPI (Wellbeing Screener)',
  tagline: 'Psychological wellbeing self-report',
  description: 'Inspired by the MMPI framework, this educational wellbeing screener explores your current psychological state across domains including mood, social functioning, energy, and self-perception. A broad picture of your overall psychological wellness.',
  category: 'personality',
  scoringMode: 'likert',
  timeMinutes: 8,
  icon: '📊',
  color: 'from-slate-500 to-gray-600',
  disclaimer: '⚠️ This is a simplified educational wellbeing screener inspired by MMPI concepts. The actual MMPI-2 is a 567-item clinical instrument administered by licensed psychologists. This tool is not a diagnostic instrument.',
  selectCount: 15,
  resultBands: [
    { min: 0,  max: 12, label: 'High wellbeing',       description: 'Your responses suggest strong psychological wellbeing — positive mood, good energy, stable social functioning, and a healthy self-perception. Maintain the habits that support this: regular exercise, meaningful connection, purposeful activity, and adequate rest.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 13, max: 24, label: 'Moderate wellbeing',    description: 'Your wellbeing is generally positive with some areas of challenge. This is normal — life is rarely without difficulty. Consider where the stress is coming from and whether any changes to routine, support, or self-care could help. Speaking with a counsellor is always available to you.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 25, max: 33, label: 'Some difficulty',       description: 'Your responses suggest some meaningful psychological difficulty across several areas. This is worth taking seriously. Consider speaking with your GP or a counsellor. Identifying what specifically is feeling difficult is the first step toward feeling better.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 34, max: 45, label: 'Significant distress',  description: 'Your responses suggest significant psychological distress across multiple areas. Please consider seeking professional support. A GP or mental health professional can help you understand what you\'re experiencing and find appropriate support. You don\'t need to navigate this alone.', color: 'bg-red-50',    textColor: 'text-red-700' },
  ],
  questions: [
    // Mood
    { id: 1, text: 'I feel generally happy and positive about my life.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 2, text: 'I frequently feel sad, empty, or low without a clear reason.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 3, text: 'I feel a sense of excitement or interest in things in my daily life.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 4, text: 'I often feel anxious, tense, or on edge.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },

    // Energy & Motivation
    { id: 5, text: 'I generally have the energy to do the things I want to do.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 6, text: 'I struggle to find motivation even for things that used to matter to me.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 7, text: 'I feel rested and refreshed after sleeping.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },

    // Social functioning
    { id: 8, text: 'I feel connected to the people in my life.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 9, text: 'I often feel isolated, misunderstood, or disconnected from others.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 10, text: 'I find social interactions enjoyable rather than draining or difficult.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },

    // Self-perception
    { id: 11, text: 'I feel generally good about who I am.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 12, text: 'I often feel like a burden to others.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 13, text: 'I believe I have real strengths and qualities to offer.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },

    // Coping
    { id: 14, text: 'When things go wrong, I generally feel able to cope.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 15, text: 'I find it difficult to control my worries once they start.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 16, text: 'I feel in control of my life and my choices.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 17, text: 'Small problems often feel overwhelming to me.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },

    // Physical
    { id: 18, text: 'I am bothered by unexplained physical symptoms like headaches, fatigue, or tension.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 19, text: 'I generally take care of my physical health.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },

    // Sense of purpose
    { id: 20, text: 'My life feels meaningful and directed toward things that matter to me.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 21, text: 'I often wonder whether what I do really matters.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 22, text: 'I have goals or things I look forward to.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },

    { id: 23, text: 'I can usually enjoy the present moment rather than being stuck in the past or worrying about the future.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 24, text: 'I feel like I am growing or making progress in life.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 25, text: 'There are people in my life I can turn to when I need support.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 26, text: 'I feel safe and secure in my day-to-day environment.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 27, text: 'I am able to manage stress without feeling overwhelmed.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 28, text: 'I feel like my emotional needs are met most of the time.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 29, text: 'I have recently experienced an event that has significantly disrupted my wellbeing.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
    { id: 30, text: 'Overall, I am satisfied with my life.', options: ['Strongly disagree', 'Somewhat disagree', 'Somewhat agree', 'Strongly agree'] },
  ],
}
