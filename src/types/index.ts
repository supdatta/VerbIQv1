export interface AnalysisResult {
  detected_emotion: string;
  confidence_score: string;
  pause_ratio?: string;
  feedback: string[];
  grade?: string;
  transcription?: string;
  technical_stats?: {
    raw_pause_ratio: string;
    local_model_guess: string;
  };
  metrics?: {
    clarity: number;
    pacing: number;
    tone_match: number;
    engagement: number;
  };
}

export interface User {
  username: string;
  isAuthenticated: boolean;
  isPremium: boolean;
  history?: HistoryItem[];
}

export interface HistoryItem {
  id: string;
  moduleId: string;
  moduleTitle: string;
  lessonTitle: string;
  date: string;
  result: AnalysisResult;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  tips: string[];
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  progress: number;
}

export type ContextType = "Interview" | "Group Discussion" | "Debate" | string;
