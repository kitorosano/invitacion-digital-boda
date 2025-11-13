import {
  BINGO_SITE_TITLE,
  JURADO_GALLERY_REFETCH_INTERVAL_MS,
  JURADO_GALLERY_TASKS_COLORS,
  JURADO_HEADER_TABS,
} from "astro:env/server";
import type { Sorting, TasksFilters } from "../types";

export const layoutProps = {
  title: BINGO_SITE_TITLE,
};

export const headerTabsProps = {
  tabNames: JURADO_HEADER_TABS.split("|"),
};

export const gridGalleryProps = {
  initialTasksWithPhoto: [],
  refetchIntervalMs: JURADO_GALLERY_REFETCH_INTERVAL_MS,
  showFilterControls: false,
  tasksFilters: {
    userId: undefined,
    taskId: undefined,
    favoritesOnly: false,
    sorting: "newest" as Sorting,
  } as TasksFilters,
  bingoBoardLayout: false,
};

export const boardsGalleryProps = {
  refetchIntervalMs: JURADO_GALLERY_REFETCH_INTERVAL_MS,
};

export const tasksGalleryProps = {
  refetchIntervalMs: JURADO_GALLERY_REFETCH_INTERVAL_MS,
  colors: JURADO_GALLERY_TASKS_COLORS.split(","),
  tasksFilters: {
    favoritesOnly: false,
    sorting: "newest" as Sorting,
  } as TasksFilters,
};

export const boardByIdGalleryProps = {
  refetchIntervalMs: JURADO_GALLERY_REFETCH_INTERVAL_MS,
  bingoBoardLayout: true,
};

export const DEFAULT_USERS_PER_PAGE = 15;
