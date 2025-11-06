import React, { useState, useEffect } from 'react';
import { KanbanTask } from './KanbanBoard.types';

interface TaskModalProps {
  task?: KanbanTask;
  onClose: () => void;
  onTaskCreate?: (task: KanbanTask) => void;
  onTaskUpdate?: (taskId: string, updates: Partial<KanbanTask>) => void;
  onTaskDelete?: (taskId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onTaskCreate, onTaskUpdate, onTaskDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority || 'medium');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task && onTaskUpdate) {
      onTaskUpdate(task.id, { title, description, priority });
    } else if (onTaskCreate) {
      onTaskCreate({
        id: `task-${Date.now()}`,
        title,
        description,
        priority,
        createdAt: new Date(),
      });
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
    >
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 id="modal-title" className="text-2xl font-bold mb-4">{task ? 'Edit Task' : 'Add New Task'}</h2>
        <div id="modal-description" className="hidden">Update task details below</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high' | 'urgent')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="flex justify-between">
            <div>
              {task && onTaskDelete && (
                <button type="button" onClick={() => { onTaskDelete(task.id); onClose(); }} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                  Delete
                </button>
              )}
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded-lg">
                {task ? 'Save' : 'Add Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
