import {
  ACCOUNT_HOLDER,
  ACCOUNT_NUMBER,
  BANK_ACCOUNT_MESSAGE,
  BANK_NAME,
  DRESS_CODE_COLORS_TO_AVOID,
  DRESS_CODE_MESSAGE,
  EVENT_1_ADDRESS,
  EVENT_1_MAP_LINK,
  EVENT_1_NAME,
  EVENT_1_PLACE,
  EVENT_1_TIME,
  EVENT_2_ADDRESS,
  EVENT_2_MAP_LINK,
  EVENT_2_NAME,
  EVENT_2_PLACE,
  EVENT_2_TIME,
  FOOTER_MESSAGE,
  HERO_TITLE,
  INVITATION_MESSAGE,
  QUOTE_FOOTER,
  QUOTE_TEXT,
  RSVP_IS_AVAILABLE,
  SCHEDULE_DETAILS,
  SCHEDULE_DOWNLOAD_FILENAME,
  SCHEDULE_END_DATE,
  SCHEDULE_LOCATION,
  SCHEDULE_START_DATE,
  SCHEDULE_TITLE,
  SITE_TITLE,
  WEDDING_COUPLE,
  WEDDING_DATE,
} from "astro:env/server";
import { dateWithTz, timeForEvent, timeWithTz } from "../utils/formatDates";

export const layoutProps = {
  title: SITE_TITLE,
};

export const bgmProps = {
  src: "/audios/bgm.wav",
};

export const heroProps = {
  couple: WEDDING_COUPLE,
  title: HERO_TITLE,
  img: "/images/hero.jpg",
};

export const messageSeparatorProps = {
  message: INVITATION_MESSAGE,
  footer: "¡Estás invitado!",
};

export const dateWithPhotosProps = {
  date: dateWithTz(WEDDING_DATE),
};

export const countdownProps = {
  targetDate: dateWithTz(WEDDING_DATE),
};

export const scheduleProps = {
  text: SCHEDULE_TITLE,
  startDate: dateWithTz(SCHEDULE_START_DATE),
  endDate: dateWithTz(SCHEDULE_END_DATE),
  details: SCHEDULE_DETAILS,
  location: SCHEDULE_LOCATION,
  filename: SCHEDULE_DOWNLOAD_FILENAME,
};

export const imageSeparatorProps = {
  src: "/images/separator_1.jpg",
  alt: "Separador decorativo",
};

export const quoteSeparatorProps = {
  quote: QUOTE_TEXT,
  footer: QUOTE_FOOTER,
};

export const placeDetailsProps = [
  {
    name: EVENT_1_NAME,
    time: timeForEvent(timeWithTz(EVENT_1_TIME), true),
    place: EVENT_1_PLACE,
    address: EVENT_1_ADDRESS,
    mapLink: EVENT_1_MAP_LINK,
    image: "/images/event_detail_1.jpg",
  },
  {
    name: EVENT_2_NAME,
    time: timeForEvent(timeWithTz(EVENT_2_TIME), true),
    place: EVENT_2_PLACE,
    address: EVENT_2_ADDRESS,
    mapLink: EVENT_2_MAP_LINK,
    image: "/images/event_detail_2.jpg",
  },
];

export const rsvpProps = {
  isAvailable: RSVP_IS_AVAILABLE,
};

export const dressCodeProps = {
  message: DRESS_CODE_MESSAGE,
  colorsToAvoid: DRESS_CODE_COLORS_TO_AVOID.split(","),
};

export const bankAccountProps = {
  message: BANK_ACCOUNT_MESSAGE,
  bankDetails: {
    bankName: BANK_NAME,
    accountNumber: ACCOUNT_NUMBER,
    accountHolder: ACCOUNT_HOLDER,
  },
};

export const footerProps = {
  message: FOOTER_MESSAGE,
  couple: WEDDING_COUPLE,
};
