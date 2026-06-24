import type { TestDefinition } from './types'

export const mocaTest: TestDefinition = {
  id: 'moca',
  name: 'MoCA Cognitive Screening',
  tagline: 'Montreal Cognitive Assessment',
  description: 'Inspired by the Montreal Cognitive Assessment (MoCA), this screening covers memory, attention, language, and orientation. It is used clinically to detect mild cognitive changes. This educational version covers key cognitive domains across 12 questions.',
  category: 'cognitive',
  scoringMode: 'rightWrong',
  timeMinutes: 10,
  icon: '🧬',
  color: 'from-emerald-500 to-teal-600',
  disclaimer: '⚠️ This is an educational screening tool inspired by the MoCA. It is NOT a clinical diagnosis. If you have concerns about your memory or cognitive function, please consult a healthcare professional.',
  selectCount: 12,
  resultBands: [
    { min: 0,  max: 49, label: 'Possible impairment',  description: 'Your responses suggest potential difficulty in one or more cognitive areas. This screening is not a diagnosis. Please speak with a GP or neurologist if you have ongoing concerns about your memory or thinking.', color: 'bg-red-50',    textColor: 'text-red-700' },
    { min: 50, max: 74, label: 'Mild difficulty',      description: 'You showed solid performance in several areas with some difficulty in others. Lifestyle factors like sleep, stress, and exercise significantly impact cognitive performance. If concerns persist, speak with a healthcare professional.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 75, max: 89, label: 'Within typical range', description: 'Your cognitive performance is within the typical range. Staying mentally active, exercising regularly, and getting quality sleep are the best evidence-based ways to maintain cognitive health.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 90, max: 100, label: 'Strong cognitive performance', description: 'Excellent result across the cognitive domains covered. Continue with brain-healthy habits: regular exercise, social engagement, challenging mental tasks, and good sleep.', color: 'bg-sky-50',   textColor: 'text-sky-700' },
  ],
  questions: [
    // Memory / Delayed Recall
    { id: 1, text: 'Which of these is a strategy that helps memory most?\nYou need to remember a shopping list of: bread, eggs, milk, apples, cheese.', options: ['Repeat the list once quickly then move on', 'Group them into categories (dairy, produce, bakery) and rehearse', 'Just hope you remember', 'Write only the first letter of each'], correctIndex: 1 },
    { id: 2, text: 'After reading a passage about a dog named Rex who lives in London with his owner Sarah, what detail is most important for recall?', options: ['The font the story was written in', 'Rex\'s name, location, and owner\'s name', 'The exact number of words in the passage', 'The time of day it was read'], correctIndex: 1 },

    // Attention
    { id: 3, text: 'Count backwards from 100 by 7s. What is the second number in the sequence?', options: ['93', '86', '90', '84'], correctIndex: 1 },
    { id: 4, text: 'Subtract 7 from 93. Then subtract 7 again. What is the result?', options: ['79', '80', '82', '86'], correctIndex: 0 },
    { id: 5, text: 'A list: 4, 7, 2, 9, 1, 5, 8. How many numbers are greater than 5?', options: ['2', '3', '4', '5'], correctIndex: 1 },
    { id: 6, text: 'Which of these is the correct spelling?', options: ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'], correctIndex: 1 },

    // Language
    { id: 7, text: 'What is a synonym for "loquacious"?', options: ['Silent', 'Talkative', 'Angry', 'Clumsy'], correctIndex: 1 },
    { id: 8, text: 'Which sentence is grammatically correct?', options: ['She don\'t know the answer', 'Him and I went to the shop', 'Neither the boys nor the girl were present', 'Neither the boys nor the girl was present'], correctIndex: 3 },
    { id: 9, text: 'What is the meaning of the prefix "pre-" in the word "precaution"?', options: ['After', 'Against', 'Before', 'Beyond'], correctIndex: 2 },

    // Executive Function / Abstract Thinking
    { id: 10, text: 'How are a "ruler" and a "thermometer" alike?', options: ['Both are made of plastic', 'Both measure something', 'Both are used in science labs', 'Both were invented in the same century'], correctIndex: 1 },
    { id: 11, text: 'Which of these does NOT belong in the same category?\nApple, banana, carrot, orange, grape', options: ['Apple', 'Banana', 'Carrot', 'Grape'], correctIndex: 2 },
    { id: 12, text: 'If Sarah is taller than James and James is taller than Emma, which statement is definitely true?', options: ['Emma is the tallest', 'James is the shortest', 'Sarah is taller than Emma', 'Emma is taller than Sarah'], correctIndex: 2 },

    // Orientation
    { id: 13, text: 'Which month has 28 days?', options: ['Only February', 'Only April', 'All months', 'Only months without an "r"'], correctIndex: 2 },
    { id: 14, text: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], correctIndex: 2 },
    { id: 15, text: 'How many weeks are in a year?', options: ['48', '50', '52', '54'], correctIndex: 2 },

    // Visuospatial / Reasoning
    { id: 16, text: 'A clock shows the time as 20 minutes past 3. In how many minutes will the minute hand be pointing straight up?', options: ['20', '30', '40', '50'], correctIndex: 2 },
    { id: 17, text: 'If you fold a square piece of paper in half diagonally, what shape do you get?', options: ['Square', 'Rectangle', 'Triangle', 'Pentagon'], correctIndex: 2 },
    { id: 18, text: 'How many faces does a cube have?', options: ['4', '5', '6', '8'], correctIndex: 2 },

    // Processing
    { id: 19, text: 'If you are facing north and turn 180 degrees, which direction are you facing?', options: ['North', 'East', 'West', 'South'], correctIndex: 3 },
    { id: 20, text: 'What is 7 × 8?', options: ['54', '56', '58', '62'], correctIndex: 1 },
    { id: 21, text: 'Which of these words contains the same sound as the "ough" in "thought"?', options: ['through', 'though', 'rough', 'bough'], correctIndex: 1 },
    { id: 22, text: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctIndex: 1 },
    { id: 23, text: 'What is the largest planet in our solar system?', options: ['Saturn', 'Neptune', 'Uranus', 'Jupiter'], correctIndex: 3 },
    { id: 24, text: 'A book has 240 pages. You have read 60% of it. How many pages remain?', options: ['96', '144', '148', '180'], correctIndex: 0 },
  ],
}
