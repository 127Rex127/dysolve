import type { TestDefinition } from './types'

export const stanfordBinetTest: TestDefinition = {
  id: 'stanfordBinet',
  name: 'Stanford-Binet Intelligence',
  tagline: 'Fluid reasoning & working memory',
  description: 'Inspired by the Stanford-Binet 5th Edition, this assessment focuses on fluid reasoning, quantitative ability, and working memory — the core pillars of general intelligence. 10 questions drawn from a larger pool.',
  category: 'cognitive',
  scoringMode: 'rightWrong',
  timeMinutes: 12,
  icon: '⚗️',
  color: 'from-cyan-500 to-teal-600',
  disclaimer: 'This is an educational tool inspired by the Stanford-Binet Intelligence Scales. Official IQ testing requires a qualified psychologist.',
  selectCount: 10,
  resultBands: [
    { min: 0,  max: 39, label: 'Developing',     description: 'Regular practice with reasoning puzzles, number sequences, and logical deduction exercises will build your fluid intelligence over time. Consistency matters more than speed.', color: 'bg-red-50',    textColor: 'text-red-700' },
    { min: 40, max: 64, label: 'Average',         description: 'A solid showing — you handled several types of reasoning correctly. Building on your strengths with targeted practice will steadily improve your score.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 65, max: 84, label: 'Above Average',   description: 'Strong performance across the reasoning and memory dimensions. Your fluid intelligence is clearly above average — you think flexibly and accurately.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 85, max: 100, label: 'Exceptional',    description: 'Outstanding. You demonstrated exceptional fluid reasoning and working memory across all question types. This level of reasoning ability is a real cognitive asset in any domain.', color: 'bg-sky-50',   textColor: 'text-sky-700' },
  ],
  questions: [
    // Fluid Reasoning
    { id: 1, text: 'What is the next number in the sequence?\n3, 7, 15, 31, ___', options: ['47', '55', '63', '67'], correctIndex: 2 },
    { id: 2, text: 'If all Morks are Glurbs and no Glurbs are Blorps, then:', options: ['Some Morks are Blorps', 'All Blorps are Morks', 'No Morks are Blorps', 'All Morks are Blorps'], correctIndex: 2 },
    { id: 3, text: 'A clock shows 3:15. What angle (in degrees) is formed between the hour and minute hands?', options: ['0°', '7.5°', '52.5°', '90°'], correctIndex: 1 },
    { id: 4, text: 'What comes next in this letter sequence?\nA, C, F, J, O, ___', options: ['T', 'U', 'V', 'W'], correctIndex: 1 },
    { id: 5, text: 'A square has an area of 64 cm². What is the length of its diagonal (to nearest whole number)?', options: ['8 cm', '10 cm', '11 cm', '12 cm'], correctIndex: 2 },
    { id: 6, text: 'What number should replace the question mark?\n4  9  16\n25 36 49\n64 81 ?', options: ['90', '100', '108', '121'], correctIndex: 1 },
    { id: 7, text: 'Which shape is the odd one out if the rule is "has at least one line of symmetry"?\n(A) Equilateral triangle  (B) Scalene triangle  (C) Square  (D) Regular hexagon', options: ['A', 'B', 'C', 'D'], correctIndex: 1 },
    { id: 8, text: 'Complete the analogy: Architect is to Building as Composer is to ___', options: ['Orchestra', 'Conductor', 'Symphony', 'Concert'], correctIndex: 2 },

    // Quantitative Reasoning
    { id: 9, text: 'A shirt costs £24 after a 20% discount. What was the original price?', options: ['£28', '£30', '£32', '£36'], correctIndex: 1 },
    { id: 10, text: 'If 5x + 3 = 28, what is x?', options: ['4', '5', '6', '7'], correctIndex: 1 },
    { id: 11, text: 'How many seconds are in 2.5 hours?', options: ['7,200', '8,000', '9,000', '10,800'], correctIndex: 2 },
    { id: 12, text: 'A car travels 150 km on 12 litres of petrol. How far can it travel on 20 litres?', options: ['200 km', '225 km', '250 km', '280 km'], correctIndex: 2 },
    { id: 13, text: 'What is the 10th term of the arithmetic sequence: 2, 5, 8, 11, ...?', options: ['26', '28', '29', '32'], correctIndex: 2 },
    { id: 14, text: 'A jar contains 3 red, 5 blue, and 2 green marbles. If you pick one at random, what is the probability it is NOT blue?', options: ['1/2', '3/5', '1/5', '2/5'], correctIndex: 0 },

    // Working Memory
    { id: 15, text: 'Read these numbers, then identify which pair sums to 100:\n37, 63, 49, 51, 82, 18', options: ['37 + 82', '63 + 49', '37 + 63', '82 + 18'], correctIndex: 2 },
    { id: 16, text: 'Rearrange the letters "NTABUECIL" to make a word. What type of word is it?', options: ['A planet', 'A country', 'A vehicle', 'An adjective meaning attractive'], correctIndex: 3 },
    { id: 17, text: 'If A=1, B=2, C=3... what is the sum of the letters in "CAB"?', options: ['4', '5', '6', '7'], correctIndex: 2 },
    { id: 18, text: 'Which two numbers from this list multiply to give 72?\n6, 8, 9, 11, 12', options: ['6 × 11', '8 × 9', '6 × 12', '9 × 8 only'], correctIndex: 1 },

    // Abstract Reasoning
    { id: 19, text: 'Find the odd one out: Mercury, Venus, Mars, Moon, Jupiter', options: ['Mercury', 'Venus', 'Moon', 'Jupiter'], correctIndex: 2 },
    { id: 20, text: 'Which proverb means the same as: "Do not judge something by its external appearance"?', options: ['"Every cloud has a silver lining"', '"Don\'t judge a book by its cover"', '"Look before you leap"', '"Actions speak louder than words"'], correctIndex: 1 },
    { id: 21, text: 'What is the next letter pair in this pattern?\nAZ, BY, CX, DW, ___', options: ['EU', 'EV', 'FV', 'FU'], correctIndex: 1 },
    { id: 22, text: 'Three friends share a bill of £120. Anna pays twice as much as Ben. Ben pays twice as much as Chris. How much does Chris pay?', options: ['£10', '£15', '£17', '£20'], correctIndex: 2 },
    { id: 23, text: 'Which of these is the definition of "extrapolate"?', options: ['To summarise in brief', 'To extend existing trends into the future', 'To translate between languages', 'To remove unnecessary elements'], correctIndex: 1 },
    { id: 24, text: 'In a factory, Machine A produces 10 units/hour and Machine B produces 15 units/hour. Working together, how long to produce 100 units?', options: ['4 hours', '4 hours 40 minutes', '5 hours', '6 hours'], correctIndex: 0 },
  ],
}
