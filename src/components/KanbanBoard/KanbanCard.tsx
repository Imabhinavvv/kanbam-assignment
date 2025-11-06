import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { KanbanTask } from './KanbanBoard.types';

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
        <input type="checkbox" checked={isSelected} onChange={onSelect} className="ml-2" />
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