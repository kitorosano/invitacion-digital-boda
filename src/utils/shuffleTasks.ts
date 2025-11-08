import type { Task, TaskWithPhoto } from "../types";

/**
 * Shuffles optional tasks and includes a random mandatory task.
 * @param optionalTasks - An array of optional Task objects.
 * @param mandatoryTasks - An array of mandatory Task objects.
 * @returns An array of TaskWithImage objects representing the shuffled tasks.
 */
export const shuffleTasks = (
  optionalTasks: Task[],
  mandatoryTasks: Task[],
): TaskWithPhoto[] => {
  if (optionalTasks.length === 0 || mandatoryTasks.length === 0) return [];

  const shuffledOptionalTasks = optionalTasks.sort(() => 0.5 - Math.random());
  const randomMandatoryTask =
    mandatoryTasks[Math.floor(Math.random() * mandatoryTasks.length)];

  const shuffledTasks = shuffledOptionalTasks
    .slice(0, 4)
    .concat(randomMandatoryTask)
    .concat(shuffledOptionalTasks.slice(4, 8))
    .map((task) => {
      return { ...task, photoUrl: "" } as TaskWithPhoto;
    });

  return shuffledTasks;
};
