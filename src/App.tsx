import React, { useMemo, useCallback } from 'react';
import { Button } from './components/ui/Button';
import { TaskForm } from './components/TaskForm';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskCard } from './components/TaskCard';
import { useLocalStorageState } from './hooks/useLocalStorage';
import type { Task, CreateTaskPayload, TaskStatus } from './types';
import { formatDate } from './lib/utils';

export const App: React.FC = () => {
  const initial: Task[] = [
    {
      id: 't1',
      title: 'Plan Q4 roadmap',
      description: 'Define scope, milestones, and owners',
      status: 'todo',
      due: new Date().toISOString(),
      priority: 'high',
      createdAt: new Date().toISOString()
    },
    {
      id: 't2',
      title: 'Implement Kanban drag-and-drop',
      description: 'Enable intuitive task movement across columns',
      status: 'inprogress',
      due: new Date().toISOString(),
      priority: 'high',
      createdAt: new Date().toISOString()
    },
    {
      id: 't3',
      title: 'UX polish - Kanban headers',
      description: 'Align typography with brand',
      status: 'todo',
      due: new Date().toISOString(),
      priority: 'medium',
      createdAt: new Date().toISOString()
    },
    {
      id: 't4',
      title: 'Release v1.0',
      description: 'Prepare release notes and changelog',
      status: 'done',
      due: new Date().toISOString(),
      priority: 'low',
      createdAt: new Date().toISOString()
    }
  ];

  const [tasks, setTasks] = useLocalStorageState<Task[]>('tm_tasks_v1', initial);

  const addTask = useCallback((payload: CreateTaskPayload) => {
    const newTask: Task = {
      id: `t_${Date.now()}`,
      title: payload.title,
      description: payload.description,
      status: payload.status ?? 'todo',
      due: payload.due,
      priority: payload.priority ?? 'medium',
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
  }, [setTasks, tasks]);

  const moveTask = useCallback((id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, status } : t)));
  }, [setTasks]);

  const grouped = useMemo(() => {
    return {
      todo: tasks.filter(t => t.status === 'todo'),
      inprogress: tasks.filter(t => t.status === 'inprogress'),
      done: tasks.filter(t => t.status === 'done'),
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent" aria-label="Brand icon" />
            <h1 className="text-xl font-bold tracking-wide">TaskMaster Pro</h1>
          </div>
          <nav aria-label="Main navigation">
            <span className="px-3 py-2 rounded-md bg-primary-600">Dashboard</span>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        <section aria-labelledby="dashboard-title" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4" aria-label="Task List Panel">
            <div className="flex items-center justify-between mb-4">
              <h2 id="dashboard-title" className="text-lg font-semibold">Task List</h2>
              <span className="text-xs text-gray-500">Brand-aligned Kanban-ready UI</span>
            </div>
            <TaskForm onSubmit={addTask} />
            <div className="mt-4 space-y-2" aria-label="Task items list">
              {tasks.length === 0 && (
                <div className="text-sm text-gray-500">No tasks yet. Create your first task!</div>
              )}
              {['todo', 'inprogress', 'done'].map((status) => (
                <div key={status}>
                  {status === 'todo' && <div className="text-sm font-semibold mb-1">To Do</div>}
                  {status === 'inprogress' && <div className="text-sm font-semibold mb-1">In Progress</div>}
                  {status === 'done' && <div className="text-sm font-semibold mb-1">Done</div>}
                  {tasks.filter(t => t.status === status).map(t => (
                    <TaskCard key={t.id} task={t} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4" aria-label="Kanban Board Panel">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Kanban Board</h2>
              <span className="text-xs text-gray-500">Drag tasks between columns</span>
            </div>
            <KanbanBoard tasks={tasks} onMoveTask={moveTask} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
