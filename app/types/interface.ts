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
}

export interface MainContentProps {
  activeConversation: Conversation | null;
  onSubmit: (problem: string) => void;
  loading: boolean;
  error: string;
}

export interface InputBoxProps {
  onSubmit: (problem: string) => void;
  loading: boolean;
}

export interface HistoryItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export interface FinalAnswerProps {
  answer: string;
}
