import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { BINGO_CONTENT_TASKS_STARTING_INDEX } from "astro:env/server";
import type { Task } from "./types";

const TaskSchema = z.object({
  id: z.string(),
  description: z.string(),
});

const STARTING_INDEX = BINGO_CONTENT_TASKS_STARTING_INDEX;

const optionalTasks = defineCollection({
  loader: file("src/data/optional-tasks.json", {
    parser: (content) =>
      JSON.parse(content).map((description: string, index: number) => {
        return {
          id: "op" + (STARTING_INDEX + index),
          description: description,
        } as Task;
      }),
  }),
  schema: TaskSchema,
});

const mandatoryTasks = defineCollection({
  loader: file("src/data/mandatory-tasks.json", {
    parser: (content) =>
      JSON.parse(content).map((description: string, index: number) => {
        return {
          id: "ma" + (STARTING_INDEX + index),
          description: description,
        } as Task;
      }),
  }),
  schema: TaskSchema,
});

export const collections = {
  optionalTasks,
  mandatoryTasks,
};
