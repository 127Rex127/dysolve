export interface ScreeningOption {
  text: string
  score: number
}

export interface ScreeningQuestion {
  id: number
  category: string
  text: string
  options: ScreeningOption[]
}

export const SCREENING_QUESTIONS: ScreeningQuestion[] = [
  {
    id: 1,
    category: 'Reading Speed',
    text: 'How would you describe your reading speed compared to people your age?',
    options: [
      { text: 'About the same or faster', score: 0 },
      { text: 'Slightly slower than others', score: 1 },
      { text: 'Noticeably slower — I often fall behind', score: 2 },
      { text: 'Much slower — reading feels exhausting', score: 3 },
    ],
  },
  {
    id: 2,
    category: 'Losing Your Place',
    text: 'When reading, do you accidentally skip words, lines, or jump to the wrong place on the page?',
    options: [
      { text: 'Rarely or never', score: 0 },
      { text: 'Sometimes, especially when tired', score: 1 },
      { text: 'Often — I frequently lose my place', score: 2 },
      { text: 'Almost every time I read a full page', score: 3 },
    ],
  },
  {
    id: 3,
    category: 'Letter Reversals',
    text: 'Do you mix up letters that look similar, such as b/d, p/q, or m/n when reading or writing?',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Occasionally, especially when handwriting', score: 1 },
      { text: 'Fairly often in both reading and writing', score: 2 },
      { text: 'Very frequently — it causes real confusion', score: 3 },
    ],
  },
  {
    id: 4,
    category: 'Spelling',
    text: 'How often do you make spelling mistakes, even with words you have seen many times?',
    options: [
      { text: 'Rarely — my spelling is generally fine', score: 0 },
      { text: 'Occasionally with tricky words', score: 1 },
      { text: 'Often, including everyday words', score: 2 },
      { text: 'Almost every time I write — spelling feels very hard', score: 3 },
    ],
  },
  {
    id: 5,
    category: 'Word Memory',
    text: 'Do you find it hard to remember how to spell common words, even after practising them?',
    options: [
      { text: 'Words usually stick after a little practice', score: 0 },
      { text: 'Some words are tricky to hold onto', score: 1 },
      { text: 'Words I learn seem to disappear overnight', score: 2 },
      { text: 'Very difficult — spelling never seems to stick', score: 3 },
    ],
  },
  {
    id: 6,
    category: 'Writing Speed',
    text: 'How would you describe your handwriting or typing speed compared to people your age?',
    options: [
      { text: 'About the same or faster', score: 0 },
      { text: 'A little slower', score: 1 },
      { text: 'Noticeably slow — I often struggle to keep up', score: 2 },
      { text: 'Much slower — writing by hand is very difficult', score: 3 },
    ],
  },
  {
    id: 7,
    category: 'Following Instructions',
    text: 'How easy is it for you to follow written instructions or directions?',
    options: [
      { text: 'Easy — I can follow them straight away', score: 0 },
      { text: 'I sometimes need to re-read them', score: 1 },
      { text: 'I often need several reads and still feel unsure', score: 2 },
      { text: 'Very difficult — I frequently misread or miss steps', score: 3 },
    ],
  },
  {
    id: 8,
    category: 'Sequencing',
    text: 'Do you find it hard to put things in the right order — like recipe steps, dates, or directions?',
    options: [
      { text: 'No — sequences feel natural to me', score: 0 },
      { text: 'Sometimes I mix up the order', score: 1 },
      { text: 'Often — sequencing is confusing', score: 2 },
      { text: 'Always — I regularly do steps in the wrong order', score: 3 },
    ],
  },
  {
    id: 9,
    category: 'Re-Reading',
    text: 'How often do you need to re-read sentences or paragraphs to understand what they mean?',
    options: [
      { text: 'Rarely — I usually get it first time', score: 0 },
      { text: 'Sometimes with complex text', score: 1 },
      { text: 'Often, even with fairly simple text', score: 2 },
      { text: 'Almost always — I re-read everything multiple times', score: 3 },
    ],
  },
  {
    id: 10,
    category: 'Word Confusion',
    text: 'Do you confuse words that look or sound similar — like "was/saw", "there/their", or "left/right"?',
    options: [
      { text: 'Not really', score: 0 },
      { text: 'Occasionally', score: 1 },
      { text: 'Fairly often — it causes mix-ups', score: 2 },
      { text: 'Very frequently — it is a constant challenge', score: 3 },
    ],
  },
  {
    id: 11,
    category: 'Sounding Out Words',
    text: 'How easy is it for you to sound out new or unfamiliar words?',
    options: [
      { text: 'Easy — I can usually work them out', score: 0 },
      { text: 'Takes a moment but I usually manage', score: 1 },
      { text: 'Difficult — unfamiliar words trip me up', score: 2 },
      { text: 'Very difficult — I often give up or guess', score: 3 },
    ],
  },
  {
    id: 12,
    category: 'Reading Aloud',
    text: 'How do you feel about reading aloud in front of others?',
    options: [
      { text: 'Comfortable — I don\'t mind at all', score: 0 },
      { text: 'Slightly anxious but I manage', score: 1 },
      { text: 'I avoid it when I can — it feels stressful', score: 2 },
      { text: 'Very uncomfortable — I try hard to avoid it', score: 3 },
    ],
  },
  {
    id: 13,
    category: 'Copying Text',
    text: 'When copying from a board, screen, or book, how often do you lose your place?',
    options: [
      { text: 'Rarely — I can copy without much trouble', score: 0 },
      { text: 'Sometimes I lose my spot', score: 1 },
      { text: 'Often — copying is slow and frustrating', score: 2 },
      { text: 'Almost always — I find copying very difficult', score: 3 },
    ],
  },
  {
    id: 14,
    category: 'Reading Fatigue',
    text: 'How tiring do you find reading compared to other activities?',
    options: [
      { text: 'Not particularly tiring', score: 0 },
      { text: 'A bit tiring if I read for a long time', score: 1 },
      { text: 'Reading makes me tired quite quickly', score: 2 },
      { text: 'Even short reads feel exhausting', score: 3 },
    ],
  },
  {
    id: 15,
    category: 'Finding Words',
    text: 'Do you sometimes struggle to find the right word when speaking or writing, even if you know what you mean?',
    options: [
      { text: 'Not really — words come to me easily', score: 0 },
      { text: 'Occasionally I have a tip-of-tongue moment', score: 1 },
      { text: 'Fairly often — it can be frustrating', score: 2 },
      { text: 'Very often — I frequently can\'t find the word I want', score: 3 },
    ],
  },
  {
    id: 16,
    category: 'Numbers & Directions',
    text: 'Do you mix up numbers (e.g., 13 and 31) or find left and right confusing?',
    options: [
      { text: 'No — numbers and directions feel clear', score: 0 },
      { text: 'Occasionally in certain situations', score: 1 },
      { text: 'Fairly often — it causes real mistakes', score: 2 },
      { text: 'Very often — it is a regular difficulty', score: 3 },
    ],
  },
  {
    id: 17,
    category: 'Learning New Words',
    text: 'How difficult is it for you to learn and remember new vocabulary or technical terms?',
    options: [
      { text: 'Not difficult — new words stick reasonably well', score: 0 },
      { text: 'Takes a little more effort than average', score: 1 },
      { text: 'Quite difficult — I need a lot of repetition', score: 2 },
      { text: 'Very difficult — new vocabulary rarely sticks', score: 3 },
    ],
  },
  {
    id: 18,
    category: 'Time Management',
    text: 'Do you find it hard to judge how long tasks will take, or to keep track of time?',
    options: [
      { text: 'Not really — I manage time reasonably well', score: 0 },
      { text: 'Sometimes I underestimate how long things take', score: 1 },
      { text: 'Often — time feels unpredictable to me', score: 2 },
      { text: 'Yes — time management is a regular struggle', score: 3 },
    ],
  },
  {
    id: 19,
    category: 'Decoding vs. Understanding',
    text: 'When you read, how much energy goes into just figuring out the words vs. understanding the meaning?',
    options: [
      { text: 'Most energy goes to understanding — decoding feels easy', score: 0 },
      { text: 'Decoding takes a little effort but understanding is fine', score: 1 },
      { text: 'Decoding takes so much effort that understanding suffers', score: 2 },
      { text: 'Nearly all my energy goes to just figuring out the words', score: 3 },
    ],
  },
  {
    id: 20,
    category: 'Frustration & Avoidance',
    text: 'How often do you feel frustrated by reading and writing, or find yourself avoiding these tasks?',
    options: [
      { text: 'Rarely — I don\'t find them particularly frustrating', score: 0 },
      { text: 'Sometimes, especially with long or complex content', score: 1 },
      { text: 'Often — I tend to put off reading and writing tasks', score: 2 },
      { text: 'Very frequently — reading and writing cause real anxiety', score: 3 },
    ],
  },
]
