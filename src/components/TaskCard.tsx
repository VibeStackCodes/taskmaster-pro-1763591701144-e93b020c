import React from 'react';
import type { Task } from '@/types';
import { formatDate } from '@/lib/utils';

export const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="bg-white border rounded p-3 shadow-sm mb-2" role="article" aria-label={`Task ${task.title}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-sm text-gray-800">{task.title}</span>
        {task.due ? (
          <span className="text-xs text-gray-500" aria-label={`Due date ${task.due}`}>
            {formatDate(task.due)}
          </span>
        ) : null}
      </div>
      {task.description && <p className="text-sm text-gray-700 mb-1">{task.description}</p>}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{task.priority ?? 'medium'} priority</span>
        <span className="capitalize">{task.status}</span>
      </div>
    </div>
  );
};
