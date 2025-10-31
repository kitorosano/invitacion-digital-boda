import { ActionError, defineAction } from "astro:actions";
import { BINGO_CLOUDINARY_ASSETS_PATH } from "astro:env/server";
import { z } from "astro:schema";
import type { Photo, User } from "../types";
import cloudinaryClient from "../utils/cloudinaryClient";
import redisClient from "../utils/redisClient";

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
  getUser: defineAction({
    handler: async (input, ctx) => {
      try {
        const userId = ctx.cookies.get("userId")?.value ?? "-1";
        const foundUser = await redisClient.hgetall(`users:${userId}`);

        if (!foundUser) {
          console.log("User not found on redis cache");
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
  unregisterUser: defineAction({
    handler: async (input, ctx) => {
      try {
        const userId = ctx.cookies.get("userId")?.value ?? "-1";
        await redisClient.del(`users:${userId}`);

        ctx.cookies.delete("userId", { path: "/" });
        return { success: true };
      } catch (error) {
        console.error("Error unregistering user:", error);
        throw new ActionError({
          message: "Error unregistering user",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),

  getPhotos: defineAction({
    handler: async (input, ctx) => {
      const MAX_RESULTS = 13; // TODO: temporary limit for testing
      try {
        const { resources } = await cloudinaryClient.search
          .expression(`asset_folder:${BINGO_CLOUDINARY_ASSETS_PATH}/*`)
          .sort_by("public_id", "desc")
          .fields(["secure_url", "width", "height", "tags"])
          .max_results(MAX_RESULTS)
          .execute();

        const photos: Photo[] = resources.map((resource: any) => {
          return {
            public_id: resource.public_id,
            secure_url: resource.secure_url.replace(
              "/upload/",
              "/upload/c_fill,h_600,w_auto/f_auto/",
            ),
            userId: resource.tags[0],
          };
        });

        return { photos };
      } catch (error) {
        // console.error("Error fetching photos:", error);
        throw new ActionError({
          message: "Error fetching photos",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
};
