import type { TestDefinition } from './types'

export const adhdAsrsTest: TestDefinition = {
  id: 'adhdAsrs',
  name: 'ADHD Screening (ASRS)',
  tagline: 'Adult ADHD Self-Report Scale',
  description: 'Inspired by the WHO Adult ADHD Self-Report Scale (ASRS-v1.1), this 18-question screening covers inattention and hyperactivity/impulsivity symptoms in adults. The first 6 questions are the validated Part A screening subset.',
  category: 'behavioral',
  scoringMode: 'likert',
  timeMinutes: 6,
  icon: '⚡',
  color: 'from-yellow-500 to-orange-500',
  disclaimer: '⚠️ This is an educational screening tool inspired by the ASRS. It is not a diagnostic tool. ADHD is a clinical diagnosis requiring a comprehensive assessment by a qualified professional. Many conditions share similar symptoms.',
  resultBands: [
    { min: 0,  max: 15, label: 'Low likelihood',       description: 'Your responses suggest a low likelihood of ADHD-related difficulties. Everyone experiences attention and focus challenges occasionally — especially with stress, poor sleep, or high workload. If symptoms are affecting your daily functioning, speak with your GP.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 16, max: 28, label: 'Moderate indicators',  description: 'Your responses indicate moderate ADHD-related symptoms. Many adults are undiagnosed well into adulthood. If these symptoms are consistently affecting your work, relationships, or daily life, speaking with a GP or psychiatrist for a formal assessment would be worthwhile.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 29, max: 40, label: 'Significant indicators', description: 'Your responses suggest significant ADHD-related symptoms across multiple domains. A clinical assessment by a qualified professional is strongly recommended. ADHD in adults is highly treatable — both through therapy (CBT, coaching) and, where appropriate, medication. Many people find diagnosis life-changing.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 41, max: 54, label: 'High indicators',       description: 'Your responses strongly indicate significant ADHD-related difficulties. Please consult a GP or psychiatrist. A diagnosis can open doors to the right support, strategies, and — if appropriate — medication. Many adults describe receiving a diagnosis as a turning point that finally explained years of struggle.', color: 'bg-red-50',    textColor: 'text-red-700' },
  ],
  questions: [
    // Part A — validated 6-item screener
    { id: 1, text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 2, text: 'How often do you have difficulty getting things in order when you have to do a task that requires organisation?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 3, text: 'How often do you have problems remembering appointments or obligations?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 4, text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 5, text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 6, text: 'How often do you feel overly active and compelled to do things, like you are driven by a motor?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },

    // Part B — additional symptoms
    { id: 7, text: 'How often do you make careless mistakes when you have to work on a boring or difficult project?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 8, text: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 9, text: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 10, text: 'How often do you misplace or have difficulty finding things at home or at work?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 11, text: 'How often are you distracted by activity or noise around you?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 12, text: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 13, text: 'How often do you feel restless or fidgety?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 14, text: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 15, text: 'How often do you find yourself talking too much when you are in social situations?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 16, text: 'When you\'re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 17, text: 'How often do you have difficulty waiting your turn in situations when turn taking is required?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
    { id: 18, text: 'How often do you interrupt others when they are busy?', options: ['Never', 'Rarely', 'Sometimes', 'Often or very often'] },
  ],
}
