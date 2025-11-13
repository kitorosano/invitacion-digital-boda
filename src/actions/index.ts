import { bingo } from "./bingo";
import { photos } from "./photos";
import { user } from "./user";

export const server = {
  ...user,
  ...bingo,
  ...photos,
};
