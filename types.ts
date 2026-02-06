
export interface FBPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
  picture: string;
  tasks: string[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: 'comment' | 'message';
  keywords: string[];
  replyText: string;
  useAI: boolean;
  actionHide: boolean;
  actionLike: boolean;
  actionMention: boolean;
  active: boolean;
}

export interface ActivityLog {
  id: string;
  pageName: string;
  user: string;
  content: string;
  reply: string;
  type: 'comment' | 'message';
  timestamp: string;
  status: 'success' | 'failed';
}

export interface UserStats {
  totalReplies: number;
  totalMessages: number;
  totalComments: number;
  aiTokensUsed: number;
}
