import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import redisClient from "../utils/redisClient";

type User = { id: string; username: string };

export const server = {
  registerUser: defineAction({
    input: z.object({
      username: z
        .string({
          message: "No se aceptan nombres vacíos",
        })
        .trim()
        .min(1, "No se aceptan nombres vacíos")
        .max(18, "El nombre no puede exceder los 18 caracteres"),
    }),
    handler: async (input, ctx) => {
      const { username } = input;
      const userId = crypto.randomUUID();

      try {
        await redisClient.hset(`users:${userId}`, { username });


        ctx.cookies.set("userId", userId, {
          path: "/",
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30 días
        });

        const user: User = {
          id: userId,
          username,
        };

        return { user };
      } catch (error) {
        console.error("Error registering user:", error);
        throw new ActionError({
          message: "Ha ocurrido un error al registrar el usuario.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
  getUserById: defineAction({
    handler: async (input, ctx) => {
      try {
        const userId = ctx.cookies.get("userId")?.value ?? "-1";
        const foundUser = await redisClient.hgetall(`users:${userId}`);

        if (!foundUser) {
          throw new ActionError({
            message: "User not found",
            code: "NOT_FOUND",
          });
        }

        const user: User = {
          id: userId,
          username: foundUser.username as string,
        };

        return { user };
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new ActionError({
          message: "Error fetching user",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
};
