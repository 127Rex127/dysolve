import type { TestDefinition } from './types'

export const wechslerTest: TestDefinition = {
  id: 'wechsler',
  name: 'Wechsler Intelligence Scale',
  tagline: 'Comprehensive multi-scale cognitive assessment',
  description: 'Inspired by the WAIS-IV framework, this assessment covers verbal comprehension, perceptual reasoning, working memory, and processing speed across 12 questions. Results provide an estimated cognitive profile — not a certified IQ score.',
  category: 'cognitive',
  scoringMode: 'rightWrong',
  timeMinutes: 14,
  icon: '🧪',
  color: 'from-indigo-500 to-blue-600',
  disclaimer: 'This is an educational screening tool inspired by the Wechsler Adult Intelligence Scale. Official cognitive assessments require a qualified psychologist. Results here are estimates and should not be used for clinical decisions.',
  selectCount: 12,
  resultBands: [
    { min: 0,  max: 33, label: 'Below Average',  description: 'You answered fewer questions correctly. Consider practising reasoning puzzles, pattern recognition, and working memory exercises regularly — cognitive flexibility improves with consistent training.', color: 'bg-red-50',    textColor: 'text-red-700' },
    { min: 34, max: 58, label: 'Low Average',     description: 'You showed some solid reasoning skills. With regular practice on logical sequences, verbal analogies, and numerical patterns, you can strengthen your performance significantly.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 59, max: 75, label: 'Average',         description: 'A solid result — you handled a good range of cognitive tasks well. Your reasoning skills are in the typical range, with clear strengths in several areas.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 76, max: 91, label: 'Above Average',   description: 'Strong performance across the scale. You showed excellent verbal reasoning, working memory, and perceptual skills. A focused practice session would likely push you even higher.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 92, max: 100, label: 'Exceptional',    description: 'Outstanding result. You solved nearly all questions correctly across all cognitive dimensions. You demonstrate exceptional reasoning, memory, and processing ability.', color: 'bg-sky-50',   textColor: 'text-sky-700' },
  ],
  questions: [
    // Verbal Comprehension
    { id: 1, text: 'What does the word "benevolent" mean?', options: ['Hostile and unkind', 'Well-meaning and kind', 'Extremely careful', 'Emotionally unstable'], correctIndex: 1 },
    { id: 2, text: 'Which pair of words are most similar in meaning?', options: ['Fast / Slow', 'Brave / Courageous', 'Loud / Quiet', 'Hot / Cold'], correctIndex: 1 },
    { id: 3, text: 'Complete the analogy: Library is to Books as Museum is to ___', options: ['Visitors', 'Tickets', 'Artefacts', 'History'], correctIndex: 2 },
    { id: 4, text: 'Which word does NOT belong with the others?', options: ['Piano', 'Guitar', 'Trumpet', 'Painting'], correctIndex: 3 },
    { id: 5, text: 'What does "mitigate" mean?', options: ['To make worse', 'To ignore completely', 'To reduce or lessen', 'To multiply'], correctIndex: 2 },
    { id: 6, text: 'Pen is to Writer as Scalpel is to ___', options: ['Hospital', 'Nurse', 'Surgeon', 'Medicine'], correctIndex: 2 },
    { id: 7, text: 'Which word is the odd one out?', options: ['Sapphire', 'Ruby', 'Emerald', 'Granite'], correctIndex: 3 },
    { id: 8, text: 'What does "ephemeral" mean?', options: ['Long-lasting and durable', 'Short-lived or transitory', 'Extremely large', 'Deeply important'], correctIndex: 1 },

    // Perceptual Reasoning
    { id: 9, text: 'What comes next in the sequence?\n▲ ▲▲ ▲▲▲ ▲▲▲▲ ___', options: ['▲▲▲', '▲▲▲▲▲', '▲▲▲▲▲▲', '▲▲'], correctIndex: 1 },
    { id: 10, text: 'What comes next in the pattern?\n2, 6, 18, 54, ___', options: ['108', '162', '100', '72'], correctIndex: 1 },
    { id: 11, text: 'Which number continues the sequence?\n1, 4, 9, 16, 25, ___', options: ['30', '35', '36', '49'], correctIndex: 2 },
    { id: 12, text: 'What comes next?\n1, 1, 2, 3, 5, 8, ___', options: ['11', '12', '13', '16'], correctIndex: 2 },
    { id: 13, text: 'Which number is different from the others?\n16, 25, 36, 40, 49', options: ['16', '25', '40', '49'], correctIndex: 2 },
    { id: 14, text: 'If a shape has 3 sides and 3 angles, it is a:', options: ['Square', 'Pentagon', 'Triangle', 'Hexagon'], correctIndex: 2 },

    // Working Memory
    { id: 15, text: 'Read this list and identify the sum:\n7, 3, 9, 1, 5\n\nWhat is the sum of the even numbers in this list?', options: ['0', '10', '14', '8'], correctIndex: 0 },
    { id: 16, text: 'If you rearrange the letters "RCLEIC", what word do you get?', options: ['CIRCLE', 'CLERIC', 'CIRCLE', 'RECLIC'], correctIndex: 0 },
    { id: 17, text: 'Which of these numbers, when reversed, gives a larger number?\n19, 63, 84, 27', options: ['19', '63', '84', '27'], correctIndex: 2 },
    { id: 18, text: 'A train travels 60 km in 40 minutes. What is its speed in km/h?', options: ['80 km/h', '90 km/h', '100 km/h', '120 km/h'], correctIndex: 1 },
    { id: 19, text: 'If all Bloops are Razzles and all Razzles are Lazzles, then:', options: ['All Lazzles are Bloops', 'All Bloops are Lazzles', 'No Lazzles are Bloops', 'Some Razzles are not Lazzles'], correctIndex: 1 },
    { id: 20, text: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correctIndex: 1 },

    // Processing Speed / Logic
    { id: 21, text: 'Which statement is logically valid?\nAll fish can swim. A tuna is a fish. Therefore:', options: ['All swimming animals are tuna', 'A tuna can swim', 'Fish never drown', 'Tuna are the best swimmers'], correctIndex: 1 },
    { id: 22, text: 'How many months have exactly 30 days?', options: ['2', '3', '4', '5'], correctIndex: 2 },
    { id: 23, text: 'If you have a 10-litre container that is 60% full, how many litres does it contain?', options: ['4 litres', '5 litres', '6 litres', '7 litres'], correctIndex: 2 },
    { id: 24, text: 'What is the missing number?\n5, 10, 20, ___, 80', options: ['30', '35', '40', '45'], correctIndex: 2 },
    { id: 25, text: 'A palindrome is a word that reads the same forwards and backwards. Which of these is a palindrome?', options: ['radar', 'level', 'civic', 'All of the above'], correctIndex: 3 },
    { id: 26, text: 'If today is Wednesday, what day will it be in 100 days?', options: ['Monday', 'Tuesday', 'Friday', 'Sunday'], correctIndex: 0 },
    { id: 27, text: 'Which of the following is NOT a prime number?', options: ['17', '23', '29', '27'], correctIndex: 3 },
    { id: 28, text: 'Tom is taller than Sarah. Sarah is taller than Mike. Who is the shortest?', options: ['Tom', 'Sarah', 'Mike', 'Cannot be determined'], correctIndex: 2 },
    { id: 29, text: 'In a race, if you overtake the person in 3rd place, what position are you in?', options: ['1st', '2nd', '3rd', '4th'], correctIndex: 2 },
    { id: 30, text: 'What fraction of an hour is 45 minutes?', options: ['1/2', '2/3', '3/4', '4/5'], correctIndex: 2 },
  ],
}
