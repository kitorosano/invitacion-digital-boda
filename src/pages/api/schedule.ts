// Este endpoint genera un archivo .ics para descargar un evento de calendario
import type { APIRoute } from "astro";
import {
  INVITATION_SCHEDULE_DETAILS,
  INVITATION_SCHEDULE_DOWNLOAD_FILENAME,
  INVITATION_SCHEDULE_END_DATE,
  INVITATION_SCHEDULE_LOCATION,
  INVITATION_SCHEDULE_START_DATE,
  INVITATION_SCHEDULE_TITLE,
} from "astro:env/server";
import {
  dateStringToDateUTC,
  dateToCalendarRSVP,
} from "../../utils/formatDates";

export const GET: APIRoute = async () => {
  const title = INVITATION_SCHEDULE_TITLE;
  const startDate = dateToCalendarRSVP(
    dateStringToDateUTC(INVITATION_SCHEDULE_START_DATE),
  );
  const endDate = dateToCalendarRSVP(
    dateStringToDateUTC(INVITATION_SCHEDULE_END_DATE),
  );
  const description = INVITATION_SCHEDULE_DETAILS;
  const location = INVITATION_SCHEDULE_LOCATION;

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
      "Content-Disposition": `attachment; filename="${INVITATION_SCHEDULE_DOWNLOAD_FILENAME}.ics"`,
    },
  });
};
