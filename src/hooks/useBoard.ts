import { BINGO_LOCAL_STORAGE_KEY } from "astro:env/client";
import { useEffect, useState } from "react";
import type { Task, TaskWithImage } from "../types";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import { shuffleTasks } from "../utils/shuffleTasks";

interface Props {
  optionalTasks: Task[];
  mandatoryTasks: Task[];
}

const useBoard = ({ optionalTasks, mandatoryTasks }: Props) => {
  const [tasks, setTasks] = useState<TaskWithImage[]>([]);
  const completedTasksCount = tasks.filter((task) => task.imageId).length;
  const hasFinished = tasks.length !== 0 && tasks.every((task) => task.imageId);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const storedTasks = loadFromLocalStorage<TaskWithImage[]>(
      BINGO_LOCAL_STORAGE_KEY,
    ); // TODO: Save in redis instead of localStorage because of buggy behavior when fast uploads.
    const initialTasks =
      storedTasks || shuffleTasks(optionalTasks, mandatoryTasks);

    setTasks(initialTasks);
  };

  const updateTask = (taskId: string, imageId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, imageId } : task,
    );

    setTasks(updatedTasks);
    saveToLocalStorage(BINGO_LOCAL_STORAGE_KEY, updatedTasks);
  };

  return { tasks, completedTasksCount, hasFinished, updateTask };
};

export default useBoard;
