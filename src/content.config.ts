import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { BINGO_CONTENT_TASKS_STARTING_INDEX } from "astro:env/server";

const TaskSchema = z.object({
  id: z.string(),
  text: z.string(),
  imageId: z.string().optional().default(""),
});

const STARTING_INDEX = BINGO_CONTENT_TASKS_STARTING_INDEX;

const optionalTasks = defineCollection({
  loader: file("src/data/optional-tasks.json", {
    parser: (content) =>
      JSON.parse(content).map((taskText: string, index: number) => ({
        id: "op" + (STARTING_INDEX + index),
        text: taskText,
      })),
  }),
  schema: TaskSchema,
});

const mandatoryTasks = defineCollection({
  loader: file("src/data/mandatory-tasks.json", {
    parser: (content) =>
      JSON.parse(content).map((taskText: string, index: number) => ({
        id: "ma" + (STARTING_INDEX + index),
        text: taskText,
      })),
  }),
  schema: TaskSchema,
});

export const collections = {
  optionalTasks,
  mandatoryTasks,
};
