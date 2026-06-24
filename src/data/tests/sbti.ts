import type { TestDefinition } from './types'

// SBTI — Self-Behavioral Type Indicator
// An original behavioral assessment inspired by MBTI and DISC research.
// 4 types: Driver, Expressive, Amiable, Analytical
// 20 questions — 5 per type dimension.
// Scoring: each option maps to a behavioral dimension.
// Primary type = highest total; secondary type = second highest.

export const sbtiTest: TestDefinition = {
  id: 'sbti',
  name: 'SBTI Behavioral Type',
  tagline: 'Discover your natural behavioral style',
  description: 'The Self-Behavioral Type Indicator maps your natural behavioral tendencies across four styles: Driver, Expressive, Amiable, and Analytical. 20 questions.',
  category: 'behavioral',
  scoringMode: 'sbti',
  timeMinutes: 8,
  icon: '🎯',
  color: 'from-orange-500 to-amber-600',
  disclaimer: 'The SBTI is an original self-reflection tool inspired by MBTI and social style research. It is not a validated clinical instrument.',
  questions: [
    {
      id: 1,
      text: 'When starting a new project, your first instinct is to:',
      options: [
        'Set a clear goal and take charge immediately',
        'Rally the team and generate exciting ideas together',
        'Make sure everyone is comfortable with the plan',
        'Research thoroughly before making any decisions',
      ],
      sbtiDimension: 'driver',
    },
    {
      id: 2,
      text: 'In a meeting where things are going slowly, you:',
      options: [
        'Push to cut to the decision and move on',
        'Energise the group with enthusiasm and new angles',
        'Check in on quieter members to include everyone',
        'Suggest reviewing the data more carefully first',
      ],
      sbtiDimension: 'driver',
    },
    {
      id: 3,
      text: 'Your biggest frustration with others is when they:',
      options: [
        'Take too long to make decisions',
        'Lack enthusiasm or vision',
        'Ignore people\'s feelings',
        'Make decisions without enough information',
      ],
      sbtiDimension: 'driver',
    },
    {
      id: 4,
      text: 'Under pressure, you tend to:',
      options: [
        'Take control and act decisively',
        'Get louder, more enthusiastic, and seek allies',
        'Focus on keeping the peace and supporting others',
        'Retreat into analysis until you feel certain',
      ],
      sbtiDimension: 'driver',
    },
    {
      id: 5,
      text: 'Your ideal work style is:',
      options: [
        'Fast-paced with autonomy and clear results',
        'Creative and collaborative with room to improvise',
        'Supportive and steady — helping others succeed',
        'Structured and precise with clear processes',
      ],
      sbtiDimension: 'driver',
    },
    {
      id: 6,
      text: 'How do you communicate with others?',
      options: [
        'Direct and to the point — get to the goal',
        'Animated, expressive, and story-driven',
        'Warm, gentle, and personally connected',
        'Detailed, measured, and evidence-based',
      ],
      sbtiDimension: 'expressive',
    },
    {
      id: 7,
      text: 'When you share a new idea, you:',
      options: [
        'State the outcome and why it\'s the best option',
        'Paint a vivid picture of the exciting possibilities',
        'Focus on how it helps the team or community',
        'Present the logic and supporting data behind it',
      ],
      sbtiDimension: 'expressive',
    },
    {
      id: 8,
      text: 'You are at your best when:',
      options: [
        'You have ownership and authority over a challenge',
        'You\'re in a creative, energetic environment',
        'You\'re helping someone solve a real problem',
        'You have time to think deeply and plan carefully',
      ],
      sbtiDimension: 'expressive',
    },
    {
      id: 9,
      text: 'When you disagree with someone, you tend to:',
      options: [
        'State your position clearly and hold your ground',
        'Make your case with passion and stories',
        'Look for common ground rather than win the argument',
        'Back up your view with facts and logical reasoning',
      ],
      sbtiDimension: 'expressive',
    },
    {
      id: 10,
      text: 'People who know you well would describe you as:',
      options: [
        'Driven, decisive, and results-focused',
        'Enthusiastic, charming, and full of ideas',
        'Warm, supportive, and deeply caring',
        'Reliable, thorough, and methodical',
      ],
      sbtiDimension: 'expressive',
    },
    {
      id: 11,
      text: 'When a friend or colleague is struggling, you:',
      options: [
        'Help them solve the problem quickly and move on',
        'Boost their spirits with energy and encouragement',
        'Drop everything to listen and offer support',
        'Help them think through the issue systematically',
      ],
      sbtiDimension: 'amiable',
    },
    {
      id: 12,
      text: 'In a team, you naturally gravitate toward:',
      options: [
        'Leading and making the key calls',
        'Inspiring the group and generating momentum',
        'Making sure everyone feels included and supported',
        'Planning the process and ensuring quality',
      ],
      sbtiDimension: 'amiable',
    },
    {
      id: 13,
      text: 'When things go wrong on a project, you first focus on:',
      options: [
        'Who is responsible and how to fix it fast',
        'Reframing the situation positively to maintain morale',
        'Making sure the team relationship stays intact',
        'Understanding the root cause before acting',
      ],
      sbtiDimension: 'amiable',
    },
    {
      id: 14,
      text: 'Your decision-making process tends to be:',
      options: [
        'Rapid — trust your gut and commit',
        'Intuitive — go where the energy feels right',
        'Deliberate — consider how everyone is affected',
        'Systematic — gather all relevant information first',
      ],
      sbtiDimension: 'amiable',
    },
    {
      id: 15,
      text: 'Which of these feels most like a core value to you?',
      options: [
        'Achievement — making things happen',
        'Expression — sharing yourself and your vision',
        'Harmony — caring for people and relationships',
        'Accuracy — getting things right',
      ],
      sbtiDimension: 'amiable',
    },
    {
      id: 16,
      text: 'When preparing for a presentation, you:',
      options: [
        'Focus on the key message and desired outcome',
        'Think about how to make it memorable and engaging',
        'Consider how to make the audience feel comfortable',
        'Build a thorough, well-structured slide deck',
      ],
      sbtiDimension: 'analytical',
    },
    {
      id: 17,
      text: 'What energises you most at work?',
      options: [
        'Achieving goals and moving fast',
        'Collaborating and creating something new',
        'Building trust and helping others grow',
        'Mastering a skill or solving a complex problem',
      ],
      sbtiDimension: 'analytical',
    },
    {
      id: 18,
      text: 'When you need to convince others, you rely on:',
      options: [
        'Your authority and track record of results',
        'Your enthusiasm and ability to inspire belief',
        'Your relationships and genuine concern for them',
        'Your data, logic, and well-reasoned arguments',
      ],
      sbtiDimension: 'analytical',
    },
    {
      id: 19,
      text: 'Your greatest professional strength is:',
      options: [
        'Getting things done — results over process',
        'Inspiring people and selling a vision',
        'Building lasting relationships and trust',
        'Deep expertise and careful execution',
      ],
      sbtiDimension: 'analytical',
    },
    {
      id: 20,
      text: 'Which environment do you thrive in most?',
      options: [
        'High-stakes, fast-moving, results-driven',
        'Creative, dynamic, and people-energised',
        'Collaborative, supportive, and relationship-focused',
        'Structured, methodical, and quality-focused',
      ],
      sbtiDimension: 'analytical',
    },
  ],
}

