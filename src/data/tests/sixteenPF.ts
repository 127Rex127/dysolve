import type { TestDefinition } from './types'

export const sixteenPFTest: TestDefinition = {
  id: 'sixteenPF',
  name: '16PF Personality Factor',
  tagline: '16 primary personality dimensions',
  description: 'Inspired by Raymond Cattell\'s 16 Personality Factor Questionnaire, this assessment explores your personality across key dimensions including openness, emotional stability, social boldness, and rule-consciousness. A comprehensive picture of personality goes far beyond simple type labels.',
  category: 'personality',
  scoringMode: 'likert',
  timeMinutes: 10,
  icon: '🌐',
  color: 'from-teal-500 to-cyan-600',
  selectCount: 15,
  resultBands: [
    { min: 0,  max: 14, label: 'Reserved & Conventional',  description: 'Your responses suggest a preference for structure, familiarity, and independence. You are likely reserved, rule-conscious, and self-sufficient. These traits bring reliability and consistency. Growth area: practise openness to new experiences and social engagement — even small steps out of your comfort zone build flexibility over time.', color: 'bg-sky-50',    textColor: 'text-sky-700' },
    { min: 15, max: 28, label: 'Balanced personality',      description: 'Your personality profile is balanced across most dimensions, showing flexibility between social and private, traditional and open. This adaptability is a real strength — you can function well across diverse environments and relationships.', color: 'bg-green-50',  textColor: 'text-green-700' },
    { min: 29, max: 36, label: 'Warm & Open',               description: 'Your responses suggest a warm, socially engaged, and intellectually curious personality. You tend to be emotionally expressive, open to change, and people-oriented. These traits make you engaging and adaptable. Growth area: ensure boundaries and self-care are in place to sustain your warmth.', color: 'bg-amber-50',  textColor: 'text-amber-700' },
    { min: 37, max: 45, label: 'Highly expressive & social', description: 'You scored consistently high on openness, warmth, and social engagement. You bring energy and connection to everything you do. Be mindful that this intensity can sometimes overwhelm more reserved people — calibrating your energy to the room is a powerful social skill.', color: 'bg-violet-50', textColor: 'text-violet-700' },
  ],
  questions: [
    // Warmth (Factor A)
    { id: 1, text: 'I enjoy getting to know new people and find it easy to connect with them.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 2, text: 'I feel genuinely interested in how other people\'s lives are going.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Reasoning (Factor B)
    { id: 3, text: 'I enjoy tackling abstract problems and complex intellectual challenges.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 4, text: 'I find it satisfying to think through arguments carefully rather than following my gut.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Emotional Stability (Factor C)
    { id: 5, text: 'I remain calm and composed in difficult or frustrating situations.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 6, text: 'I recover quickly from setbacks and disappointments.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Dominance (Factor E)
    { id: 7, text: 'I feel comfortable expressing my opinions even when others disagree.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 8, text: 'I naturally take charge in group situations when leadership is needed.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Liveliness (Factor F)
    { id: 9, text: 'I am enthusiastic, spontaneous, and energetic in most situations.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 10, text: 'I tend to bring energy and optimism to the groups I\'m in.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Rule-Consciousness (Factor G)
    { id: 11, text: 'I follow rules and honour commitments even when it\'s inconvenient.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 12, text: 'I feel genuinely uncomfortable breaking rules, even minor ones.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Social Boldness (Factor H)
    { id: 13, text: 'I feel comfortable in social situations and don\'t get nervous talking to new people.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 14, text: 'I enjoy being the centre of attention in social settings.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Sensitivity (Factor I)
    { id: 15, text: 'I am moved by beauty in art, music, or nature.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 16, text: 'I notice subtle emotional undercurrents in conversations and relationships.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Vigilance (Factor L)
    { id: 17, text: 'I trust most people I meet unless given reason not to.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Abstractedness (Factor M)
    { id: 18, text: 'I often find myself lost in thought or absorbed in my imagination.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Privateness (Factor N)
    { id: 19, text: 'I am open about my thoughts and feelings with people I trust.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Apprehension (Factor O)
    { id: 20, text: 'I rarely second-guess myself or feel like I haven\'t done enough.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Openness to Change (Factor Q1)
    { id: 21, text: 'I enjoy trying new approaches and questioning established ways of doing things.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Self-Reliance (Factor Q2)
    { id: 22, text: 'I prefer working with a group rather than doing things independently.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Perfectionism (Factor Q3)
    { id: 23, text: 'I hold myself to high standards and like to be well-organised.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    // Tension (Factor Q4)
    { id: 24, text: 'I am generally relaxed and free from tension or frustration.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },

    { id: 25, text: 'I find change energising rather than stressful.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 26, text: 'I am naturally curious about ideas outside my usual field of experience.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 27, text: 'I think carefully before saying things that might upset others.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 28, text: 'I feel a sense of purpose and direction in my life overall.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 29, text: 'I tend to see the positive side even in difficult situations.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
    { id: 30, text: 'I enjoy discussing ideas and hearing a range of different perspectives.', options: ['Not like me at all', 'Slightly like me', 'Moderately like me', 'Very much like me'] },
  ],
}
