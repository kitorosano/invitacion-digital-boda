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
  console.log("Clearing all tasks...");

  const taskKeys = await redisClient.zrange("tasks:z", 0, -1, {});

  if (taskKeys.length === 0) {
    console.log("No tasks found to clear.");
    return;
  }

  // Fetch all tasks data
  const getPipeline = redisClient.multi();
  for (const taskKey of taskKeys) {
    getPipeline.hgetall(taskKey);
  }
  const tasks = await getPipeline.exec();

  // Delete task and indexes
  const deletePipeline = redisClient.multi();
  for (const task of tasks) {
    const userId = task.userId;
    const taskId = task.id;
    const key = `user:${userId}:task:${taskId}`;

    deletePipeline.del(key);
    deletePipeline.zrem(`user:${userId}:tasks:z`, key);
    deletePipeline.zrem(`task:${taskId}:tasks:z`, key);
    deletePipeline.zrem("tasks:z", key);
  }
  const count = await deletePipeline.exec();

  console.log(`Deleted ${count.length} tasks from Redis.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
