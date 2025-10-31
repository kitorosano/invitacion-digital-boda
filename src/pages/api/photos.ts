import type { APIRoute } from "astro";
import {
  BINGO_CLOUDINARY_ASSETS_PATH,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "astro:env/server";
import { v2 as cloudinary } from "cloudinary";
import type { Photo } from "../../types";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const MAX_RESULTS = 13; // TODO: temporary limit for testing

export const GET: APIRoute = async () => {
  try {
    const { resources } = await cloudinary.search
      .expression(`asset_folder:${BINGO_CLOUDINARY_ASSETS_PATH}/*`)
      .sort_by("public_id", "desc")
      .fields(["secure_url", "width", "height", "tags"])
      .max_results(MAX_RESULTS)
      .execute();

    const optimizedResources: Photo[] = resources.map((resource: any) => {
      return {
        public_id: resource.public_id,
        secure_url: resource.secure_url.replace(
          "/upload/",
          "/upload/c_fill,h_600,w_auto/f_auto/",
        ),
        userId: resource.tags[0],
      };
    });

    return new Response(JSON.stringify({ resources: optimizedResources }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
