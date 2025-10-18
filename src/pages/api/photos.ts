import type { APIRoute } from "astro";
import {
  BINGO_CLOUDINARY_ASSETS_PATH,
  CLOUDINARY_API_SECRET,
  PUBLIC_CLOUDINARY_API_KEY,
  PUBLIC_CLOUDINARY_CLOUD_NAME,
} from "astro:env/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: PUBLIC_CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const GET: APIRoute = async () => {
  try {
    const { resources } = await cloudinary.search
      .expression(`asset_folder:${BINGO_CLOUDINARY_ASSETS_PATH}/*`)
      .sort_by("public_id", "desc")
      .fields(["secure_url", "width", "height"])
      .max_results(500)
      .execute();

    const optimizedResources = resources.map((resource: any) => {
      return {
        ...resource,
        secure_url: resource.secure_url.replace(
          "/upload/",
          "/upload/c_fill,h_600,w_auto/f_auto/",
        ),
      };
    });

    return new Response(
      JSON.stringify({
        resources: optimizedResources,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching Cloudinary assets:", error);

    return new Response(
      JSON.stringify({ message: "Error fetching Cloudinary assets" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
