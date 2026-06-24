import type { TestDefinition } from './types'

export const iatTest: TestDefinition = {
  id: 'iat',
  name: 'Implicit Association Test',
  tagline: 'Uncover implicit cognitive patterns',
  description: 'Inspired by the Implicit Association Test (IAT), this educational version explores automatic cognitive associations, logical consistency, and how assumptions and framing affect your thinking. It reveals patterns in how you categorise and associate concepts.',
  category: 'cognitive',
  scoringMode: 'rightWrong',
  timeMinutes: 8,
  icon: '🪞',
  color: 'from-violet-500 to-purple-600',
  disclaimer: 'This is an educational adaptation of IAT concepts. The original IAT measures implicit biases through reaction time. This version explores cognitive associations and logical consistency — it does not measure bias.',
  selectCount: 10,
  resultBands: [
    { min: 0,  max: 49, label: 'Pattern recognition developing', description: 'Uncovering hidden assumptions in reasoning takes practice. Logic puzzles, debiasing exercises, and reflecting on "why do I think this?" are powerful tools for developing more nuanced cognitive patterns.', color: 'bg-orange-50', textColor: 'text-orange-700' },
    { min: 50, max: 74, label: 'Average',                        description: 'You identified cognitive patterns and logical associations in several questions. Continued exposure to diverse viewpoints and reflective thinking will sharpen your ability to spot hidden assumptions.', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { min: 75, max: 100, label: 'Strong analytical awareness',   description: 'You demonstrated strong awareness of cognitive patterns and logical associations. You resisted misleading framing and identified accurate associations consistently.', color: 'bg-sky-50', textColor: 'text-sky-700' },
  ],
  questions: [
    // Logical association
    { id: 1, text: 'A study shows that areas with more ice cream sales have higher drowning rates. The most likely explanation is:', options: ['Ice cream makes people reckless near water', 'Cold water near ice cream shops is dangerous', 'Both happen more in summer — a hidden third variable', 'People who eat ice cream are more likely to swim'], correctIndex: 2 },
    { id: 2, text: 'Which of these pairs are most logically associated?', options: ['Fast → Reckless', 'Slow → Careful', 'Tall → Strong', 'Young → Inexperienced'], correctIndex: 1 },
    { id: 3, text: 'A doctor says "I have operated on this boy\'s father." The boy\'s father says "I have never met this doctor." Who is lying?', options: ['The doctor', 'The father', 'Neither — the doctor could be female', 'The boy'], correctIndex: 2 },
    { id: 4, text: 'Research shows that countries with more TVs per household have longer life expectancy. Does owning a TV cause longer life?', options: ['Yes, TV provides entertainment that reduces stress', 'No — wealthier countries have both more TVs and better healthcare', 'Possibly — more TV means more health information', 'No — TV causes sedentary behaviour'], correctIndex: 1 },
    { id: 5, text: 'Which word pair reflects a logical, not stereotypical, association?', options: ['Old → Slow', 'Foreign → Different', 'Thermometer → Temperature', 'Large → Powerful'], correctIndex: 2 },

    // Framing effects
    { id: 6, text: 'A surgery has a "90% survival rate." Another way of saying the same thing is:', options: ['1 in 10 people survive', '90 out of 100 people die', '10 out of 100 people die', '1 in 90 people survive'], correctIndex: 2 },
    { id: 7, text: 'A glass is described as "half full" and also "half empty." Which description is more accurate?', options: ['Half full — it is more positive', 'Half empty — it is more accurate', 'Neither — both describe the same objective state', 'Half full — empty suggests nothing is there'], correctIndex: 2 },
    { id: 8, text: '"Studies show 75% of people prefer X." Which of these does this NOT necessarily tell us?', options: ['A majority prefer X', '3 in 4 people chose X', 'X is better than the alternative', 'Most of those surveyed chose X'], correctIndex: 2 },

    // Categorisation
    { id: 9, text: 'Which of the following belongs in a different category from the others?\nMars, Neptune, Saturn, Moon', options: ['Mars', 'Neptune', 'Saturn', 'Moon'], correctIndex: 3 },
    { id: 10, text: 'Which grouping is correct?\nEagle, salmon, whale, bat', options: ['All are animals', 'Eagle and bat are birds; salmon and whale are fish', 'Eagle and bat have wings; salmon and whale live in water', 'Salmon and whale are aquatic; eagle, bat, and whale are mammals'], correctIndex: 0 },
    { id: 11, text: 'If doctors belong to the "healthcare" category and teachers belong to "education", which category does a school nurse belong to?', options: ['Healthcare only', 'Education only', 'Both healthcare and education', 'Neither'], correctIndex: 2 },
    { id: 12, text: 'A zebra is most logically associated with:', options: ['Horses, because of similar body structure', 'Stripes, because that is its most obvious feature', 'Africa, because of its origin', 'Depends on the context of the question'], correctIndex: 3 },

    // Assumption testing
    { id: 13, text: 'A man walks into a hardware store and buys nails. He is a ___.', options: ['Builder', 'We cannot determine his profession', 'Handyman', 'Carpenter'], correctIndex: 1 },
    { id: 14, text: 'Two people can play chess. Alice and Bob have just finished a game. Alice won three games and Bob lost three games. How many games did they play?', options: ['3', '6', 'At least 3', 'Cannot be determined without more info'], correctIndex: 0 },
    { id: 15, text: 'Which of these is a fact rather than a value judgement?', options: ['Dogs are better pets than cats', 'Water boils at 100°C at sea level', 'Classical music is superior to pop', 'Honesty is the most important value'], correctIndex: 1 },

    // Cognitive consistency
    { id: 16, text: 'If A is greater than B, and C is less than B, which ordering is correct?', options: ['C < A < B', 'C < B < A', 'A < B < C', 'B < C < A'], correctIndex: 1 },
    { id: 17, text: 'Which of these arguments contains a logical fallacy?\n"Everyone is doing it, so it must be right."', options: ['Appeal to authority', 'Appeal to nature', 'Bandwagon fallacy', 'False dilemma'], correctIndex: 2 },
    { id: 18, text: 'A newspaper headline reads: "Crime rate rises as ice cream sales increase." The most reasonable conclusion is:', options: ['Ice cream causes crime', 'Crime causes people to eat ice cream', 'Both increase in summer — correlation is not causation', 'The data is fabricated'], correctIndex: 2 },
    { id: 19, text: 'Which of these statements is necessarily true if "All As are Bs" is true?', options: ['All Bs are As', 'No Cs are As', 'Some Bs are As', 'If something is not a B, it is not an A'], correctIndex: 3 },
    { id: 20, text: 'A person who is wrong 30% of the time is correct ___% of the time.', options: ['60%', '70%', '30%', 'Depends on the sample size'], correctIndex: 1 },
  ],
}
