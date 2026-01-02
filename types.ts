
export interface ThemeCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tags?: string[];
  size?: 'small' | 'wide' | 'large';
  link: string;
}

export interface AIRecommendation {
  reasoning: string;
  suggestedCategories: string[];
}
