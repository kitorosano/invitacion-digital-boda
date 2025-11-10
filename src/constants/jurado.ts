import {
  BINGO_SITE_TITLE,
  JURADO_GALLERY_REFETCH_INTERVAL_MS,
  JURADO_GALLERY_TASKS_COLORS,
  JURADO_HEADER_TABS,
} from "astro:env/server";

export const layoutProps = {
  title: BINGO_SITE_TITLE,
};

export const headerTabsProps = {
  tabNames: JURADO_HEADER_TABS.split("|"),
};

export const gridGalleryProps = {
  refetchIntervalMs: JURADO_GALLERY_REFETCH_INTERVAL_MS,
};

export const boardsGalleryProps = {
  refetchIntervalMs: JURADO_GALLERY_REFETCH_INTERVAL_MS,
};

export const tasksGalleryProps = {
  refetchIntervalMs: JURADO_GALLERY_REFETCH_INTERVAL_MS,
  colors: JURADO_GALLERY_TASKS_COLORS.split(","),
};
