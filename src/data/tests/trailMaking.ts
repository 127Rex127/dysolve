import type { TestDefinition } from './types'

export const trailMakingTest: TestDefinition = {
  id: 'trailMaking',
  name: 'Trail Making Test',
  tagline: 'Processing speed & cognitive flexibility',
  description: 'Inspired by the Trail Making Test, this assessment measures cognitive flexibility, processing speed, and working memory through sequencing and alternating tasks. Normally administered visually; this version uses text-based analogues.',
  category: 'cognitive',
  scoringMode: 'rightWrong',
  timeMinutes: 8,
  icon: '🗺️',
  color: 'from-orange-500 to-amber-600',
  disclaimer: 'This is an educational adaptation of the Trail Making Test. The original is a timed visual test. This text version assesses related cognitive abilities but is not equivalent to the clinical instrument.',
  selectCount: 10,
  resultBands: [
    { min: 0,  max: 49, label: 'Needs practice',     description: 'Sequencing, alternating tasks, and processing speed are skills that respond well to training. Daily mental exercises — puzzles, crosswords, alternating category tasks — can noticeably improve performance.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 50, max: 74, label: 'Average',             description: 'You handled the sequencing and cognitive flexibility tasks reasonably well. Consistent mental exercise and tasks requiring switching between categories will further strengthen these abilities.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 75, max: 100, label: 'Strong performance', description: 'Good result — your cognitive flexibility and sequencing ability is strong. These skills underpin executive function, planning, and efficient task-switching in daily life.', color: 'bg-green-50',  textColor: 'text-green-700' },
  ],
  questions: [
    // Number sequences
    { id: 1, text: 'What is the correct order of these numbers, smallest to largest?\n15, 3, 7, 22, 11, 2', options: ['2, 3, 7, 11, 15, 22', '3, 2, 7, 11, 15, 22', '2, 3, 7, 15, 11, 22', '2, 7, 3, 11, 15, 22'], correctIndex: 0 },
    { id: 2, text: 'Continue this alternating sequence of numbers and letters:\n1 A 2 B 3 C ___', options: ['4 D', 'D 4', '4 E', 'D 5'], correctIndex: 0 },
    { id: 3, text: 'What comes next in this alternating sequence?\nA 1 B 2 C 3 D ___', options: ['E 4', '4 E', '4', 'E'], correctIndex: 1 },
    { id: 4, text: 'Arrange these months in chronological order:\nJune, January, March, October, August', options: ['January, March, June, August, October', 'March, January, June, October, August', 'January, June, March, August, October', 'March, January, August, June, October'], correctIndex: 0 },
    { id: 5, text: 'In the pattern 1 → A → 2 → B → 3 → C, what comes after "C"?', options: ['D', '4', '3', 'B'], correctIndex: 1 },

    // Cognitive flexibility
    { id: 6, text: 'Alternate between vowels and consonants:\nA _ I _ U\nWhat fills the first blank?', options: ['B', 'E', 'O', 'Y'], correctIndex: 0 },
    { id: 7, text: 'The sequence alternates: even number, odd number, even, odd...\n4, 7, 2, 9, 6, ___', options: ['8', '3', '10', '11'], correctIndex: 1 },
    { id: 8, text: 'Alternate between animals and fruits: dog, apple, cat, banana, bird, ___', options: ['cherry', 'fish', 'elephant', 'grape'], correctIndex: 1 },
    { id: 9, text: 'What is the 8th item in this alternating sequence?\nRed, Blue, Red, Blue...', options: ['Red', 'Blue', 'Red or Blue', 'Neither'], correctIndex: 1 },
    { id: 10, text: 'In the sequence A1B2C3D4, what letter-number pair comes after "C3"?', options: ['E5', 'D4', 'D5', 'E4'], correctIndex: 1 },

    // Processing speed / switching
    { id: 11, text: 'Sort these into 2 groups (letters and numbers) and find the odd one out:\nA, 3, B, 7, C, %, D, 2', options: ['A', '3', 'B', '%'], correctIndex: 3 },
    { id: 12, text: 'A task alternates between adding 3 and subtracting 1:\nStart with 10. Apply add 3, subtract 1, add 3, subtract 1. What is the result?', options: ['14', '16', '18', '12'], correctIndex: 0 },
    { id: 13, text: 'Following the rule "number, letter, number, letter", which sequence is correct?', options: ['1A2B', '1A23', 'AB12', '1234'], correctIndex: 0 },
    { id: 14, text: 'What is the 12th term of the sequence: 1, A, 2, B, 3, C, 4, D, 5, E, 6, ___?', options: ['F', '7', 'G', '6'], correctIndex: 0 },
    { id: 15, text: 'In the sequence 2, 4, 3, 6, 4, 8, 5, ___, what comes next?', options: ['6', '9', '10', '7'], correctIndex: 2 },

    // Working memory + sequencing
    { id: 16, text: 'If January = 1, February = 2, etc., what is the sum of March + July + November?', options: ['18', '19', '21', '22'], correctIndex: 2 },
    { id: 17, text: 'Reverse the order of these words: "CAT SAT MAT"\nWhat is the result?', options: ['MAT SAT CAT', 'SAT CAT MAT', 'CAT MAT SAT', 'MAT CAT SAT'], correctIndex: 0 },
    { id: 18, text: 'The alphabet starts: A B C D E F G H I J...\nWhat is the 14th letter?', options: ['M', 'N', 'O', 'L'], correctIndex: 1 },
    { id: 19, text: 'In a sequence that doubles then halves: 2, 4, 2, 4, 2 — what is the sum of all 5 terms?', options: ['12', '14', '16', '18'], correctIndex: 1 },
    { id: 20, text: 'What comes next in the sequence?\nZ, Y, X, W, V, ___', options: ['T', 'U', 'S', 'W'], correctIndex: 1 },
  ],
}
