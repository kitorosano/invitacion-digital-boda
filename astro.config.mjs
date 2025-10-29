// @ts-check
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import favicons from "astro-favicons";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [favicons(), react()],
  devToolbar: { enabled: false },
  env: {
    schema: {
      // ## Invitation
      // Global
      INVITATION_SITE_TITLE: envField.string({
        default: "Invitación de boda",
        context: "server",
        access: "public",
      }),
      INVITATION_SITE_ENTRYPOINT_CEREMONY: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_SITE_ENTRYPOINT_CIVIL: envField.string({
        default: "civil",
        context: "server",
        access: "public",
      }),
      INVITATION_WEDDING_COUPLE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_WEDDING_DATE: envField.string({
        default: new Date().toISOString(),
        context: "server",
        access: "public",
      }),
      INVITATION_DATE_TIMEZONE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // BGM
      INVITATION_BGM_IS_ENABLED: envField.boolean({
        default: false,
        context: "server",
        access: "public",
      }),
      INVITATION_BGM_VOLUME: envField.number({
        default: 0.3,
        context: "server",
        access: "public",
      }),
      // Hero Section
      INVITATION_HERO_TITLE: envField.string({
        default: "Nos casamos",
        context: "server",
        access: "public",
      }),
      // Invitation Section
      INVITATION_MESSAGE_SEPARATOR_TEXT: envField.string({
        default: "Nos casamos y nos encantaría que nos acompañaras",
        context: "server",
        access: "public",
      }),
      // Schedule Section
      INVITATION_SCHEDULE_TITLE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_SCHEDULE_START_DATE: envField.string({
        default: new Date().toISOString(),
        context: "server",
        access: "public",
      }),
      INVITATION_SCHEDULE_END_DATE: envField.string({
        default: new Date().toISOString(),
        context: "server",
        access: "public",
      }),
      INVITATION_SCHEDULE_DETAILS: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_SCHEDULE_LOCATION: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_SCHEDULE_DOWNLOAD_FILENAME: envField.string({
        default: "evento-boda",
        context: "server",
        access: "public",
      }),
      // Quote Section
      INVITATION_QUOTE_SEPARATOR_TEXT: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_QUOTE_SEPARATOR_FOOTER: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // Event 1 Section
      INVITATION_EVENT_1_NAME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_EVENT_1_TIME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_EVENT_1_PLACE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_EVENT_1_ADDRESS: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_EVENT_1_MAP_LINK: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // Event 2 Section
      INVITATION_EVENT_2_NAME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_EVENT_2_TIME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_EVENT_2_PLACE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_EVENT_2_ADDRESS: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_EVENT_2_MAP_LINK: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // RSVP Section
      INVITATION_RSVP_API_URL: envField.string({
        default: "",
        context: "server",
        access: "secret",
      }),
      INVITATION_RSVP_SUCCESS_MESSAGE: envField.string({
        default: "¡Gracias por confirmar tu reserva!",
        context: "server",
        access: "public",
      }),
      INVITATION_RSVP_ERROR_MESSAGE: envField.string({
        default:
          "Lo sentimos, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.",
        context: "server",
        access: "public",
      }),
      INVITATION_RSVP_IS_AVAILABLE: envField.boolean({
        default: true,
        context: "server",
        access: "public",
      }),
      INVITATION_RSVP_DEADLINE: envField.string({
        default: "", // Formato: YYYY-MM-DD
        context: "server",
        access: "public",
      }),
      // Dress Code Section
      INVITATION_DRESS_CODE_MESSAGE: envField.string({
        default: "Les pedimos de favor a los invitados evitar estos colores:",
        context: "server",
        access: "public",
      }),
      INVITATION_DRESS_CODE_COLORS_TO_AVOID: envField.string({
        default: "", // Colores separados por comas
        context: "server",
        access: "public",
      }),
      // Bank Account Section
      INVITATION_BANK_ACCOUNT_MESSAGE: envField.string({
        default:
          "Lo más importante es tu presencia, pero si deseas hacernos un regalo aquí tienes nuestros datos.",
        context: "server",
        access: "public",
      }),
      INVITATION_BANK_DETAIL_1_NAME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_BANK_DETAIL_1_ACCOUNT_TYPE: envField.string({
        default: "C.A.",
        context: "server",
        access: "public",
      }),
      INVITATION_BANK_DETAIL_1_ACCOUNT_NUMBER: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_BANK_DETAIL_1_ACCOUNT_HOLDER: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_BANK_DETAIL_2_NAME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_BANK_DETAIL_2_ACCOUNT_TYPE: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_BANK_DETAIL_2_ACCOUNT_NUMBER: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      INVITATION_BANK_DETAIL_2_ACCOUNT_HOLDER: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // Footer Section
      INVITATION_FOOTER_MESSAGE_TEXT: envField.string({
        default: "Te esperamos",
        context: "server",
        access: "public",
      }),

      // ## Bingo
      // Global
      BINGO_SITE_TITLE: envField.string({
        default: "Bingo Boda",
        context: "server",
        access: "public",
      }),
      BINGO_SITE_ENTRYPOINT: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      BINGO_SITE_ENTRYPOINT_JUDGES: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // Board
      BINGO_OPTIONAL_TASKS: envField.string({
        default: "", // Tareas separadas por |
        context: "server",
        access: "public",
      }),
      BINGO_MANDATORY_TASKS: envField.string({
        default: "", // Tareas separadas por |
        context: "server",
        access: "public",
      }),
      BINGO_LOCAL_STORAGE_KEY: envField.string({
        default: "bingo-tasks",
        context: "client",
        access: "public",
      }),
      BINGO_CLOUDINARY_ASSETS_PATH: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      BINGO_CLOUDINARY_UPLOAD_PRESET: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),

      // ## Cloudinary
      CLOUDINARY_CLOUD_NAME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      CLOUDINARY_API_KEY: envField.string({
        default: "",
        context: "server",
        access: "secret",
      }),
      CLOUDINARY_API_SECRET: envField.string({
        default: "",
        context: "server",
        access: "secret",
      }),
      // ## Redis
      REDIS_STORAGE_KV_URL: envField.string({
        default: "",
        context: "server",
        access: "secret",
      }),
      REDIS_STORAGE_KV_REST_API_URL: envField.string({
        default: "",
        context: "server",
        access: "secret",
      }),
      REDIS_STORAGE_KV_REST_API_TOKEN: envField.string({
        default: "",
        context: "server",
        access: "secret",
      }),
      REDIS_STORAGE_KV_REST_API_READ_ONLY_TOKEN: envField.string({
        default: "",
        context: "server",
        access: "secret",
      }),
      REDIS_STORAGE_REDIS_URL: envField.string({
        default: "",
        context: "server",
        access: "secret",
      }),
    },
  },
});
