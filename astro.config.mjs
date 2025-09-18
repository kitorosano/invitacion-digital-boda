// @ts-check
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      // Hero Section
      WEDDING_COUPLE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      HERO_TITLE: envField.string({
        default: "Nos casamos",
        context: "server",
        access: "public",
      }),
      WEDDING_DATE: envField.string({
        default: new Date().toISOString(),
        context: "server",
        access: "public",
      }),
      // Countdown Section
      COUNTDOWN_MESSAGE: envField.string({
        default: "Te esperamos para celebrar nuestra boda",
        context: "server",
        access: "public",
      }),
      // Event 1 Section
      EVENT_1_NAME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      EVENT_1_TIME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      EVENT_1_PLACE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      EVENT_1_ADDRESS: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      EVENT_1_MAP_LINK: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // Event 2 Section
      EVENT_2_NAME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      EVENT_2_TIME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      EVENT_2_PLACE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      EVENT_2_ADDRESS: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      EVENT_2_MAP_LINK: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
    },
  },

  adapter: vercel(),
});
