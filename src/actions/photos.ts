import { ActionError, defineAction } from "astro:actions";
import { PHOTOS_CLOUDINARY_UPLOAD_PRESET } from "astro:env/server";
import { z } from "astro:schema";
import { PhotoTags, type Photo } from "../types";
import cloudinaryClient from "../utils/cloudinaryClient";
import redisClient from "../utils/redisClient";

export const photos = {
  uploadPhoto: defineAction({
    input: z.object({
      uri: z.string(),
      photoTag: z.enum([PhotoTags.SIGNATURES, PhotoTags.PARTY]),
      message: z.string(),
    }),
    handler: async (input, ctx) => {
      const { uri, photoTag, message } = input;
      try {
        const data = await cloudinaryClient.uploader.upload(uri, {
          upload_preset: PHOTOS_CLOUDINARY_UPLOAD_PRESET,
          tags: [photoTag],
        });

        const id = crypto.randomUUID();

        const uploadedPhoto: Photo = {
          id,
          url: data.secure_url,
          tag: photoTag,
          message,
        };

        const photoKey = `photo:${photoTag}:${id}`;
        const existingPhoto = await redisClient.hgetall<Photo>(photoKey);

        const multi = redisClient.multi();
        if (existingPhoto) {
          multi.hset(photoKey, {
            ...existingPhoto,
            url: uploadedPhoto.url,
            message: uploadedPhoto.message,
          });
        } else {
          multi.hset(photoKey, uploadedPhoto);
          multi.zadd(`photos:${photoTag}:z`, {
            member: photoKey,
            score: Date.now(),
          });
        }
        await multi.exec();

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

  getPhotosByTag: defineAction({
    input: z.object({
      tag: z.string(),
      page: z.number().optional().default(0),
      limit: z.number().optional().default(1000),
    }),
    handler: async (input, ctx) => {
      const { tag, page, limit } = input;

      try {
        const start = page * limit;
        const stop = start + limit - 1;

        let photosKey = `photos:${tag}:z`;

        const photosKeys: string[] = await redisClient.zrange(
          photosKey,
          start,
          stop,
        );

        if (photosKeys.length === 0) {
          return { photos: [] };
        }

        const multi = redisClient.multi();
        for (const key of photosKeys) {
          multi.hgetall<Photo>(key);
        }
        const photos: Photo[] = await multi.exec();

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
};
