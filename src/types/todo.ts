export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
  recurrence?: 'daily' | 'weekly' | 'monthly' | null;
  pinned: boolean;
  notes?: string;
  subtasks: SubTask[];
  tags?: string[];
  project?: string;
  status?: 'todo' | 'doing' | 'done';
  estimateMinutes?: number;
  timeLogs?: { startedAt: number; stoppedAt: number | null; durationMs: number }[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}
