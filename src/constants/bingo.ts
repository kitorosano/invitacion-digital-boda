import {
  BINGO_MANDATORY_TASKS,
  BINGO_OPTIONAL_TASKS,
  BINGO_SITE_TITLE,
} from "astro:env/server";

export const layoutProps = {
  title: BINGO_SITE_TITLE,
};

export const boardProps = {
  optionalTasks: BINGO_OPTIONAL_TASKS.split("|"),
  mandatoryTasks: BINGO_MANDATORY_TASKS.split("|"),
};
