import type { TestDefinition } from './types'

// Scoring: dichotomyScores are per option; positive = first letter, negative = second letter.
// E.g. dichotomy 'EI' — positive = E, negative = I
// Final type is built from: if sum > 0 → first letter, else second letter, for each dichotomy.

export const mbtiTest: TestDefinition = {
  id: 'mbti',
  name: 'MBTI Personality Type',
  tagline: 'Discover your Myers-Briggs type across 4 dimensions',
  description: '20 questions measuring four personality dichotomies: Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving.',
  category: 'personality',
  scoringMode: 'mbti',
  timeMinutes: 8,
  icon: '🧩',
  color: 'from-amber-500 to-orange-600',
  disclaimer: 'This is a simplified MBTI-style indicator for self-reflection. For a full, validated assessment visit the official MBTI website or consult a certified practitioner.',
  questions: [
    // E/I — 5 questions
    {
      id: 1,
      text: 'After a long week, what sounds more restoring?',
      options: [
        'Going out with friends — social energy picks me up',
        'A quiet evening in — I need time alone to recharge',
        'A small gathering of close friends',
        'Some solo time followed by catching up with one person',
      ],
      dichotomy: 'EI',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 2,
      text: 'In group conversations, you tend to:',
      options: [
        'Jump in, speak freely, and think aloud',
        'Listen first, then contribute when you have something to add',
        'Lead the conversation energetically',
        'Prefer one-on-one side conversations',
      ],
      dichotomy: 'EI',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 3,
      text: 'You generally find meeting new people:',
      options: [
        'Exciting and energising',
        'Fine but mildly draining',
        'Fun in small doses',
        'Something you\'re happy to avoid',
      ],
      dichotomy: 'EI',
      dichotomyScores: [2, -1, 1, -2],
    },
    {
      id: 4,
      text: 'At a party, you are more likely to:',
      options: [
        'Know everyone\'s name by the end',
        'Stay close to the few people you came with',
        'Start conversations with strangers easily',
        'Find a quiet corner and observe',
      ],
      dichotomy: 'EI',
      dichotomyScores: [2, -1, 1, -2],
    },
    {
      id: 5,
      text: 'When working on a project, you prefer to:',
      options: [
        'Bounce ideas off others frequently',
        'Work alone first, then share at the end',
        'Have background chatter or colleagues nearby',
        'Work in complete silence and focus independently',
      ],
      dichotomy: 'EI',
      dichotomyScores: [2, -2, 1, -1],
    },

    // S/N — 5 questions
    {
      id: 6,
      text: 'When learning something new, you prefer to:',
      options: [
        'Get the facts, step-by-step instructions, and concrete examples',
        'Understand the big picture and underlying theory first',
        'See it demonstrated, then practise it',
        'Explore ideas and concepts before the details',
      ],
      dichotomy: 'SN',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 7,
      text: 'You are more likely to trust:',
      options: [
        'What you can directly observe and experience',
        'Your gut feeling and intuition',
        'Data and past evidence',
        'Patterns you sense beneath the surface',
      ],
      dichotomy: 'SN',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 8,
      text: 'In your daily life, you tend to focus more on:',
      options: [
        'The present moment and practical realities',
        'Future possibilities and "what could be"',
        'What\'s real and immediately relevant',
        'Ideas, theories, and imaginative thinking',
      ],
      dichotomy: 'SN',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 9,
      text: 'When reading a book or article, you:',
      options: [
        'Appreciate specific, concrete details',
        'Skip to the underlying message or theme',
        'Remember particular facts and examples',
        'Connect it to broader patterns and ideas',
      ],
      dichotomy: 'SN',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 10,
      text: 'You\'d rather be known as:',
      options: [
        'Practical and grounded',
        'Creative and visionary',
        'Reliable and realistic',
        'Original and imaginative',
      ],
      dichotomy: 'SN',
      dichotomyScores: [2, -2, 1, -1],
    },

    // T/F — 5 questions
    {
      id: 11,
      text: 'When making an important decision, you primarily consider:',
      options: [
        'Logic, facts, and the most rational outcome',
        'How the decision will affect the people involved',
        'Pros and cons objectively',
        'What feels right and aligns with your values',
      ],
      dichotomy: 'TF',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 12,
      text: 'When a friend comes to you with a problem, you instinctively:',
      options: [
        'Help them analyse it and find a solution',
        'Listen and offer emotional support first',
        'Suggest the most logical course of action',
        'Validate their feelings before anything else',
      ],
      dichotomy: 'TF',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 13,
      text: 'When someone makes a mistake, you tend to:',
      options: [
        'Point out what went wrong and how to fix it',
        'Consider their feelings before giving feedback',
        'Focus on the error objectively',
        'Soften the criticism with kindness',
      ],
      dichotomy: 'TF',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 14,
      text: 'You are more convinced by:',
      options: [
        'A well-structured logical argument',
        'An emotional, heartfelt appeal',
        'Hard evidence and data',
        'Shared values and personal stories',
      ],
      dichotomy: 'TF',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 15,
      text: 'In a disagreement, you tend to:',
      options: [
        'Stay focused on who\'s factually correct',
        'Prioritise maintaining the relationship',
        'Debate to find the best answer',
        'Compromise to keep the peace',
      ],
      dichotomy: 'TF',
      dichotomyScores: [2, -2, 1, -1],
    },

    // J/P — 5 questions
    {
      id: 16,
      text: 'When planning a holiday, you prefer to:',
      options: [
        'Book everything in advance — accommodation, activities, schedule',
        'Have a rough idea and decide day by day',
        'Make a detailed itinerary and stick to it',
        'Keep it open and see what happens',
      ],
      dichotomy: 'JP',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 17,
      text: 'Your work space is typically:',
      options: [
        'Organised with everything in its place',
        'A bit chaotic but you know where things are',
        'Clean desk — tidy space, tidy mind',
        'Creatively messy — organisation feels limiting',
      ],
      dichotomy: 'JP',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 18,
      text: 'When a deadline is approaching, you:',
      options: [
        'Have usually finished well in advance',
        'Often leave it to the last moment and do well under pressure',
        'Plan backwards from the deadline to stay on track',
        'Find deadlines stressful and prefer open timelines',
      ],
      dichotomy: 'JP',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 19,
      text: 'Unexpected changes to plans make you feel:',
      options: [
        'Frustrated — you prefer predictability',
        'Excited — spontaneity keeps things fresh',
        'A bit stressed until you adjust',
        'Energised by the new possibilities',
      ],
      dichotomy: 'JP',
      dichotomyScores: [2, -2, 1, -1],
    },
    {
      id: 20,
      text: 'You feel most comfortable when things are:',
      options: [
        'Decided and settled',
        'Open-ended and flexible',
        'Scheduled and structured',
        'Fluid and adaptable',
      ],
      dichotomy: 'JP',
      dichotomyScores: [2, -2, 1, -1],
    },
  ],
}

