export interface ServiceAccount {
  account_id: string;
  application: string;
  owner: string;
  last_used: string;
  evidence: string[];
  metadata: {
    ticket_id: string;
    last_activity_days: number;
    account_type: string;
  };
}

export interface ValidationResult {
  compliance: string;
  score: string;
  violations: string[];
  recommendation: string;
  explanation: string;
}

export interface EvidenceFile {
  id: string;
  name: string;
  type: 'ticket' | 'screenshot' | 'document';
  date: string;
  content: React.ReactNode;
}

export interface FeedbackData {
  positive: boolean;
  comment?: string;
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  time?: string;
} 