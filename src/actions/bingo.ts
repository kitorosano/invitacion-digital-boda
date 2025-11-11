import { ActionError, defineAction } from "astro:actions";
import { getCollection } from "astro:content";
import { BINGO_CLOUDINARY_UPLOAD_PRESET } from "astro:env/server";
import { z } from "astro:schema";
import { PHOTO_LOW_Q_TRANSFORMATIONS } from "../constants/bingo";
import { type Photo, type TaskWithPhoto } from "../types";
import { validateUserId } from "../utils/actionsHelpers";
import cloudinaryClient from "../utils/cloudinaryClient";
import redisClient from "../utils/redisClient";
import { shuffleTasks } from "../utils/shuffleTasks";

export const bingo = {
  initializeTasks: defineAction({
    handler: async (input, ctx) => {
      try {
        const userId = validateUserId(ctx.cookies.get("userId")?.value);

        const optionalTasks = await getCollection("optionalTasks");
        const mandatoryTasks = await getCollection("mandatoryTasks");
        const tasksData = {
          optionalTasks: optionalTasks.map((task) => task.data),
          mandatoryTasks: mandatoryTasks.map((task) => task.data),
        };
        const tasks: TaskWithPhoto[] = shuffleTasks(
          tasksData.optionalTasks,
          tasksData.mandatoryTasks,
          userId,
        );

        const multi = redisClient.multi();
        const now = Date.now();

        for (const task of tasks) {
          const taskWithPhotoKey = `user:${userId}:task:${task.id}`;
          const order = tasks.indexOf(task) + 1;

          // get by userId and taskId
          multi.hset(taskWithPhotoKey, task);
          // get by userId
          multi.zadd(`user:${userId}:tasks:z`, {
            member: taskWithPhotoKey,
            score: order,
          });
          // get by taskId
          multi.zadd(`task:${task.id}:tasks:z`, {
            member: taskWithPhotoKey,
            score: now,
          });
          // get all tasks
          multi.zadd(`tasks:z`, {
            member: taskWithPhotoKey,
            score: now,
          });
        }
        await multi.exec();

        return { tasks };
      } catch (error) {
        console.error("Error initializing tasks:", error);
        throw new ActionError({
          message: "Error initializing tasks",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
  updateTaskWithPhoto: defineAction({
    input: z.object({
      uri: z.string(),
      taskId: z.string(),
    }),
    handler: async (input, ctx) => {
      const { uri, taskId } = input;
      try {
        const userId = validateUserId(ctx.cookies.get("userId")?.value);

        const data = await cloudinaryClient.uploader.upload(uri, {
          upload_preset: BINGO_CLOUDINARY_UPLOAD_PRESET,
          tags: [userId, taskId],
        });

        const uploadedPhoto: Photo = {
          url: data.secure_url,
          userId,
          taskId,
        };

        const taskWithPhotoKey = `user:${userId}:task:${taskId}`;

        const task = await redisClient.hgetall<TaskWithPhoto>(taskWithPhotoKey);

        const multi = redisClient.multi();
        multi.hset(taskWithPhotoKey, {
          ...task,
          photoUrl: uploadedPhoto.url,
        });
        await multi.exec();

        uploadedPhoto.url = uploadedPhoto.url.replace(
          "/upload/",
          `/upload/${PHOTO_LOW_Q_TRANSFORMATIONS}`,
        );

        return { photo: uploadedPhoto };
      } catch (error) {
        console.error("Error uploading photo:", error);

        throw new ActionError({
          message: "Ha ocurrido un error al subir la imagen.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
  getCurrentUserTasks: defineAction({
    handler: async (input, ctx) => {
      try {
        const userId = validateUserId(ctx.cookies.get("userId")?.value);

        const userTasksKey = `user:${userId}:tasks:z`;

        const taskIds: string[] = await redisClient.zrange(userTasksKey, 0, -1);
        if (taskIds.length === 0) {
          return { tasks: [] };
        }

        const multi = redisClient.multi();
        for (const taskId of taskIds) {
          multi.hgetall<TaskWithPhoto>(taskId);
        }
        const tasks: TaskWithPhoto[] = await multi.exec();

        return { tasks };
      } catch (error) {
        console.error("Error getting tasks:", error);
        throw new ActionError({
          message: "Error getting tasks",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),

  getTasksWithPhoto: defineAction({
    input: z.object({
      userId: z.string().optional(),
      taskId: z.string().optional(),
      favoritesOnly: z.boolean().optional().default(false),
      sorting: z.enum(["newest", "oldest"]).optional().default("newest"),
      page: z.number().optional().default(0),
      limit: z.number().optional().default(50),
    }),
    handler: async (input, ctx) => {
      const { userId, taskId, favoritesOnly, sorting, page, limit } = input;

      try {
        const start = page * limit;
        const stop = start + limit - 1;

        if (userId && taskId) {
          throw new ActionError({
            message: "Not implemented filtering by both userId and taskId.",
            code: "BAD_REQUEST",
          });
        }

        let taskWithPhotoKey = "tasks:z";
        if (userId) taskWithPhotoKey = `user:${userId}:tasks:z`;
        else if (taskId) taskWithPhotoKey = `task:${taskId}:tasks:z`;
        else if (favoritesOnly) taskWithPhotoKey = `tasks:favorites:z`;

        const taskWithPhotoKeys: string[] = await redisClient.zrange(
          taskWithPhotoKey,
          start,
          stop,
          { rev: sorting === "newest" },
        );

        if (taskWithPhotoKeys.length === 0) {
          return { tasksWithPhoto: [] };
        }

        const multi = redisClient.multi();
        for (const key of taskWithPhotoKeys) {
          multi.hgetall<TaskWithPhoto>(key);
        }
        const tasksWithPhoto: TaskWithPhoto[] = await multi.exec();

        if (!userId) {
          const completedTasks = tasksWithPhoto.filter((task) => task.photoUrl);
          return { tasksWithPhoto: completedTasks };
        }

        return { tasksWithPhoto };
      } catch (error) {
        console.error("Error fetching photos:", error);
        throw new ActionError({
          message: "Error fetching photos",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
};
