export interface ReasonStep {
  title: string;
  reason: string;
  result: string;
  err?: string;
}

export interface Conversation {
  id: string;
  problem: string;
  steps: ReasonStep[];
  finalAnswer: string;
  createdAt: string;
}

export interface Props {
  steps: ReasonStep[];
}