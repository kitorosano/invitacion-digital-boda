import { bingo } from "./bingo";
import { user } from "./user";

export const server = {
  ...user,
  ...bingo,
};
