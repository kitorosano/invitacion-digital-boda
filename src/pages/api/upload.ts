import type { APIRoute } from "astro";
import {
  BINGO_CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "astro:env/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const POST: APIRoute = async ({ request }) => {
  const { uri } = await request.json();

  try {
    const data = await cloudinary.uploader.upload(uri, {
      upload_preset: BINGO_CLOUDINARY_UPLOAD_PRESET,
    });

    const optimizedImageUrl = data.secure_url.replace(
      "/upload/",
      "/upload/c_fill,h_300,w_auto/f_auto/",
    );

    return new Response(
      JSON.stringify({
        message: "Subida de imagen exitosa",
        data: { ...data, secure_url: optimizedImageUrl },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error al subir la imagen:", error);

    return new Response(
      JSON.stringify({ message: "Error al subir la imagen" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

// TODO: also return a high resolution version of the image for detail view
