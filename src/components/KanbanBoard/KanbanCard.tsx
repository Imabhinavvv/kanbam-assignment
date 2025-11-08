import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
<<<<<<< HEAD
import type { KanbanTask } from './KanbanBoard.types';
=======
import { KanbanTask } from './KanbanBoard.types';
>>>>>>> 6dbdbf9e90a85460432ce4b5f325bf8e3970535c

interface KanbanCardProps {
  task: KanbanTask;
  index: number;
  columnId: string;
  isSelected: boolean;
  onClick: () => void;
  onSelect: () => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, index, columnId, isSelected, onClick, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {
      columnId,
      index,
    },
  });
  const [isHovered, setIsHovered] = useState(false);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const priorityColors = {
    low: 'bg-blue-100 text-blue-700 border-l-4 border-blue-500',
    medium: 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500',
    high: 'bg-orange-100 text-orange-700 border-l-4 border-orange-500',
    urgent: 'bg-red-100 text-red-700 border-l-4 border-red-500',
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Status: ${task.status}. Priority: ${task.priority}.`}
      aria-grabbed={isDragging}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white p-3 mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${priorityColors[task.priority || 'medium']} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm text-neutral-900 line-clamp-2">
          {task.title}
        </h4>
<<<<<<< HEAD
        <div className="flex items-center">
          {isHovered && (
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2h1V9a2 2 0 012-2h6V5a2 2 0 00-2-2H5z" />
                </svg>
              </button>
            </div>
          )}
          <input type="checkbox" checked={isSelected} onChange={onSelect} className="ml-2" />
        </div>
=======
        <input type="checkbox" checked={isSelected} onChange={onSelect} className="ml-2" />
>>>>>>> 6dbdbf9e90a85460432ce4b5f325bf8e3970535c
      </div>
      {task.description && (
        <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {task.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-neutral-100 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        {task.assignee && (
          <div className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
            {task.assignee.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      {task.dueDate && (
        <div className={`text-xs mt-2 ${new Date(task.dueDate) < new Date() ? 'text-red-600' : 'text-neutral-500'}`}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};