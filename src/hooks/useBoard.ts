import { BINGO_LOCAL_STORAGE_KEY } from "astro:env/client";
import { useEffect, useMemo, useState } from "react";
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

  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.photoId).length,
    [tasks],
  );
  const hasFinished = useMemo(
    () => tasks.length !== 0 && tasks.every((task) => task.photoId),
    [tasks],
  );

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

  const updateTask = (id: string, photoId: string, photoUrl: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, photoId, photoUrl } : task,
    );

    setTasks(updatedTasks);
    saveToLocalStorage(BINGO_LOCAL_STORAGE_KEY, updatedTasks);
  };

  return { tasks, completedTasksCount, hasFinished, updateTask };
};

export default useBoard;