// MBTI type descriptions for results
export const MBTI_DESCRIPTIONS: Record<string, { title: string; description: string; strengths: string[]; growthAreas: string[] }> = {
  INTJ: { title: 'The Architect', description: 'Strategic, independent, and driven by a long-term vision. You see patterns others miss and build systems to make the world work better.', strengths: ['Strategic planning', 'Independent thinking', 'High standards', 'Decisive'], growthAreas: ['Patience with others', 'Emotional expression', 'Flexibility'] },
  INTP: { title: 'The Logician',  description: 'Inventive, analytical, and endlessly curious. You love exploring theories and finding logical inconsistencies in ideas.', strengths: ['Abstract thinking', 'Problem solving', 'Objectivity', 'Innovation'], growthAreas: ['Following through', 'Social connection', 'Practical action'] },
  ENTJ: { title: 'The Commander', description: 'Bold, imaginative, and strong-willed. You lead naturally and love turning ambitious ideas into reality.', strengths: ['Leadership', 'Efficiency', 'Confident decisions', 'Strategic vision'], growthAreas: ['Patience', 'Empathy', 'Slowing down'] },
  ENTP: { title: 'The Debater',   description: 'Smart, curious, and quick — you love a good intellectual challenge and thinking outside the box.', strengths: ['Innovation', 'Quick thinking', 'Persuasion', 'Flexibility'], growthAreas: ['Follow-through', 'Sensitivity to others', 'Finishing tasks'] },
  INFJ: { title: 'The Advocate',  description: 'Insightful, principled, and deeply caring. You combine empathy with vision to inspire real change in others.', strengths: ['Empathy', 'Big-picture vision', 'Deep focus', 'Integrity'], growthAreas: ['Self-care', 'Accepting imperfection', 'Opening up'] },
  INFP: { title: 'The Mediator',  description: 'Idealistic, creative, and compassionate. You see potential in people and strive to live in alignment with your values.', strengths: ['Empathy', 'Creativity', 'Authenticity', 'Open-mindedness'], growthAreas: ['Practicality', 'Handling criticism', 'Decision-making'] },
  ENFJ: { title: 'The Protagonist', description: 'Charismatic and inspiring, you\'re a natural leader who brings out the best in others.', strengths: ['Inspiring others', 'Communication', 'Empathy', 'Organising people'], growthAreas: ['Setting boundaries', 'Self-care', 'Handling conflict'] },
  ENFP: { title: 'The Campaigner', description: 'Enthusiastic, creative, and sociable — you see life as full of possibility and love connecting with people.', strengths: ['Enthusiasm', 'Creativity', 'People skills', 'Adaptability'], growthAreas: ['Focus', 'Follow-through', 'Routine tasks'] },
  ISTJ: { title: 'The Logistician', description: 'Reliable, organised, and driven by duty. You take commitments seriously and deliver with precision.', strengths: ['Reliability', 'Organisation', 'Detail-oriented', 'Integrity'], growthAreas: ['Flexibility', 'Embracing change', 'Emotional expression'] },
  ISFJ: { title: 'The Defender',  description: 'Warm, dedicated, and always ready to help. You protect and care for those around you with quiet strength.', strengths: ['Loyalty', 'Attentiveness', 'Practical care', 'Hard work'], growthAreas: ['Saying no', 'Self-advocacy', 'Handling change'] },
  ESTJ: { title: 'The Executive', description: 'Organised, efficient, and decisive — you excel at bringing structure and direction to any project or team.', strengths: ['Leadership', 'Organisation', 'Decisiveness', 'Reliability'], growthAreas: ['Flexibility', 'Listening to others', 'Emotional intelligence'] },
  ESFJ: { title: 'The Consul',    description: 'Caring, social, and popular — you bring harmony and warmth to every group you join.', strengths: ['Social skills', 'Loyalty', 'Practical helpfulness', 'Team building'], growthAreas: ['Handling criticism', 'Independence', 'Assertiveness'] },
  ISTP: { title: 'The Virtuoso',  description: 'Practical, observant, and hands-on. You love how things work and have a gift for finding efficient solutions.', strengths: ['Problem solving', 'Independence', 'Calm under pressure', 'Practicality'], growthAreas: ['Long-term planning', 'Emotional connection', 'Commitment'] },
  ISFP: { title: 'The Adventurer', description: 'Gentle, artistic, and open to experience. You live by your values and express yourself through creativity.', strengths: ['Creativity', 'Empathy', 'Flexibility', 'Authenticity'], growthAreas: ['Planning ahead', 'Assertiveness', 'Self-confidence'] },
  ESTP: { title: 'The Entrepreneur', description: 'Bold, direct, and energetic. You live for the moment and thrive on action, risk, and results.', strengths: ['Boldness', 'Adaptability', 'Practical problem-solving', 'Energy'], growthAreas: ['Long-term thinking', 'Patience', 'Sensitivity'] },
  ESFP: { title: 'The Entertainer', description: 'Spontaneous, energetic, and fun — you bring joy to every situation and love being at the centre of it all.', strengths: ['Enthusiasm', 'Social skills', 'Adaptability', 'Optimism'], growthAreas: ['Focus', 'Planning', 'Handling criticism'] },
}
