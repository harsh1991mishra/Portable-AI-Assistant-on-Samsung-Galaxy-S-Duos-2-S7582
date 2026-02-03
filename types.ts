
export enum AppView {
  OVERVIEW = 'OVERVIEW',
  GUIDE = 'GUIDE',
  DEMO = 'DEMO',
  SHOWCASE = 'SHOWCASE'
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  details: string[];
  tips: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  sources?: GroundingSource[];
}
