import { TZDate } from "@date-fns/tz";
import { UTCDate } from "@date-fns/utc";
import { DATE_TIMEZONE } from "astro:env/server";

/**
 * @param date - Fecha en formato ISO 8601
 * @returns Date ajustada a la zona horaria especificada en DATE_TIMEZONE
 */
export const dateWithTz = (date: string): Date => {
  if (!DATE_TIMEZONE) return new Date(date);

  return new TZDate(date, DATE_TIMEZONE);
};

/**
 * @param time - Hora en formato "HH:MM"
 * @returns Hora ajustada a la zona horaria especificada en DATE_TIMEZONE en formato "HH:MM"
 */
export const timeWithTz = (time: string): string => {
  if (!DATE_TIMEZONE) return time;

  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  const dateWithTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
  );
  return new TZDate(dateWithTime, DATE_TIMEZONE).toISOString().slice(11, 16);
};

/**
 * Formatea una fecha para el estándar iCalendar (ICS).
 * @param date - Objeto Date a formatear.
 * @returns Fecha en formato "YYYYMMDDTHHMMSSZ" (UTC).
 */
export const dateForCalendar = (date: Date): string => {
  return (
    new UTCDate(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  );
};
