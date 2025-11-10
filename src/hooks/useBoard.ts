import { actions } from "astro:actions";
import { useEffect, useMemo, useState } from "react";
import type { Task, TaskWithPhoto } from "../types";

interface Props {
  optionalTasks: Task[];
  mandatoryTasks: Task[];
}

const useBoard = ({ optionalTasks, mandatoryTasks }: Props) => {
  const [tasks, setTasks] = useState<TaskWithPhoto[]>([]);

  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.photoUrl).length,
    [tasks],
  );
  const hasFinished = useMemo(
    () => tasks.length !== 0 && tasks.every((task) => task.photoUrl),
    [tasks],
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const allTasks = [...optionalTasks, ...mandatoryTasks];

      const { tasks } = await actions.getCurrentUserTasks.orThrow({ allTasks });

      if (tasks.length === 0) {
        const { tasks: newTasks } = await actions.initializeTasks.orThrow();
        setTasks(newTasks);
        return;
      }

      setTasks(tasks);
    } catch (error) {
      alert(
        "Ha ocurrido un error al cargar las tareas. Por favor, recarga la página.",
      );
    }
  };

  const updateBoard = (taskId: string, photoUrl: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, photoUrl } : task,
    );

    setTasks(updatedTasks);
  };

  return { tasks, completedTasksCount, hasFinished, updateBoard };
};

export default useBoard;
