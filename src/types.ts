export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export type ViewState = 'home' | 'learn' | 'subjects' | 'tutorial' | 'quiz' | 'chat' | 'leaderboard';

export type Subject = {
  id: string;
  title: string;
  icon: string;
  description: string;
  videoUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
  steps: {
    title: string;
    detail: string;
    imageUrl?: string;
    audioUrl?: string;
  }[];
};

export type ServiceModule = {
  id: string;
  title: string;
  icon: string;
  description: string;
  subjects: Subject[];
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export type UserProgress = {
  name: string;
  points: number;
  level: number;
  completedModules: string[];
};
