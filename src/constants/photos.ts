import { PHOTOS_SPOTLIGHT_INTERVAL_MS } from "astro:env/client";
import { PHOTOS_SITE_TITLE } from "astro:env/server";

export const layoutProps = {
  title: PHOTOS_SITE_TITLE,
};

export const spotlightProps = {
  spotlightInterval: PHOTOS_SPOTLIGHT_INTERVAL_MS, // 8 seconds
  refetchIntervals: {
    short: PHOTOS_SPOTLIGHT_INTERVAL_MS * 3, // 24 seconds
    medium: PHOTOS_SPOTLIGHT_INTERVAL_MS * 5, // 40 seconds
    long: PHOTOS_SPOTLIGHT_INTERVAL_MS * 7, // 56 seconds
  },
};

export const PHOTO_MEDIUM_Q_TRANSFORMATIONS =
  "c_fill,h_1000,w_720/q_auto/f_auto/"; // height/width = (picture height/width in px) * 2
