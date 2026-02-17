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

export interface StepViewerProps {
  steps: ReasonStep[];
}

export interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onClose: () => void;
  truncateText: (text: string, maxLength: number) => string;
}

export interface MainContentProps {
  activeConversation: Conversation | null;
  onSubmit: (problem: string) => void;
  loading: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  setInput: (input: string) => void;
}

export interface InputBoxProps {
  onSubmit: (problem: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  setInput: (input: string) => void;
}

export interface HistoryItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  truncateText: (text: string, maxLength: number) => string;
}

export interface FinalAnswerProps {
  answer: string;
}
