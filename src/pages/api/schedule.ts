// Este endpoint genera un archivo .ics para descargar un evento de calendario
import type { APIRoute } from "astro";
import {
  SCHEDULE_DETAILS,
  SCHEDULE_DOWNLOAD_FILENAME,
  SCHEDULE_END_DATE,
  SCHEDULE_LOCATION,
  SCHEDULE_START_DATE,
  SCHEDULE_TITLE,
} from "astro:env/server";
import {
  dateStringToDateUTC,
  dateToCalendarRSVP,
} from "../../utils/formatDates";

export const GET: APIRoute = async () => {
  const title = SCHEDULE_TITLE;
  const startDate = dateToCalendarRSVP(
    dateStringToDateUTC(SCHEDULE_START_DATE),
  );
  const endDate = dateToCalendarRSVP(dateStringToDateUTC(SCHEDULE_END_DATE));
  const description = SCHEDULE_DETAILS;
  const location = SCHEDULE_LOCATION;

  const ics = `
    BEGIN:VCALENDAR\n
    VERSION:2.0\n
    BEGIN:VEVENT\n
    SUMMARY:${title}\n
    DESCRIPTION:${description}\n
    LOCATION:${location}\n
    DTSTART:${startDate}\n
    DTEND:${endDate}\n
    END:VEVENT\n
    END:VCALENDAR
  `.trim();

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": `attachment; filename="${SCHEDULE_DOWNLOAD_FILENAME}.ics"`,
    },
  });
};