export const SBTI_TYPE_INFO: Record<string, {
  name: string
  emoji: string
  description: string
  strengths: string[]
  growthAreas: string[]
  worksWith: string
}> = {
  driver: {
    name: 'Driver',
    emoji: '🚀',
    description: 'You are direct, decisive, and results-focused. You take charge naturally and push through obstacles with confidence. You think fast, act fast, and expect others to keep up.',
    strengths: ['Goal-oriented', 'Decisive', 'Confident under pressure', 'Takes initiative', 'Gets results'],
    growthAreas: ['Patience with process', 'Listening before acting', 'Emotional sensitivity'],
    worksWith: 'Drivers pair well with Analyticals (who provide depth) and Amiables (who smooth relationships).',
  },
  expressive: {
    name: 'Expressive',
    emoji: '✨',
    description: 'You are enthusiastic, creative, and naturally inspiring. You communicate with passion and have a gift for energising people around you. You love big ideas and human connection.',
    strengths: ['Inspiring others', 'Creative thinking', 'Communication', 'Optimism', 'Storytelling'],
    growthAreas: ['Follow-through', 'Focus on detail', 'Managing time', 'Listening more than talking'],
    worksWith: 'Expressives pair well with Analyticals (who ground the vision) and Drivers (who execute).',
  },
  amiable: {
    name: 'Amiable',
    emoji: '🤝',
    description: 'You are warm, empathetic, and deeply supportive. You build strong relationships and create environments where people feel safe. Harmony and trust matter deeply to you.',
    strengths: ['Empathy', 'Listening', 'Building trust', 'Collaboration', 'Conflict resolution'],
    growthAreas: ['Assertiveness', 'Setting boundaries', 'Decision-making speed', 'Saying no'],
    worksWith: 'Amiables pair well with Drivers (who bring direction) and Expressives (who bring energy).',
  },
  analytical: {
    name: 'Analytical',
    emoji: '🔬',
    description: 'You are precise, systematic, and quality-driven. You think deeply before acting and ensure your decisions are well-grounded in evidence. You value accuracy over speed.',
    strengths: ['Deep expertise', 'Critical thinking', 'Attention to detail', 'Planning', 'Risk assessment'],
    growthAreas: ['Decisiveness', 'Flexibility', 'Showing warmth', 'Tolerance for ambiguity'],
    worksWith: 'Analyticals pair well with Expressives (who add energy) and Drivers (who push to action).',
  },
}
