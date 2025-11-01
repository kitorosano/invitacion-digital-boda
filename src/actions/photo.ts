import { ActionError, defineAction } from "astro:actions";
import {
  BINGO_CLOUDINARY_ASSETS_PATH,
  BINGO_CLOUDINARY_UPLOAD_PRESET,
} from "astro:env/server";
import { z } from "astro:schema";
import { PHOTO_LOW_Q_TRANSFORMATIONS } from "../constants/bingo";
import { type Photo } from "../types";
import cloudinaryClient from "../utils/cloudinaryClient";

export const photo = {
  getPhotos: defineAction({
    handler: async (input, ctx) => {
      try {
        const { resources } = await cloudinaryClient.search
          .expression(`asset_folder:${BINGO_CLOUDINARY_ASSETS_PATH}/*`)
          .sort_by("public_id", "desc")
          .fields(["secure_url", "width", "height", "tags"])
          .execute();

        const photos: Photo[] = resources.map((resource: any) => {
          return {
            public_id: resource.public_id,
            secure_url: resource.secure_url.replace(
              "/upload/",
              `/upload/${PHOTO_LOW_Q_TRANSFORMATIONS}`,
            ),
            userId: resource.tags[0],
            taskId: resource.tags[1],
          };
        });

        return { photos };
      } catch (error) {
        console.error("Error fetching photos:", error);
        throw new ActionError({
          message: "Error fetching photos",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
  uploadPhoto: defineAction({
    input: z.object({
      uri: z.string(),
      taskId: z.string(),
    }),
    handler: async (input, ctx) => {
      const { uri, taskId } = input;
      try {
        const userId = ctx.cookies.get("userId")?.value ?? "anonymous";

        const data = await cloudinaryClient.uploader.upload(uri, {
          upload_preset: BINGO_CLOUDINARY_UPLOAD_PRESET,
          tags: [userId, taskId],
        });

        const uploadedPhoto: Photo = {
          userId,
          taskId,
          public_id: data.public_id,
          secure_url: data.secure_url.replace(
            "/upload/",
            "/upload/c_fill,h_300,w_auto/f_auto/",
          ),
        };

        return { photo: uploadedPhoto };
      } catch (error) {
        console.error("Error uploading photo:", error);

        throw new ActionError({
          message: "Error uploading photo",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  }),
};
