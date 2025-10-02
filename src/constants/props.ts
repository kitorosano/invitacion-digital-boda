import {
  BANK_ACCOUNT_HOLDER,
  BANK_ACCOUNT_MESSAGE,
  BANK_ACCOUNT_NUMBER,
  BANK_ACCOUNT_TYPE,
  BANK_NAME,
  BGM_IS_ENABLED,
  BGM_VOLUME,
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
  SITE_ENTRYPOINT_CEREMONY,
  SITE_ENTRYPOINT_CIVIL,
  SITE_TITLE,
  WEDDING_COUPLE,
  WEDDING_DATE,
} from "astro:env/server";
import { dateWithTz, timeForEvent, timeWithTz } from "../utils/formatDates";

export const entrypoints = {
  CEREMONY: SITE_ENTRYPOINT_CEREMONY,
  CIVIL: SITE_ENTRYPOINT_CIVIL,
};

export const layoutProps = {
  title: SITE_TITLE,
};

export const bgmProps = {
  src: "/audios/bgm.wav",
  isEnabled: BGM_IS_ENABLED,
  volume: BGM_VOLUME,
};

export const heroProps = {
  couple: WEDDING_COUPLE,
  title: HERO_TITLE,
  img: "/images/webp/hero.webp",
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

export const imageSeparatorProps = [
  {
    src: "/images/webp/separator_1.webp",
  },
  {
    src: "/images/webp/separator_2.webp",
  },
  {
    src: "/images/webp/separator_3.webp",
  },
];

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
    image: "/images/webp/event_detail_1.webp",
  },
  {
    name: EVENT_2_NAME,
    time: timeForEvent(timeWithTz(EVENT_2_TIME), true),
    place: EVENT_2_PLACE,
    address: EVENT_2_ADDRESS,
    mapLink: EVENT_2_MAP_LINK,
    image: "/images/webp/event_detail_2.webp",
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
    accountType: BANK_ACCOUNT_TYPE,
    accountNumber: BANK_ACCOUNT_NUMBER,
    accountHolder: BANK_ACCOUNT_HOLDER,
  },
};

export const photoCollageProps = {
  images: [
    "/images/webp/photo_collage_1.webp",
    "/images/webp/photo_collage_2.webp",
    "/images/webp/photo_collage_3.webp",
    "/images/webp/photo_collage_4.webp",
    "/images/webp/photo_collage_5.webp",
  ],
};

export const footerProps = {
  message: FOOTER_MESSAGE,
  couple: WEDDING_COUPLE,
};
