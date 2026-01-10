import { Module } from "@/types";

export const modules: Module[] = [
  {
    id: "interview",
    title: "The Interview Ace",
    subtitle: "Master Professional Conversations",
    description: "Learn to present yourself with confidence, answer tough questions, and leave a lasting impression.",
    icon: "Briefcase",
    color: "from-blue-500 to-indigo-600",
    progress: 0,
    lessons: [
      {
        id: "intro-1",
        title: "The Perfect Introduction",
        description: "Master the art of 'Tell me about yourself'",
        tips: [
          "Start with a compelling hook that grabs attention",
          "Keep your introduction under 90 seconds",
          "Structure: Present → Past → Future",
          "End with why you're excited about this opportunity",
          "Practice until it feels natural, not rehearsed"
        ],
        duration: "5 min"
      },
      {
        id: "intro-2",
        title: "The Elevator Pitch",
        description: "You have 60 seconds to impress. Go.",
        tips: [
          "Lead with your unique value proposition",
          "Use concrete numbers and achievements",
          "Tailor your pitch to your audience",
          "End with a call to action",
          "Practice in front of a mirror"
        ],
        duration: "4 min"
      },
      {
        id: "intro-3",
        title: "Handling Tough Questions",
        description: "Turn challenges into opportunities",
        tips: [
          "Take a breath before answering",
          "Use the STAR method for behavioral questions",
          "It's okay to ask for clarification",
          "Be honest about what you don't know",
          "Always end on a positive note"
        ],
        duration: "6 min"
      }
    ]
  },
  {
    id: "group-discussion",
    title: "The Boardroom Leader",
    subtitle: "Command Group Dynamics",
    description: "Excel in group discussions, team meetings, and collaborative decision-making sessions.",
    icon: "Users",
    color: "from-blue-500 to-cyan-600",
    progress: 0,
    lessons: [
      {
        id: "gd-1",
        title: "Making Your Voice Heard",
        description: "Stand out without overshadowing others",
        tips: [
          "Enter the discussion early to establish presence",
          "Build on others' points rather than ignoring them",
          "Use inclusive language: 'we' instead of 'I'",
          "Maintain eye contact with multiple participants",
          "Summarize key points to show active listening"
        ],
        duration: "5 min"
      },
      {
        id: "gd-2",
        title: "Conflict Resolution",
        description: "Navigate disagreements gracefully",
        tips: [
          "Acknowledge different perspectives",
          "Focus on ideas, not personalities",
          "Find common ground before addressing differences",
          "Use 'Yes, and...' instead of 'No, but...'",
          "Propose solutions rather than dwelling on problems"
        ],
        duration: "6 min"
      },
      {
        id: "gd-3",
        title: "Leadership Without Authority",
        description: "Guide discussions naturally",
        tips: [
          "Be the first to speak up when there's silence",
          "Invite quieter members to share their views",
          "Keep track of time and agenda",
          "Summarize discussions at key moments",
          "Steer conversations back on track diplomatically"
        ],
        duration: "5 min"
      }
    ]
  },
  {
    id: "debate",
    title: "The Master Debater",
    subtitle: "The Art of Persuasion",
    description: "Construct compelling arguments, counter opposing views, and persuade any audience.",
    icon: "Scale",
    color: "from-purple-500 to-pink-600",
    progress: 0,
    lessons: [
      {
        id: "debate-1",
        title: "Building Strong Arguments",
        description: "Structure that convinces",
        tips: [
          "Start with your strongest point",
          "Use the Claim-Evidence-Reasoning structure",
          "Anticipate counterarguments",
          "Use rhetorical questions strategically",
          "End with a memorable closing statement"
        ],
        duration: "6 min"
      },
      {
        id: "debate-2",
        title: "The Art of Rebuttal",
        description: "Counter without conflict",
        tips: [
          "Listen fully before formulating your response",
          "Acknowledge valid points in opposing arguments",
          "Attack the argument, not the person",
          "Use evidence to support your rebuttal",
          "Stay calm and composed under pressure"
        ],
        duration: "5 min"
      },
      {
        id: "debate-3",
        title: "Emotional Intelligence in Debate",
        description: "Persuade with empathy",
        tips: [
          "Read the room and adjust your tone",
          "Use stories to connect emotionally",
          "Show genuine respect for opponents",
          "Balance logic with passion",
          "Know when to concede gracefully"
        ],
        duration: "5 min"
      }
    ]
  }
];

export const interviewQuestions = [
  {
    question: "Tell me about yourself",
    approach: "Use the Present-Past-Future framework. Start with your current role, highlight relevant past experiences, and express enthusiasm for the future opportunity.",
    example: "I'm currently a marketing specialist with 3 years of experience in digital campaigns. Previously, I led successful product launches at a startup. I'm excited about this role because..."
  },
  {
    question: "What's your greatest weakness?",
    approach: "Choose a genuine weakness you're actively improving. Show self-awareness and growth mindset.",
    example: "I used to struggle with delegation, wanting to handle everything myself. I've been working on this by setting clear expectations and trusting my team more."
  },
  {
    question: "Why should we hire you?",
    approach: "Connect your unique skills to their specific needs. Use concrete examples and express genuine enthusiasm.",
    example: "My combination of technical expertise and client-facing experience positions me perfectly to bridge your engineering and customer success teams."
  },
  {
    question: "Where do you see yourself in 5 years?",
    approach: "Show ambition while demonstrating commitment to the company. Align your goals with the role's trajectory.",
    example: "I see myself growing into a leadership position where I can mentor others while contributing to strategic initiatives."
  },
  {
    question: "Why are you leaving your current job?",
    approach: "Stay positive. Focus on what you're moving toward, not what you're running from.",
    example: "I've learned a lot in my current role, but I'm ready for new challenges and opportunities to grow that align with my long-term career goals."
  }
];
