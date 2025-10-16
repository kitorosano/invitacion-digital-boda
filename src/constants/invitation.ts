import {
  INVITATION_BANK_ACCOUNT_MESSAGE,
  INVITATION_BANK_DETAIL_1_ACCOUNT_HOLDER,
  INVITATION_BANK_DETAIL_1_ACCOUNT_NUMBER,
  INVITATION_BANK_DETAIL_1_ACCOUNT_TYPE,
  INVITATION_BANK_DETAIL_1_NAME,
  INVITATION_BANK_DETAIL_2_ACCOUNT_HOLDER,
  INVITATION_BANK_DETAIL_2_ACCOUNT_NUMBER,
  INVITATION_BANK_DETAIL_2_ACCOUNT_TYPE,
  INVITATION_BANK_DETAIL_2_NAME,
  INVITATION_BGM_IS_ENABLED,
  INVITATION_BGM_VOLUME,
  INVITATION_DRESS_CODE_COLORS_TO_AVOID,
  INVITATION_DRESS_CODE_MESSAGE,
  INVITATION_EVENT_1_ADDRESS,
  INVITATION_EVENT_1_MAP_LINK,
  INVITATION_EVENT_1_NAME,
  INVITATION_EVENT_1_PLACE,
  INVITATION_EVENT_1_TIME,
  INVITATION_EVENT_2_ADDRESS,
  INVITATION_EVENT_2_MAP_LINK,
  INVITATION_EVENT_2_NAME,
  INVITATION_EVENT_2_PLACE,
  INVITATION_EVENT_2_TIME,
  INVITATION_FOOTER_MESSAGE_TEXT,
  INVITATION_HERO_TITLE,
  INVITATION_MESSAGE_SEPARATOR_TEXT,
  INVITATION_QUOTE_SEPARATOR_FOOTER,
  INVITATION_QUOTE_SEPARATOR_TEXT,
  INVITATION_RSVP_DEADLINE,
  INVITATION_RSVP_IS_AVAILABLE,
  INVITATION_SCHEDULE_DETAILS,
  INVITATION_SCHEDULE_DOWNLOAD_FILENAME,
  INVITATION_SCHEDULE_END_DATE,
  INVITATION_SCHEDULE_LOCATION,
  INVITATION_SCHEDULE_START_DATE,
  INVITATION_SCHEDULE_TITLE,
  INVITATION_SITE_ENTRYPOINT_CEREMONY,
  INVITATION_SITE_ENTRYPOINT_CIVIL,
  INVITATION_SITE_TITLE,
  INVITATION_WEDDING_COUPLE,
  INVITATION_WEDDING_DATE,
} from "astro:env/server";
import { dateStringToDateUTC } from "../utils/formatDates";

export const entrypoints = {
  CEREMONY: INVITATION_SITE_ENTRYPOINT_CEREMONY,
  CIVIL: INVITATION_SITE_ENTRYPOINT_CIVIL,
};

export const layoutProps = {
  title: INVITATION_SITE_TITLE,
};

export const bgmProps = {
  src: "/audios/bgm.wav",
  isEnabled: INVITATION_BGM_IS_ENABLED,
  volume: INVITATION_BGM_VOLUME,
};

export const heroProps = {
  couple: INVITATION_WEDDING_COUPLE,
  title: INVITATION_HERO_TITLE,
  img: "/images/webp/hero.webp",
};

export const messageSeparatorProps = {
  message: INVITATION_MESSAGE_SEPARATOR_TEXT,
  footer: "¡Estás invitado!",
};

export const dateWithPhotosProps = {
  date: new Date(INVITATION_WEDDING_DATE),
};

export const countdownProps = {
  targetDate: dateStringToDateUTC(INVITATION_WEDDING_DATE),
};

export const scheduleProps = {
  text: INVITATION_SCHEDULE_TITLE,
  startDate: dateStringToDateUTC(INVITATION_SCHEDULE_START_DATE),
  endDate: dateStringToDateUTC(INVITATION_SCHEDULE_END_DATE),
  details: INVITATION_SCHEDULE_DETAILS,
  location: INVITATION_SCHEDULE_LOCATION,
  filename: INVITATION_SCHEDULE_DOWNLOAD_FILENAME,
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
  quote: INVITATION_QUOTE_SEPARATOR_TEXT,
  footer: INVITATION_QUOTE_SEPARATOR_FOOTER,
};

export const eventDetailsProps = [
  {
    name: INVITATION_EVENT_1_NAME,
    time: INVITATION_EVENT_1_TIME,
    place: INVITATION_EVENT_1_PLACE,
    address: INVITATION_EVENT_1_ADDRESS,
    mapLink: INVITATION_EVENT_1_MAP_LINK,
    image: "/images/webp/event_detail_1.webp",
  },
  {
    name: INVITATION_EVENT_2_NAME,
    time: INVITATION_EVENT_2_TIME,
    place: INVITATION_EVENT_2_PLACE,
    address: INVITATION_EVENT_2_ADDRESS,
    mapLink: INVITATION_EVENT_2_MAP_LINK,
    image: "/images/webp/event_detail_2.webp",
  },
];

export const rsvpProps = {
  isAvailable: INVITATION_RSVP_IS_AVAILABLE,
  deadline: dateStringToDateUTC(INVITATION_RSVP_DEADLINE),
};

export const dressCodeProps = {
  message: INVITATION_DRESS_CODE_MESSAGE,
  colorsToAvoid: INVITATION_DRESS_CODE_COLORS_TO_AVOID.split(","),
};

export const bankAccountProps = {
  message: INVITATION_BANK_ACCOUNT_MESSAGE,
  bankDetails: [
    {
      bankName: INVITATION_BANK_DETAIL_1_NAME,
      accountType: INVITATION_BANK_DETAIL_1_ACCOUNT_TYPE,
      accountNumber: INVITATION_BANK_DETAIL_1_ACCOUNT_NUMBER,
      accountHolder: INVITATION_BANK_DETAIL_1_ACCOUNT_HOLDER,
    },
    {
      bankName: INVITATION_BANK_DETAIL_2_NAME,
      accountType: INVITATION_BANK_DETAIL_2_ACCOUNT_TYPE,
      accountNumber: INVITATION_BANK_DETAIL_2_ACCOUNT_NUMBER,
      accountHolder: INVITATION_BANK_DETAIL_2_ACCOUNT_HOLDER,
    },
  ],
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
  message: INVITATION_FOOTER_MESSAGE_TEXT,
  couple: INVITATION_WEDDING_COUPLE,
};
