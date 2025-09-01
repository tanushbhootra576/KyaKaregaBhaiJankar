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
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}
