import {
  BINGO_MANDATORY_TASKS,
  BINGO_OPTIONAL_TASKS,
  BINGO_SITE_ENTRYPOINT,
  BINGO_SITE_ENTRYPOINT_JUDGES,
  BINGO_SITE_TITLE
} from "astro:env/server";

export const entrypoints = {
  BINGO: BINGO_SITE_ENTRYPOINT,
  JUDGES: BINGO_SITE_ENTRYPOINT_JUDGES,
};

export const layoutProps = {
  title: BINGO_SITE_TITLE,
};

export const boardProps = {
  optionalTasks: BINGO_OPTIONAL_TASKS.split("|"),
  mandatoryTasks: BINGO_MANDATORY_TASKS.split("|"),
};
