import type { TestDefinition } from './types'

export const pcl5Test: TestDefinition = {
  id: 'pcl5',
  name: 'PCL-5 Trauma Screening',
  tagline: 'PTSD symptom checklist',
  description: 'The PCL-5 (PTSD Checklist for DSM-5) is a widely used 20-item self-report screening tool for PTSD symptoms. This educational version covers all four symptom clusters: intrusion, avoidance, negative thoughts/feelings, and hyperarousal.',
  category: 'mental-health',
  scoringMode: 'likert',
  timeMinutes: 8,
  icon: '🕊️',
  color: 'from-slate-500 to-blue-600',
  disclaimer: '⚠️ This screening tool is for educational purposes only. A high score does not diagnose PTSD. Only a qualified mental health professional can diagnose PTSD. If you are experiencing distress related to a traumatic event, please seek professional support. Crisis resources: UK: Samaritans 116 123 · US: 988.',
  questions: [
    // Cluster B: Intrusion symptoms
    { id: 1, text: 'In the past month, how much have you been bothered by...\n\nRepeated, disturbing, and unwanted memories of a stressful experience?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 2, text: 'Repeated, disturbing dreams of a stressful experience?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 3, text: 'Suddenly feeling or acting as if a stressful experience were actually happening again (as if you were actually back there reliving it)?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 4, text: 'Feeling very upset when something reminded you of a stressful experience?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 5, text: 'Having strong physical reactions when something reminded you of a stressful experience (e.g. heart racing, trouble breathing, sweating)?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },

    // Cluster C: Avoidance
    { id: 6, text: 'Avoiding memories, thoughts, or feelings related to a stressful experience?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 7, text: 'Avoiding external reminders of a stressful experience (people, places, conversations, activities, objects, or situations)?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },

    // Cluster D: Negative alterations in cognition and mood
    { id: 8, text: 'Trouble remembering important parts of a stressful experience?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 9, text: 'Having strong negative beliefs about yourself, other people, or the world (e.g. "I am bad", "no one can be trusted", "the world is completely dangerous")?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 10, text: 'Blaming yourself or someone else for a stressful experience or what happened after it?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 11, text: 'Having strong negative feelings such as fear, horror, anger, guilt, or shame?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 12, text: 'Loss of interest in activities that you used to enjoy?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 13, text: 'Feeling distant or cut off from other people?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 14, text: 'Trouble experiencing positive feelings (for example, being unable to feel happiness or love toward people close to you)?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },

    // Cluster E: Alterations in arousal and reactivity
    { id: 15, text: 'Irritable behaviour, angry outbursts, or acting aggressively?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 16, text: 'Taking too many risks or doing things that could cause you harm?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 17, text: 'Being "superalert" or watchful or on guard?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 18, text: 'Feeling jumpy or easily startled?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 19, text: 'Having difficulty concentrating?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
    { id: 20, text: 'Trouble falling or staying asleep?', options: ['Not at all', 'A little bit', 'Moderately', 'Quite a bit or extremely'] },
  ],
  resultBands: [
    { min: 0,  max: 14, label: 'Minimal symptoms',    description: 'Your responses suggest minimal PTSD-related symptoms at this time. This is a positive result. If you have experienced trauma, remember that healing is a non-linear process and support is always available if you need it.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 15, max: 29, label: 'Some symptoms',       description: 'Your responses suggest some PTSD-related symptoms. These may be temporary reactions to stress or difficult life events. Speaking with a counsellor or therapist could provide useful support and coping strategies.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 30, max: 44, label: 'Moderate symptoms',   description: 'Your responses suggest moderate PTSD-related symptoms. Please consider reaching out to a mental health professional. Effective treatments for trauma — including EMDR and trauma-focused CBT — have strong evidence bases and can produce significant relief.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 45, max: 60, label: 'Significant symptoms', description: 'Your responses suggest significant PTSD-related symptoms. Please seek professional support. Trauma-focused therapy is highly effective. You have survived something difficult — you deserve specialised, compassionate help.', color: 'bg-red-50',    textColor: 'text-red-700' },
  ],
}
