import { Redis } from "@upstash/redis";
import { v2 as cloudinary } from "cloudinary";

if (
  !process.env.REDIS_STORAGE_KV_REST_API_URL ||
  !process.env.REDIS_STORAGE_KV_REST_API_TOKEN ||
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error(
    "Missing environment variables for Redis or Cloudinary. Aborting.",
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const redisClient = new Redis({
  url: process.env.REDIS_STORAGE_KV_REST_API_URL,
  token: process.env.REDIS_STORAGE_KV_REST_API_TOKEN,
});

async function main() {
  console.log("Clearing all users...");

  const userKeys = await redisClient.zrange("users:z", 0, -1, {});

  if (userKeys.length === 0) {
    console.log("No users found to clear.");
    return;
  }

  // Fetch all users data
  const getPipeline = redisClient.multi();
  for (const userKey of userKeys) {
    getPipeline.hgetall(userKey);
  }

  // Delete user and indexes
  const deletePipeline = redisClient.multi();
  for (const userKey of userKeys) {
    deletePipeline.del(userKey);
    deletePipeline.zrem("users:z", userKey);
  }
  const userCount = await deletePipeline.exec();

  console.log(`Deleted ${userCount.length} users from Redis.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
