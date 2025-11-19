import React from 'react';
import type { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';

export interface KanbanBoardProps {
  tasks: Task[];
  onMoveTask: (id: string, status: TaskStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onMoveTask }) => {
  const columns: { key: TaskStatus; label: string }[] = [
    { key: 'todo', label: 'To Do' },
    { key: 'inprogress', label: 'In Progress' },
    { key: 'done', label: 'Done' },
  ];

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) onMoveTask(id, status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {columns.map(col => (
        <div
          key={col.key}
          className="border rounded p-2 min-h-[180px] bg-white"
          onDragOver={e => e.preventDefault()}
          onDrop={e => handleDrop(e, col.key)}
          aria-label={`${col.label} column`}            
        >
          <div className="text-sm font-semibold mb-2 px-1">{col.label}</div>
          <div className="flex flex-col gap-2 px-1" role="region" aria-label={`${col.label} tasks`}>
            {tasks.filter(t => t.status === col.key).map(t => (
              <div key={t.id} draggable onDragStart={e => e.dataTransfer.setData('text/plain', t.id)}>
                <TaskCard task={t} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
