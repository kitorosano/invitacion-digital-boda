import {
  BINGO_SITE_TITLE,
  JURADO_GRID_GALLERY_REFETCH_INTERVAL_MS,
  JURADO_HEADER_TABS,
} from "astro:env/server";

export const layoutProps = {
  title: BINGO_SITE_TITLE,
};

export const headerTabsProps = {
  tabs: JURADO_HEADER_TABS.split("|"),
};

export const gridGalleryProps = {
  refetchIntervalMs: JURADO_GRID_GALLERY_REFETCH_INTERVAL_MS,
};
