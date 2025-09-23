import type { APIRoute } from "astro";
import {
  DATE_TIMEZONE,
  GOOGLE_APPS_SCRIPT_URL,
  RSVP_ERROR_MESSAGE,
  RSVP_SUCCESS_MESSAGE,
} from "astro:env/server";

export const POST: APIRoute = async ({ request }) => {
  const { rsvp, name, email, song, message } = await request.json();

  const date = new Date().toLocaleString("es-ES", {
    timeZone: DATE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const body = JSON.stringify({ date, name, email, song, message, rsvp });

  try {
    const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Formulario enviado, respuesta:", await res.text());

    return new Response(JSON.stringify({ message: RSVP_SUCCESS_MESSAGE }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al enviar el formulario:", error, { sender: name });

    return new Response(JSON.stringify({ message: RSVP_ERROR_MESSAGE }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
