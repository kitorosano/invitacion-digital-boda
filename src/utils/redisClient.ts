import { Redis } from "@upstash/redis";
import {
  REDIS_STORAGE_KV_REST_API_TOKEN,
  REDIS_STORAGE_KV_REST_API_URL,
} from "astro:env/server";

const redisClient = new Redis({
  url: REDIS_STORAGE_KV_REST_API_URL,
  token: REDIS_STORAGE_KV_REST_API_TOKEN,
});

export default redisClient;
