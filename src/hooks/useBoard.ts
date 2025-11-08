import { BINGO_LOCAL_STORAGE_KEY } from "astro:env/client";
import { useEffect, useState } from "react";
import type { Task, TaskWithPhoto } from "../types";
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
  const [tasks, setTasks] = useState<TaskWithPhoto[]>([]);
  const completedTasksCount = tasks.filter((task) => task.photoUrl).length;
  const hasFinished =
    tasks.length !== 0 && tasks.every((task) => task.photoUrl);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const storedTasks = loadFromLocalStorage<TaskWithPhoto[]>(
      BINGO_LOCAL_STORAGE_KEY,
    ); // TODO: Save in redis instead of localStorage because of buggy behavior when fast uploads.
    const initialTasks =
      storedTasks || shuffleTasks(optionalTasks, mandatoryTasks);

    setTasks(initialTasks);
  };

  const updateTask = (taskId: string, photoUrl: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, photoUrl } : task,
    );

    setTasks(updatedTasks);
    saveToLocalStorage(BINGO_LOCAL_STORAGE_KEY, updatedTasks);
  };

  return { tasks, completedTasksCount, hasFinished, updateTask };
};

export default useBoard;
