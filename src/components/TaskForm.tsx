import React, { useCallback, useState } from 'react';
import type { CreateTaskPayload, TaskStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';

export interface TaskFormProps {
  onSubmit: (payload: CreateTaskPayload) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState<string>('');
  const [priority, setPriority] = useState<'low'|'medium'|'high'>('medium');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }
    setError('');
    onSubmit({ title: title.trim(), description: description.trim() || undefined, due: due || undefined, priority, status });
    setTitle('');
    setDescription('');
    setDue('');
    setPriority('medium');
    setStatus('todo');
  }, [title, description, due, priority, status, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Add new task">
      <div className="flex flex-col">
        <label className="text-sm mb-1">Title</label>
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Due date</label>
        <input
          type="date"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={due}
          onChange={e => setDue(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:col-span-2">
        <label className="text-sm mb-1">Description</label>
        <textarea
          className="border rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Optional description"
          rows={2}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Priority</label>
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={priority}
          onChange={e => setPriority(e.target.value as 'low'|'medium'|'high')}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Status</label>
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={status}
          onChange={e => setStatus(e.target.value as TaskStatus)}
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      {error && <div className={cn('col-span-2 text-sm text-red-600')}>{error}</div>}
      <div className="col-span-2 flex items-end">
        <Button type="submit" variant="primary" aria-label="Add task">Add Task</Button>
      </div>
    </form>
  );
};
