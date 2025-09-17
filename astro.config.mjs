// @ts-check
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      WEDDING_COUPLE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      HERO_TITLE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      WEDDING_DATE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
    },
  },

  adapter: vercel(),
});
