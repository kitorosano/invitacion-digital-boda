// @ts-check
import favicons from "astro-favicons";
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [favicons()],
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
      SCHEDULE_DOWNLOAD_FILENAME: envField.string({
        default: "evento-boda",
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
      // RSVP Section
      GOOGLE_APPS_SCRIPT_URL: envField.string({
        default: "",
        context: "server",
        access: "secret",
      }),
      RSVP_SUCCESS_MESSAGE: envField.string({
        default: "¡Gracias por confirmar tu reserva!",
        context: "server",
        access: "public",
      }),
      RSVP_ERROR_MESSAGE: envField.string({
        default:
          "Lo sentimos, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.",
        context: "server",
        access: "public",
      }),
      RSVP_IS_AVAILABLE: envField.boolean({
        default: true,
        context: "server",
        access: "public",
      }),
      // Dress Code Section
      DRESS_CODE_MESSAGE: envField.string({
        default: "Les pedimos de favor a los invitados evitar estos colores:",
        context: "server",
        access: "public",
      }),
      DRESS_CODE_COLORS_TO_AVOID: envField.string({
        default: "", // Colores separados por comas
        context: "server",
        access: "public",
      }),
      // Bank Account Section
      BANK_ACCOUNT_MESSAGE: envField.string({
        default:
          "Lo más importante es tu presencia, pero si deseas hacernos un regalo aquí tienes nuestros datos.",
        context: "server",
        access: "public",
      }),
      BANK_NAME: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      BANK_ACCOUNT_TYPE: envField.string({
        default: "C.A.",
        context: "server",
        access: "public",
      }),
      BANK_ACCOUNT_NUMBER: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      BANK_ACCOUNT_HOLDER: envField.string({
        default: "",
        context: "server",
        access: "public",
      }),
      // Footer Section
      FOOTER_MESSAGE: envField.string({
        default: "Te esperamos",
        context: "server",
        access: "public",
      }),
    },
  },
});
