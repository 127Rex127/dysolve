import type { TestDefinition } from './types'

export const hollandCodeTest: TestDefinition = {
  id: 'hollandCode',
  name: 'Holland Code (RIASEC)',
  tagline: 'Career interest & vocational fit',
  description: 'Based on John Holland\'s RIASEC theory, this assessment identifies your career interest type across four primary dimensions. Understanding your Holland Code can guide career decisions, educational choices, and work environment preferences.',
  category: 'behavioral',
  scoringMode: 'typeTest',
  typeDimensions: ['realistic', 'investigative', 'artistic', 'social'],
  timeMinutes: 8,
  icon: '💼',
  color: 'from-amber-500 to-yellow-600',
  selectCount: 12,
  typeInfo: {
    realistic: {
      name: 'Realistic (R)',
      emoji: '🔧',
      description: 'You are a practical, hands-on person who prefers working with tools, machines, or physical environments. You value concrete results you can see and touch, and you enjoy building, fixing, and creating tangible things. You tend to be direct, honest, and focused on practical solutions.',
      strengths: [
        'Excellent at technical, mechanical, and physical tasks',
        'Highly practical — you solve problems with real-world solutions',
        'Persistent and reliable in hands-on work',
        'Values craftsmanship and genuine skill',
        'Calm under pressure in physical or technical situations',
      ],
      growthAreas: [
        'Expressing ideas and emotions verbally',
        'Comfortable in highly social or interpersonal roles',
        'Abstract or theoretical discussions without clear applications',
      ],
      worksWith: 'Careers: engineering, construction, agriculture, military, mechanics, IT infrastructure. You work well in environments where you can see the results of your effort. Investigative (I) types complement you well on the analytical side.',
    },
    investigative: {
      name: 'Investigative (I)',
      emoji: '🔬',
      description: 'You are a curious, analytical thinker who loves exploring ideas, solving complex problems, and understanding how things work. You thrive in research, science, and technical problem-solving. You prefer thinking through challenges independently and are driven by intellectual curiosity.',
      strengths: [
        'Deep analytical and critical thinking ability',
        'Excellent at research, data analysis, and problem-solving',
        'Persistent and focused in complex intellectual tasks',
        'Independent thinker who questions assumptions',
        'Highly competent in specialised technical areas',
      ],
      growthAreas: [
        'Communicating complex ideas to non-experts',
        'Working in high social or team-collaborative environments',
        'Managing practical or administrative tasks',
      ],
      worksWith: 'Careers: science, medicine, research, technology, mathematics, academia. You excel in environments where rigour and intellectual depth are valued. Realistic (R) types can help ground your theories in practical application.',
    },
    artistic: {
      name: 'Artistic (A)',
      emoji: '🎨',
      description: 'You are a creative, expressive person who values originality, self-expression, and aesthetic beauty. You prefer environments where imagination is encouraged and where you can bring a unique perspective. You thrive when given freedom rather than rigid structure.',
      strengths: [
        'Highly original thinker with a unique perspective',
        'Excellent at creative work across many mediums',
        'Emotionally intelligent and empathetic communicator',
        'Thrives in flexible, creative environments',
        'Brings innovation and fresh ideas to any project',
      ],
      growthAreas: [
        'Structured, routine, or highly process-driven environments',
        'Staying focused on conventional or administrative tasks',
        'Managing practical business or financial matters',
      ],
      worksWith: 'Careers: design, writing, music, theatre, photography, advertising, architecture. You work best with creative freedom and flexibility. Social (S) types can help you connect your creative work to people\'s needs.',
    },
    social: {
      name: 'Social (S)',
      emoji: '🤝',
      description: 'You are a naturally helpful, people-oriented person who finds meaning in supporting, teaching, and connecting with others. You prefer environments where you can make a real difference in people\'s lives, and you are skilled at communication, empathy, and teamwork.',
      strengths: [
        'Exceptional interpersonal and communication skills',
        'Highly empathetic — you understand people intuitively',
        'Natural teacher, mentor, and guide',
        'Creates inclusive, warm team environments',
        'Finds deep meaning in helping others grow',
      ],
      growthAreas: [
        'Technical or mechanical tasks without a human element',
        'Solo, isolated work for extended periods',
        'Asserting your own needs when focused on others\' needs',
      ],
      worksWith: 'Careers: teaching, counselling, healthcare, social work, HR, community development. You flourish when your work directly impacts people. Artistic (A) types can help you bring creative approaches to human challenges.',
    },
  },
  questions: [
    {
      id: 1,
      text: 'On a free weekend, you are most likely to:',
      options: [
        'Build, fix, or create something physical — DIY, gardening, mechanics',
        'Read, research, or explore a complex topic you\'re curious about',
        'Create — paint, write, play music, photograph, or design',
        'Spend time with people — friends, family, volunteering, or social events',
      ],
    },
    {
      id: 2,
      text: 'In school or university, which subject came most naturally?',
      options: [
        'Technical subjects — engineering, woodwork, physical education',
        'Science and maths — biology, chemistry, physics, computing',
        'Arts and humanities — literature, drama, music, art',
        'Social subjects — psychology, sociology, languages, history of people',
      ],
    },
    {
      id: 3,
      text: 'Which type of work would you find most satisfying?',
      options: [
        'Building or repairing something with your hands',
        'Analysing data and finding solutions to complex problems',
        'Creating an original piece of work that expresses your vision',
        'Helping someone solve a personal or professional challenge',
      ],
    },
    {
      id: 4,
      text: 'Your ideal workplace would be:',
      options: [
        'Outdoors, a workshop, lab, or somewhere hands-on',
        'A quiet, focused environment for independent thinking',
        'A creative studio with flexibility and room for imagination',
        'A collaborative space where you work closely with people',
      ],
    },
    {
      id: 5,
      text: 'Which activity sounds most appealing?',
      options: [
        'Learning to repair a car or build a piece of furniture',
        'Running an experiment or writing a research paper',
        'Designing a logo, writing a short story, or composing music',
        'Coaching someone through a challenge or organising a community event',
      ],
    },
    {
      id: 6,
      text: 'When given a complex problem to solve, you prefer to:',
      options: [
        'Take a practical, hands-on approach — try and fix it directly',
        'Analyse it thoroughly — research, model, and think it through carefully',
        'Approach it creatively — explore unconventional solutions',
        'Discuss it with others and gather different perspectives',
      ],
    },
    {
      id: 7,
      text: 'Which skill are you most proud of?',
      options: [
        'Technical expertise or physical skill in a specific domain',
        'Analytical ability and intellectual problem-solving',
        'Creativity and original expression',
        'Ability to connect with, understand, and help people',
      ],
    },
    {
      id: 8,
      text: 'Which statement best describes what energises you at work?',
      options: [
        'Completing a tangible, visible task or project',
        'Solving a difficult intellectual puzzle or question',
        'Producing original work that reflects your unique perspective',
        'Knowing your work has helped or improved someone\'s life',
      ],
    },
    {
      id: 9,
      text: 'How do you prefer to spend your evenings?',
      options: [
        'Working on a physical project — cooking, crafts, sport, or DIY',
        'Reading, learning, or diving into a documentary or complex show',
        'Creating — music, art, writing, photography, or design',
        'Socialising, calling friends, or catching up with people you care about',
      ],
    },
    {
      id: 10,
      text: 'Which type of colleague do you most admire?',
      options: [
        'Someone who is highly skilled and efficient at practical tasks',
        'An expert who thinks deeply and brings intellectual rigour',
        'A visionary who brings fresh, creative perspectives',
        'Someone warm, empathetic, and excellent with people',
      ],
    },
    {
      id: 11,
      text: 'If you were to go back to school, which course would excite you most?',
      options: [
        'Engineering, architecture, or a vocational trade',
        'Data science, biology, philosophy, or research methods',
        'Fine arts, creative writing, film production, or music',
        'Counselling, education, social work, or public health',
      ],
    },
    {
      id: 12,
      text: 'What do you most want to be remembered for in your career?',
      options: [
        'Building something real, lasting, or technically impressive',
        'Advancing knowledge or solving important intellectual problems',
        'Creating something beautiful, meaningful, or culturally impactful',
        'Making a positive difference in people\'s lives',
      ],
    },
    {
      id: 13,
      text: 'What kind of tasks drain you most?',
      options: [
        'Sitting at a desk doing paperwork with no physical element',
        'Emotional or social work without any intellectual depth',
        'Rigid processes with no room for personal expression',
        'Isolated, solo work without human interaction',
      ],
    },
    {
      id: 14,
      text: 'Which of these activities would you choose for a team day out?',
      options: [
        'A practical challenge — building, orienteering, or craft workshops',
        'An intellectual challenge — escape room, quiz, or strategy workshop',
        'A creative challenge — improv, art class, or storytelling workshop',
        'A social challenge — community volunteering or collaborative cooking',
      ],
    },
    {
      id: 15,
      text: 'How do you define success in your career?',
      options: [
        'Mastery of a valuable, practical skill or trade',
        'Deep expertise and intellectual contribution in your field',
        'Leaving a creative legacy that reflects your unique vision',
        'The number of lives you positively touched or changed',
      ],
    },
    {
      id: 16,
      text: 'When you imagine your ideal working day, it involves:',
      options: [
        'Physical activity, tools, tangible outputs',
        'Research, analysis, independent deep work',
        'Creative projects, design decisions, and expressing your ideas',
        'Meetings, collaborations, and helping people navigate challenges',
      ],
    },
    {
      id: 17,
      text: 'Which news story would most capture your attention?',
      options: [
        'A breakthrough in renewable energy technology or construction',
        'A major scientific discovery or medical research breakthrough',
        'A new cultural movement, art exhibition, or literary prize',
        'A story about education reform or community empowerment',
      ],
    },
    {
      id: 18,
      text: 'Your friends would say your greatest quality is:',
      options: [
        'Being practical and always knowing how to fix things',
        'Being incredibly intelligent and insightful',
        'Being creative and bringing a unique perspective to everything',
        'Being caring, supportive, and always there for people',
      ],
    },
    {
      id: 19,
      text: 'When you start a new project, the first thing you focus on is:',
      options: [
        'The practical steps and resources required',
        'The research and analysis needed to understand it fully',
        'The creative vision and how it could be uniquely expressed',
        'Who it will help and how people will experience it',
      ],
    },
    {
      id: 20,
      text: 'Which career path sounds most inspiring to you?',
      options: [
        'Electrician, mechanical engineer, landscape designer, or surgeon',
        'Research scientist, data analyst, philosopher, or programmer',
        'Novelist, filmmaker, architect, or graphic designer',
        'Teacher, therapist, nurse, or charity leader',
      ],
    },
    {
      id: 21,
      text: 'What does a "great day at work" look like for you?',
      options: [
        'You built, made, or repaired something that works perfectly',
        'You solved a complex problem or understood something deeply',
        'You created something original that exceeded your own expectations',
        'You helped someone have a genuine breakthrough or positive experience',
      ],
    },
    {
      id: 22,
      text: 'When you are bored at work, what is missing?',
      options: [
        'Physical activity or practical tasks',
        'Intellectual stimulation and complex challenges',
        'Creative freedom and self-expression',
        'Human connection and collaboration',
      ],
    },
    {
      id: 23,
      text: 'In a group project, your natural role tends to be:',
      options: [
        'The builder or implementer who makes things happen practically',
        'The analyst or researcher who investigates and advises',
        'The creative who generates ideas and shapes the vision',
        'The connector who brings people together and manages relationships',
      ],
    },
    {
      id: 24,
      text: 'Which of these quotes resonates most with you?',
      options: [
        '"The best way to predict the future is to invent it."',
        '"An investment in knowledge pays the best interest."',
        '"Creativity is intelligence having fun."',
        '"The purpose of human life is to serve and to show compassion."',
      ],
    },
  ],
}
