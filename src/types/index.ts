export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  due?: string; // ISO date string
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status?: TaskStatus;
  due?: string;
  priority?: 'low'|'medium'|'high';
}
