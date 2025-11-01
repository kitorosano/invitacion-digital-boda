import { atom } from "nanostores";
import { GalleryTab } from "./types";

export const selectedTab = atom(GalleryTab.ALL);
