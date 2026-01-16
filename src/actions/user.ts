import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { DEFAULT_USERS_PER_PAGE } from "../constants/jurado";
import type { User } from "../types";
import { validateUserId } from "../utils/actionsHelpers";
import redisClient from "../utils/redisClient";

export const user = {
  saveUser: defineAction({
    input: z.object({
      name: z
        .string({
          message: "No se aceptan nombres vacíos",
        })
        .trim()
        .min(1, "No se aceptan nombres vacíos")
        .max(18, "El nombre no puede exceder los 18 caracteres"),
    }),
    handler: async (input, ctx) => {
      const { name } = input;

      try {
        const user: User = {
          id: crypto.randomUUID(),
          name,
        };

        const now = Date.now();

        const multi = redisClient.multi();
        multi.hset(`user:${user.id}`, user);
        multi.zadd("users:z", {
          member: `user:${user.id}`,
          score: now,
        });
        await multi.exec();

        ctx.cookies.set("userId", user.id, {
          path: "/",
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30 días
        });

        return { user };
      } catch (error) {
        console.error("Error saving user:", error);
        throw new ActionError({
          message: "Ha ocurrido un error al guardar el usuario.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
  getCurrentUser: defineAction({
    handler: async (input, ctx) => {
      try {
        const userId = validateUserId(ctx.cookies.get("userId")?.value);
        const user = await redisClient.hgetall<User>(`user:${userId}`);

        if (!user) {
          throw new ActionError({
            message: "User not found",
            code: "NOT_FOUND",
          });
        }

        return { user };
      } catch (error) {
        console.error("Error fetching user:", error);
        if (error instanceof ActionError) throw error;
        throw new ActionError({
          message: "Ha ocurrido un error al obtener el usuario.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
  deleteUser: defineAction({
    handler: async (input, ctx) => {
      try {
        const userId = validateUserId(ctx.cookies.get("userId")?.value);

        const multi = redisClient.multi();
        multi.del(`user:${userId}`);
        multi.zrem("users:z", `user:${userId}`);
        await multi.exec();

        ctx.cookies.delete("userId", { path: "/" });

        return { success: true };
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new ActionError({
          message: "Ha ocurrido un error al eliminar el usuario.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),

  getUsers: defineAction({
    input: z.object({
      page: z.number().optional().default(0),
      limit: z.number().optional().default(DEFAULT_USERS_PER_PAGE),
    }),
    handler: async (input, ctx) => {
      const { page, limit } = input;
      try {
        const start = page * limit;
        const stop = start + limit - 1;

        const userIds: string[] = await redisClient.zrange(
          "users:z",
          start,
          stop,
          { rev: true },
        );
        if (userIds.length === 0) return { users: [] };

        const multi = redisClient.multi();
        for (const userId of userIds) {
          multi.hgetall<User>(userId);
        }
        const userDatas: User[] = await multi.exec();
        const userCount = await redisClient.zcard("users:z");

        return { users: userDatas, totalPages: Math.ceil(userCount / limit) };
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new ActionError({
          message: "Error fetching users",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
  getUserById: defineAction({
    input: z.object({
      id: z.string().uuid(),
    }),
    handler: async (input, ctx) => {
      const { id } = input;
      try {
        const user = await redisClient.hgetall<User>(`user:${id}`);

        if (!user) {
          throw new ActionError({
            message: "User not found",
            code: "NOT_FOUND",
          });
        }

        return { user };
      } catch (error) {
        console.error("Error fetching user by id:", error);
        if (error instanceof ActionError) throw error;
        throw new ActionError({
          message: "Ha ocurrido un error al obtener el usuario.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
};
