import { useState, useCallback } from 'react';
import type { KanbanColumn, KanbanTask } from '../components/KanbanBoard/KanbanBoard.types';

export const useKanbanBoard = (initialColumns: KanbanColumn[], initialTasks: Record<string, KanbanTask>) => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalColumnId, setAddModalColumnId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const onTaskMove = useCallback((taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => {
    const fromColumn = columns.find(c => c.id === fromColumnId);
    const toColumn = columns.find(c => c.id === toColumnId);

    if (!fromColumn || !toColumn) {
      return;
    }

    const newFromTaskIds = fromColumn.taskIds.filter(id => id !== taskId);
    const newToTaskIds = [...toColumn.taskIds];
    newToTaskIds.splice(newIndex, 0, taskId);

    setColumns(columns.map(c => {
      if (c.id === fromColumnId) {
        return { ...c, taskIds: newFromTaskIds };
      }
      if (c.id === toColumnId) {
        return { ...c, taskIds: newToTaskIds };
      }
      return c;
    }));

    setTasks(prevTasks => ({
      ...prevTasks,
      [taskId]: {
        ...prevTasks[taskId],
        status: toColumnId,
      },
    }));
  }, [columns]);

  const onTaskCreate = useCallback((columnId: string, task: KanbanTask) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [task.id]: { ...task, status: columnId },
    }));
    setColumns(columns.map(c => {
      if (c.id === columnId) {
        return { ...c, taskIds: [...c.taskIds, task.id] };
      }
      return c;
    }));
    setIsAddModalOpen(false);
  }, [columns]);

  const onTaskUpdate = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [taskId]: {
        ...prevTasks[taskId],
        ...updates,
      },
    }));
  }, []);

  const onTaskDelete = useCallback((taskId: string) => {
    const newTasks = { ...tasks };
    delete newTasks[taskId];
    setTasks(newTasks);

    setColumns(columns.map(c => ({
      ...c,
      taskIds: c.taskIds.filter(id => id !== taskId),
    })));
  }, [columns, tasks]);

  const openAddModal = (columnId: string) => {
    setAddModalColumnId(columnId);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setAddModalColumnId(null);
  };

  const openDetailModal = (task: KanbanTask) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedTask(null);
    setIsDetailModalOpen(false);
  };

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prevSelectedTasks => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter(id => id !== taskId);
      }
      return [...prevSelectedTasks, taskId];
    });
  };

  return {
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
  };
};