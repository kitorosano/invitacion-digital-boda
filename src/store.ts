import { atom } from "nanostores";
import { GalleryTab } from "./types";

export const currentGalleryTab = atom(GalleryTab.ALL);
