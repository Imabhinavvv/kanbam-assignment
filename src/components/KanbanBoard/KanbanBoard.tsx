import React, { useState } from 'react';
<<<<<<< HEAD
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import type { KanbanViewProps } from './KanbanBoard.types';
=======
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { KanbanViewProps } from './KanbanBoard.types';
>>>>>>> 6dbdbf9e90a85460432ce4b5f325bf8e3970535c
import { KanbanColumn } from './KanbanColumn';
import { useKanbanBoard } from '../../hooks/useKanbanBoard';
import { TaskModal } from './TaskModal';

export const KanbanBoard: React.FC<KanbanViewProps> = (props) => {
  const {
    columns,
    tasks,
    isAddModalOpen,
    addModalColumnId,
    isDetailModalOpen,
    selectedTask,
    selectedTasks,
    onTaskMove,
    onTaskCreate,
    onTaskUpdate,
    onTaskDelete,
    openAddModal,
    closeAddModal,
    openDetailModal,
    closeDetailModal,
    toggleTaskSelection,
  } = useKanbanBoard(props.columns, props.tasks);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id && over && active.id !== over.id) {
      const fromColumnId = active.data.current?.columnId;
      const toColumnId = over.data.current?.columnId;
      const taskId = active.id as string;
      const newIndex = over.data.current?.index;

<<<<<<< HEAD
      if (fromColumnId && toColumnId && taskId && newIndex !== undefined) {
=======
      if (fromColumnId && toColumnId && taskId && newIndex !== undefined && active.data.current && over.data.current) {
>>>>>>> 6dbdbf9e90a85460432ce4b5f325bf8e3970535c
        onTaskMove(taskId, fromColumnId, toColumnId, newIndex);
      }
    }
  };

  const filteredTasks = Object.values(tasks).filter(task => {
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query) ||
      task.assignee?.toLowerCase().includes(query) ||
      task.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const filteredTaskIds = filteredTasks.map(task => task.id);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {selectedTasks.length > 0 && (
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Bulk Actions</button>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 overflow-x-auto">
          {columns.map(column => (
            <div key={column.id} className="w-full md:w-80 flex-shrink-0 mb-4 md:mb-0">
              <KanbanColumn
                column={column}
                tasks={column.taskIds.filter(id => filteredTaskIds.includes(id)).map(id => tasks[id])}
                selectedTasks={selectedTasks}
                onAddTask={() => openAddModal(column.id)}
                onTaskClick={openDetailModal}
                onTaskSelect={toggleTaskSelection}
              />
            </div>
          ))}
        </div>
      </div>
      {isAddModalOpen && addModalColumnId && (
        <TaskModal
          onClose={closeAddModal}
          onTaskCreate={(task) => onTaskCreate(addModalColumnId, task)}
        />
      )}
      {isDetailModalOpen && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={closeDetailModal}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />
      )}
    </DndContext>
  );
};