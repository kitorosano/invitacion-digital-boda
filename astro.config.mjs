// @ts-check
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      // Global
      SITE_TITLE: envField.string({
        default: "Invitación de boda",
        context: "server",
        access: "public",
      }),
      WEDDING_COUPLE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      WEDDING_DATE: envField.string({
        default: new Date().toISOString(),
        context: "server",
        access: "public",
      }),
      DATE_TIMEZONE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // Hero Section
      HERO_TITLE: envField.string({
        default: "Nos casamos",
        context: "server",
        access: "public",
      }),
      // Invitation Section
      INVITATION_MESSAGE: envField.string({
        default: "Nos casamos y nos encantaría que nos acompañaras",
        context: "server",
        access: "public",
      }),
      // Schedule Section
      SCHEDULE_TITLE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      SCHEDULE_START_DATE: envField.string({
        default: new Date().toISOString(),
        context: "server",
        access: "public",
      }),
      SCHEDULE_END_DATE: envField.string({
        default: new Date().toISOString(),
        context: "server",
        access: "public",
      }),
      SCHEDULE_DETAILS: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      SCHEDULE_LOCATION: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // Quote Section
      QUOTE_TEXT: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      QUOTE_FOOTER: envField.string({
        default: "",
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
