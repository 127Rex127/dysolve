import type { TestDefinition } from './types'

export const varkTest: TestDefinition = {
  id: 'vark',
  name: 'Learning Style (VARK)',
  tagline: 'Visual, Auditory, Reading/Writing, Kinaesthetic',
  description: 'The VARK model identifies how you prefer to take in and process new information. Understanding your learning style helps you study more effectively, communicate better, and choose environments where you thrive.',
  category: 'behavioral',
  scoringMode: 'typeTest',
  typeDimensions: ['visual', 'auditory', 'reading', 'kinaesthetic'],
  timeMinutes: 6,
  icon: '📖',
  color: 'from-teal-500 to-emerald-600',
  selectCount: 12,
  typeInfo: {
    visual: {
      name: 'Visual (V)',
      emoji: '👁️',
      description: 'You learn best through visual representations — diagrams, charts, maps, colour-coding, and spatial layouts. Your mind naturally thinks in pictures and patterns. You prefer to see information before you process it.',
      strengths: [
        'Excellent spatial reasoning and visual memory',
        'Quickly grasps complex relationships when shown in diagram form',
        'Remembers faces, places, and visual layouts well',
        'Good at spotting patterns and visual inconsistencies',
        'Strong at planning and visualising outcomes',
      ],
      growthAreas: [
        'Listening-only environments (lectures, podcasts) can be challenging',
        'Large blocks of unformatted text can feel overwhelming',
        'May miss important spoken information if not also written down',
      ],
      worksWith: 'Use mind maps, flowcharts, colour-coded notes, and diagrams when studying. Convert lists into visual formats. In meetings, ask for visual summaries. Use tools like Canva or whiteboarding apps to organise information spatially.',
    },
    auditory: {
      name: 'Auditory (A)',
      emoji: '👂',
      description: 'You learn best through listening and speaking — lectures, discussions, podcasts, verbal explanations, and talking things through. Your memory is strongly tied to sound and voice. You process information deeply when you hear it.',
      strengths: [
        'Excellent at remembering spoken information',
        'Learns effortlessly from lectures, talks, and conversations',
        'Processes ideas well by talking them through with others',
        'Strong verbal communication skills',
        'Good listener who picks up on tone and nuance',
      ],
      growthAreas: [
        'Purely visual or reading-based materials may not engage you as well',
        'Noisy environments can be distracting when trying to focus',
        'May need to read information aloud to retain it effectively',
      ],
      worksWith: 'Listen to audiobooks and podcasts on topics you\'re studying. Record lectures or key notes and replay them. Study with a partner and explain concepts aloud. Use text-to-speech tools like Dysolve for written materials.',
    },
    reading: {
      name: 'Reading/Writing (R)',
      emoji: '📖',
      description: 'You learn best through reading and writing — books, articles, notes, lists, and written explanations. Words on a page are your most natural medium. You absorb information by reading it and consolidate it by writing it down.',
      strengths: [
        'Excellent at extracting information from written text',
        'Takes detailed notes naturally and refers back to them',
        'Communicates complex ideas clearly in writing',
        'Strong in academic and professional environments',
        'Good at turning information into structured outlines',
      ],
      growthAreas: [
        'Purely verbal or kinaesthetic learning environments may feel unsatisfying',
        'Visual-only information (without labels or text) can be harder to process',
        'Can over-rely on notes and underutilise practical experience',
      ],
      worksWith: 'Convert diagrams and charts into written summaries. Use structured note-taking systems (Cornell notes, outlining). Create glossaries of key terms. Read widely and write summaries after learning. Written case studies and essays are your strongest formats.',
    },
    kinaesthetic: {
      name: 'Kinaesthetic (K)',
      emoji: '🖐️',
      description: 'You learn best through doing — hands-on practice, real-world application, experiments, movement, and concrete examples. Abstract concepts only make sense once you can connect them to experience. You learn by acting, not just observing.',
      strengths: [
        'Excellent at practical, hands-on tasks',
        'Learns complex skills quickly through direct experience',
        'Problem-solves effectively in real situations',
        'Strong physical memory — your body remembers what your mind might not',
        'Thrives in workshops, labs, and active learning environments',
      ],
      growthAreas: [
        'Long lectures or heavy reading without activities can feel draining',
        'Sitting still for extended periods is challenging',
        'Abstract theory without application can be hard to retain',
      ],
      worksWith: 'Use role play, simulations, and experiments when learning new concepts. Take breaks and move between tasks. Build, create, or physically demonstrate what you\'re learning. Look for real-world examples and case studies. Learn through teaching others or doing practice projects.',
    },
  },
  questions: [
    {
      id: 1,
      text: 'When learning how to use a new piece of software, you prefer to:',
      options: [
        'Watch a video tutorial showing the interface and workflow',
        'Have someone talk you through it step by step',
        'Read the manual or documentation carefully',
        'Just open it up and try things out yourself',
      ],
    },
    {
      id: 2,
      text: 'When giving someone directions, you tend to:',
      options: [
        'Draw a map or sketch a diagram',
        'Explain verbally with landmarks ("turn left at the big tree")',
        'Write the directions down step by step',
        'Walk or drive with them to show them in person',
      ],
    },
    {
      id: 3,
      text: 'When trying to remember someone\'s name, you:',
      options: [
        'Picture their face and try to remember a visual association',
        'Repeat the name aloud or in your head several times',
        'Write it down or spell it out mentally',
        'Associate it with a physical gesture or context where you met them',
      ],
    },
    {
      id: 4,
      text: 'When you are bored in a long meeting or class, you:',
      options: [
        'Doodle, sketch diagrams, or draw out ideas',
        'Try to engage by asking questions or discussing with others',
        'Write notes or make to-do lists',
        'Fidget, tap, or find ways to move',
      ],
    },
    {
      id: 5,
      text: 'When cooking a new recipe, you prefer:',
      options: [
        'A visual recipe with lots of photos showing each step',
        'Someone telling you what to do verbally or a video to listen to',
        'A written recipe with precise measurements and instructions',
        'Improvising based on experience and tasting as you go',
      ],
    },
    {
      id: 6,
      text: 'When you want to remember something important, you:',
      options: [
        'Create a visual reminder — a chart, colour code, or image',
        'Say it aloud to yourself or tell someone else',
        'Write it down in a list or note',
        'Connect it to a physical action or place you associate with it',
      ],
    },
    {
      id: 7,
      text: 'When studying for an exam, what works best for you?',
      options: [
        'Mind maps, diagrams, and colour-coded notes',
        'Recording yourself and listening back, or discussing with friends',
        'Reading through notes and creating written summaries',
        'Practice questions, flashcards, and testing yourself repeatedly',
      ],
    },
    {
      id: 8,
      text: 'When assembling furniture or a new gadget, you:',
      options: [
        'Study the visual diagram carefully before doing anything',
        'Watch a YouTube video showing how to do it',
        'Read the written instructions from start to finish',
        'Skip the instructions and work it out as you go',
      ],
    },
    {
      id: 9,
      text: 'What kind of teacher or trainer do you find most effective?',
      options: [
        'One who uses clear visual aids, charts, and demonstrations',
        'One who explains things clearly and engagingly with stories',
        'One who provides detailed written materials and handouts',
        'One who gives you hands-on activities and practical tasks',
      ],
    },
    {
      id: 10,
      text: 'When trying to understand a complex concept, you:',
      options: [
        'Draw it out in a diagram or find a visual representation',
        'Talk it through with someone or explain it out loud to yourself',
        'Read about it from multiple sources and take notes',
        'Find a real-world example or try it yourself',
      ],
    },
    {
      id: 11,
      text: 'Your ideal way to spend a long journey is:',
      options: [
        'Watching films, looking at scenery, or drawing',
        'Listening to podcasts, music, or chatting',
        'Reading a book or writing in a journal',
        'Moving around as much as possible, games, or activities',
      ],
    },
    {
      id: 12,
      text: 'When presenting your ideas to others, you prefer to:',
      options: [
        'Use slides with strong visuals, charts, and images',
        'Talk through it conversationally — you are strongest when speaking',
        'Provide a detailed written document they can follow along',
        'Use a demo, prototype, or live example to show rather than tell',
      ],
    },
    {
      id: 13,
      text: 'If you had to learn a new language, your first choice would be:',
      options: [
        'Flashcard apps with images or visual association techniques',
        'Conversation classes or listening to native speakers',
        'Grammar books, written exercises, and vocabulary lists',
        'Immersion — living in the country or using the language in daily life',
      ],
    },
    {
      id: 14,
      text: 'After a new experience, how do you process it best?',
      options: [
        'By visualising it — replaying images and scenes in your mind',
        'By talking about it with others',
        'By writing about it — journalling or making notes',
        'By jumping into the next experience and reflecting through action',
      ],
    },
    {
      id: 15,
      text: 'When you need to make an important decision, you:',
      options: [
        'Create a visual pros and cons chart or diagram',
        'Talk it through with trusted people and listen to their perspectives',
        'Write out all the options and considerations carefully',
        'Try something out and see how it feels in practice',
      ],
    },
    {
      id: 16,
      text: 'Your ideal work environment is:',
      options: [
        'Visually organised and aesthetically pleasing — you need it to look right',
        'Collaborative and talkative — energy from people around you',
        'Quiet with good reference materials to hand',
        'Active and hands-on — you want to be doing things, not just thinking',
      ],
    },
    {
      id: 17,
      text: 'When reading a book, you most remember:',
      options: [
        'Visual scenes and imagery the text creates',
        'The rhythm and voice of the writing — how it sounds',
        'Key arguments, facts, and information you highlighted',
        'The feelings and physical sensations the events evoked',
      ],
    },
    {
      id: 18,
      text: 'The learning activity you find most effective is:',
      options: [
        'Watching a masterclass or TED Talk with good visuals',
        'A live discussion group or podcast with expert guests',
        'A well-written book or detailed online course with readings',
        'A workshop with practical exercises and real projects',
      ],
    },
    {
      id: 19,
      text: 'When you feel stuck on a problem, you:',
      options: [
        'Sketch it out or draw a diagram of the situation',
        'Call a friend and talk it through',
        'Write out all the details to organise your thinking',
        'Go for a walk or do something physical to clear your head',
      ],
    },
    {
      id: 20,
      text: 'How do you best remember a phone number you just heard?',
      options: [
        'Visualise the numbers as they would look written down',
        'Repeat it aloud several times',
        'Write it down immediately',
        'Type it or dial it right away while it\'s fresh',
      ],
    },
    {
      id: 21,
      text: 'When reviewing feedback on your work, you prefer it to be:',
      options: [
        'Annotated on the document with highlights and diagrams',
        'Given verbally in a conversation',
        'Written as a detailed report or email',
        'Given in a practical session where you work through it together',
      ],
    },
    {
      id: 22,
      text: 'The way you naturally take notes in a class or meeting is:',
      options: [
        'Drawing diagrams, mind maps, and visual summaries',
        'Not much — you focus on listening carefully',
        'Writing detailed notes, sometimes word-for-word',
        'Jotting down actions and key points to act on later',
      ],
    },
    {
      id: 23,
      text: 'If you were learning to play a sport or musical instrument, you would:',
      options: [
        'Watch videos of experts and study the form and technique visually',
        'Listen to recordings and focus on the rhythm and sound',
        'Read technique guides and study the theory first',
        'Just pick it up and start practising — learning by doing',
      ],
    },
    {
      id: 24,
      text: 'Which of these best describes how you remember a great holiday?',
      options: [
        'The colours, sights, and beautiful things you saw',
        'The sounds, music, and conversations you had',
        'The stories and details you wrote in a journal or told others',
        'The physical experiences — the food, the activities, the sensations',
      ],
    },
  ],
}
