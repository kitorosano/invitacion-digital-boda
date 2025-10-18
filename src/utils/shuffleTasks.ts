export type Task = {
  id: string;
  text: string;
  imageId: string;
};

/**
 * Shuffles optional tasks and includes a random mandatory task.
 * @param optionalTasks - An array of optional task strings.
 * @param mandatoryTasks - An array of mandatory task strings.
 * @returns An array of Task objects representing the shuffled tasks.
 */
export const shuffleTasks = (
  optionalTasks: string[],
  mandatoryTasks: string[],
): Task[] => {
  if (optionalTasks.length === 0 || mandatoryTasks.length === 0) return [];

  const shuffledOptionalTasks = optionalTasks.sort(() => 0.5 - Math.random());
  const randomMandatoryTask =
    mandatoryTasks[Math.floor(Math.random() * mandatoryTasks.length)];

  const shuffledTasks = shuffledOptionalTasks
    .slice(0, 4)
    .concat(randomMandatoryTask)
    .concat(shuffledOptionalTasks.slice(4, 8))
    .map(
      (task) =>
        ({
          id: crypto.randomUUID(),
          text: task,
          imageId: "",
        } as Task),
    );

  return shuffledTasks;
};
