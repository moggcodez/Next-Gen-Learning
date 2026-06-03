export interface Course {
  id: string;
  title: string;
  progress: number; // 0 to 100
  icon_name: string; // Dynamic Lucide Icon name
  created_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
  badge?: string;
}

export interface ActivityDay {
  date: string;
  count: number; // study hours or task completions
  level: 0 | 1 | 2 | 3 | 4; // heatmap coloring intensity
}

export interface AnalyticsStats {
  totalHours: number;
  completedCourses: number;
  currentStreak: number;
  weeklyGoalProgress: number; // progress percentage towards weekly goal
}

export interface Insight {
  id: string;
  type: 'recommendation' | 'goal' | 'summary' | 'suggestion';
  title: string;
  description: string;
  category: string;
  meta?: string;
}
