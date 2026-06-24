import type { TestDefinition } from './types'

export const stroopTest: TestDefinition = {
  id: 'stroop',
  name: 'Stroop Color-Word Test',
  tagline: 'Attention & cognitive inhibition',
  description: 'The Stroop effect measures your ability to suppress automatic responses and focus selectively. This text-based version assesses attention, inhibition, and cognitive control — the mental muscles of focus.',
  category: 'cognitive',
  scoringMode: 'rightWrong',
  timeMinutes: 6,
  icon: '🎨',
  color: 'from-pink-500 to-rose-600',
  disclaimer: 'This is an educational adaptation of the Stroop Color-Word Test. The original is a timed task; this version assesses related inhibitory control and attention abilities.',
  selectCount: 12,
  resultBands: [
    { min: 0,  max: 49, label: 'Needs development',   description: 'Cognitive inhibition — the ability to suppress automatic responses — is trainable. Mindfulness, focused attention exercises, and tasks requiring you to resist "obvious" answers all build this skill.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 50, max: 74, label: 'Average',              description: 'You navigated the attention and inhibition questions reasonably well. Practising selective attention tasks and mindfulness can further sharpen your cognitive control.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 75, max: 89, label: 'Above average',        description: 'Good cognitive control — you resisted misleading cues and maintained focus well. This ability helps with everything from exam performance to emotional regulation.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 90, max: 100, label: 'Exceptional',         description: 'Excellent inhibitory control and focused attention. You consistently resisted interference and identified the correct response even under cognitive pressure.', color: 'bg-sky-50',   textColor: 'text-sky-700' },
  ],
  questions: [
    // Classic Stroop-style (word meaning vs. what it describes)
    { id: 1, text: 'The word "BLUE" is written in red ink. What colour is the ink?', options: ['Blue', 'Red', 'Green', 'Yellow'], correctIndex: 1 },
    { id: 2, text: 'The word "GREEN" is written in yellow ink. What colour is the text, not the meaning?', options: ['Green', 'Blue', 'Yellow', 'Red'], correctIndex: 2 },
    { id: 3, text: 'The word "FAST" is printed below the word "SLOW". Which word is on top?', options: ['SLOW', 'FAST', 'Neither — they are side by side', 'Cannot determine'], correctIndex: 1 },
    { id: 4, text: 'The word "SMALL" is printed in very large letters. What does the word mean?', options: ['Large', 'Small', 'It means what the size suggests', 'Bold'], correctIndex: 1 },
    { id: 5, text: 'The word "LOUD" is whispered quietly. What is the word?', options: ['Quiet', 'Whisper', 'LOUD', 'Soft'], correctIndex: 2 },

    // Selective attention
    { id: 6, text: 'In the list below, identify the word that is a fruit:\nFAST, ORANGE, BOLD, HEAVY', options: ['FAST', 'ORANGE', 'BOLD', 'HEAVY'], correctIndex: 1 },
    { id: 7, text: 'Count only the vowels in: "STROOP TEST"\nHow many vowels are there?', options: ['2', '3', '4', '5'], correctIndex: 1 },
    { id: 8, text: 'In this sentence, count the number of the letter "F":\n"Finished files are the result of years of scientific study combined with the experience of years."', options: ['3', '4', '5', '6'], correctIndex: 3 },
    { id: 9, text: 'Which word in this list does NOT contain a double letter?\nBOOK, TREE, APPLE, STONE', options: ['BOOK', 'TREE', 'APPLE', 'STONE'], correctIndex: 3 },
    { id: 10, text: 'Read this sentence and count only the words that are colours:\n"The BLUE car drove past a RED barn near the GREEN field."\nHow many colour words are there?', options: ['2', '3', '4', '1'], correctIndex: 1 },

    // Inhibitory control
    { id: 11, text: 'Which answer requires ignoring the obvious:\nWhat is heavier — a kilogram of feathers or a kilogram of bricks?', options: ['Bricks', 'Feathers', 'They weigh the same', 'Depends on density'], correctIndex: 2 },
    { id: 12, text: 'A farmer has 17 sheep. All but 9 die. How many sheep are left?', options: ['8', '9', '17', '0'], correctIndex: 1 },
    { id: 13, text: 'How many months have 28 days?', options: ['1', '2', '4', '12'], correctIndex: 3 },
    { id: 14, text: 'A rooster lays an egg on top of a barn. Which way does the egg roll?', options: ['East', 'West', 'Down the slope', 'Roosters don\'t lay eggs'], correctIndex: 3 },
    { id: 15, text: 'You are in a dark room with a candle, a wood stove, and a gas lamp. You have one match. What do you light first?', options: ['The candle', 'The wood stove', 'The gas lamp', 'The match'], correctIndex: 3 },

    // Working memory under interference
    { id: 16, text: 'The word "LONG" appears next to a short line. The word "SHORT" appears next to a long line. Which line is longer?', options: ['The one next to LONG', 'The one next to SHORT', 'They are equal', 'Cannot tell from the description'], correctIndex: 1 },
    { id: 17, text: 'The word "NORTH" is displayed pointing south on a compass. What direction is the arrow actually pointing?', options: ['North', 'East', 'South', 'West'], correctIndex: 2 },
    { id: 18, text: 'The word "WRONG" is the correct answer to this question. What is the correct answer?', options: ['RIGHT', 'WRONG', 'INCORRECT', 'NONE'], correctIndex: 1 },
    { id: 19, text: 'In the sequence: 1, 2, 1, 2, 1... If you are told the 10th number is 1, is that correct?', options: ['Yes', 'No', 'Cannot determine', 'Only if odd-positioned'], correctIndex: 0 },
    { id: 20, text: 'What is the fifth word of this sentence (including "What")?', options: ['What', 'is', 'fifth', 'sentence'], correctIndex: 2 },
    { id: 21, text: 'How many letters in the word "incorrectly" are placed correctly according to their position in the alphabet (i.e. earlier letters first)?', options: ['This question is a trick — the question is about the word "incorrectly" itself', 'None — it\'s a trick question', '3', 'The answer is "incorrectly" itself is not spelled incorrectly'], correctIndex: 0 },
    { id: 22, text: 'Which of these sentences is about itself?', options: ['"This sentence has five words."', '"The sky is blue."', '"Dogs are animals."', '"Fish swim in the sea."'], correctIndex: 0 },
    { id: 23, text: 'If BLACK is the opposite of WHITE, and UP is the opposite of DOWN, what is the answer to: "Is the opposite of WRONG ___?"', options: ['Left', 'Right', 'Correct', 'Wrong'], correctIndex: 2 },
    { id: 24, text: 'Reading left to right only the first letter of each word:\n"Every Lemon Is Green And Round."\nWhat word do these letters spell?', options: ['ELGAR', 'ELGAR', 'EGLAR', 'ELIRAG'], correctIndex: 0 },
  ],
}
