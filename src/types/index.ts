export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  current_role: string;
  experience_level: string;
  resume: string | null;
  onboarding_complete: boolean;
  created_at: string;
}

export interface Interview {
  id: number;
  job_title: string;
  job_description: string;
  created_at: string;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface Evaluation {
  overall_score: number;
  metrics: {
    technical_competence: number;
    communication_skills: number;
    problem_solving: number;
  };
  strengths: string[];
  areas_for_improvement: string[];
  detailed_feedback: string;
}

export interface MockSession {
  id: number;
  interview: number;
  vapi_call_id: string;
  status: string;
  duration_seconds: number;
  transcript: TranscriptEntry[] | string;
  evaluation: Evaluation | null;
  started_at: string;
  ended_at: string;
}

export interface TranscriptEntry {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}
