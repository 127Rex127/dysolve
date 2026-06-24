import type { TestDefinition } from './types'

// GAD-7 is a standardised clinical anxiety screening tool.
// Likert: 0=Not at all, 1=Several days, 2=More than half the days, 3=Nearly every day
// Total 0-21; validated cut-points: 5 mild, 10 moderate, 15 severe.

export const gad7Test: TestDefinition = {
  id: 'gad7',
  name: 'GAD-7 Anxiety Screening',
  tagline: 'A clinically validated anxiety screening tool',
  description: 'The Generalized Anxiety Disorder 7-item scale is widely used in clinical practice to screen for anxiety. Takes under 3 minutes to complete.',
  category: 'mental-health',
  scoringMode: 'likert',
  timeMinutes: 3,
  icon: '🌪',
  color: 'from-sky-600 to-blue-700',
  disclaimer: '⚠️ This is a screening tool, not a diagnosis. Anxiety exists on a spectrum and many people experience it differently. If your score concerns you, please speak to your GP or a mental health professional. Crisis support: Samaritans 116 123 (UK) · Crisis Text Line: text HOME to 741741 (US).',
  resultBands: [
    { min: 0,  max: 4,  label: 'Minimal anxiety',    description: 'Your responses suggest minimal anxiety symptoms. Occasional worry is normal — this score suggests it\'s not significantly impacting your daily life.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 5,  max: 9,  label: 'Mild anxiety',       description: 'Mild anxiety symptoms. It may be helpful to monitor this and practise stress management techniques. Speak to your GP if concerned.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 10, max: 14, label: 'Moderate anxiety',   description: 'Moderate anxiety. Speaking to a GP or mental health professional is recommended — effective support is available.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 15, max: 21, label: 'Severe anxiety',     description: 'Severe anxiety symptoms. Please reach out to a healthcare professional — you deserve proper support.', color: 'bg-red-50',    textColor: 'text-red-700' },
  ],
  questions: [
    { id: 1, text: 'Over the last 2 weeks, how often have you been bothered by...\n\nFeeling nervous, anxious, or on edge?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 2, text: 'Not being able to stop or control worrying?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 3, text: 'Worrying too much about different things?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 4, text: 'Trouble relaxing?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 5, text: 'Being so restless that it is hard to sit still?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 6, text: 'Becoming easily annoyed or irritable?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 7, text: 'Feeling afraid, as if something awful might happen?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  ],
}
