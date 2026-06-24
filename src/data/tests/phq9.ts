import type { TestDefinition } from './types'

// PHQ-9 is a standardised clinical tool — included here with prominent disclaimer.
// Likert: 0=Not at all, 1=Several days, 2=More than half the days, 3=Nearly every day
// Total 0-27; clinically validated cut-points used.

export const phq9Test: TestDefinition = {
  id: 'phq9',
  name: 'PHQ-9 Depression Screening',
  tagline: 'A clinically validated low-mood screening tool',
  description: 'The Patient Health Questionnaire-9 is used worldwide in clinical practice to screen for depression. It asks about the past 2 weeks across 9 symptoms.',
  category: 'mental-health',
  scoringMode: 'likert',
  timeMinutes: 3,
  icon: '🌧',
  color: 'from-slate-500 to-gray-600',
  disclaimer: '⚠️ This is a screening tool, not a diagnosis. A score above 0 does not mean you have depression. Please speak to a qualified mental health professional or your GP if you are concerned. If you are in crisis, contact a helpline immediately (e.g. Samaritans: 116 123 in the UK).',
  resultBands: [
    { min: 0,  max: 4,  label: 'Minimal or none',      description: 'Your responses suggest minimal depressive symptoms. Everyone has low days — this score suggests they\'re not significantly impacting your life right now.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 5,  max: 9,  label: 'Mild',                 description: 'Mild symptoms. It may be worth monitoring how you\'re feeling and speaking to someone you trust. A GP can offer guidance.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 10, max: 14, label: 'Moderate',             description: 'Moderate symptoms. Speaking to your GP or a mental health professional is recommended — there are effective treatments available.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 15, max: 19, label: 'Moderately severe',    description: 'Moderately severe symptoms. Please speak to a healthcare professional — you don\'t need to manage this alone.', color: 'bg-red-50',    textColor: 'text-red-700' },
    { min: 20, max: 27, label: 'Severe',               description: 'Severe symptoms. Please seek support from a mental health professional or your GP as soon as possible.', color: 'bg-red-100',   textColor: 'text-red-800' },
  ],
  questions: [
    { id: 1, text: 'Over the last 2 weeks, how often have you been bothered by...\n\nLittle interest or pleasure in doing things?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 2, text: 'Feeling down, depressed, or hopeless?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 4, text: 'Feeling tired or having little energy?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 5, text: 'Poor appetite or overeating?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 6, text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 7, text: 'Trouble concentrating on things, such as reading the newspaper or watching television?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 8, text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    { id: 9, text: 'Thoughts that you would be better off dead, or of hurting yourself in some way?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
  ],
}
