import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { KanbanColumn as KanbanColumnType, KanbanTask } from './KanbanBoard.types';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: KanbanTask[];
  selectedTasks: string[];
  onAddTask: () => void;
  onTaskClick: (task: KanbanTask) => void;
  onTaskSelect: (taskId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, selectedTasks, onAddTask, onTaskClick, onTaskSelect }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      columnId: column.id,
    },
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isWipLimitReached = column.maxTasks && tasks.length >= column.maxTasks;
  const isApproachingWipLimit = column.maxTasks && tasks.length / column.maxTasks >= 0.8;

  const columnBgColor = isWipLimitReached
    ? 'bg-red-100'
    : isApproachingWipLimit
    ? 'bg-yellow-100'
    : 'bg-neutral-100';

  return (
    <div
      ref={setNodeRef}
      role="region"
      aria-label={`${column.title} column. ${tasks.length} tasks.`}
      className={`w-80 ${columnBgColor} rounded-xl shadow-md flex flex-col ${isCollapsed ? 'h-16' : ''}`}>
      <div className="p-4 font-semibold text-lg text-neutral-700 border-b-2 flex justify-between items-center" style={{borderColor: column.color}}>
        <div className="flex items-center">
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform ${isCollapsed ? 'transform -rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <span>{column.title}</span>
          <span className="text-sm text-neutral-500 ml-2">{tasks.length} / {column.maxTasks || '∞'}</span>
        </div>
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-neutral-500 hover:text-neutral-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Rename</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Set WIP Limit</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</a>
            </div>
          )}
        </div>
      </div>
      {!isCollapsed && (
        <>
          <div className="p-2 flex-grow overflow-y-auto">
            {tasks.map((task, index) => (
              <KanbanCard
                key={task.id}
                task={task}
                index={index}
                columnId={column.id}
                isSelected={selectedTasks.includes(task.id)}
                onClick={() => onTaskClick(task)}
                onSelect={() => onTaskSelect(task.id)}
              />
            ))}
          </div>
          <div className="p-2">
            <button onClick={onAddTask} className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg">+ Add Task</button>
          </div>
        </>
      )}
    </div>
  );
};