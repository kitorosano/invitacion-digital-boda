import { INVITATION_DATE_TIMEZONE } from "astro:env/server";
import { fromZonedTime } from "date-fns-tz";

/**
 * Convierte una cadena de fecha a un objeto Date en UTC, considerando la zona horaria especificada en INVITATION_DATE_TIMEZONE.
 * @param date - Cadena de fecha en formato ISO (YYYY-MM-DDTHH:MM:SS).
 * @returns Objeto Date en UTC.
 */
export const dateStringToDateUTC = (date: string): Date => {
  if (!INVITATION_DATE_TIMEZONE) return new Date(date);

  return fromZonedTime(date, INVITATION_DATE_TIMEZONE);
};

/**
 * Formatea una fecha para el estándar iCalendar (ICS).
 * @param date - Objeto Date a formatear.
 * @returns Fecha en formato "YYYYMMDDTHHMMSSZ" (UTC).
 */
export const dateToCalendarRSVP = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};
