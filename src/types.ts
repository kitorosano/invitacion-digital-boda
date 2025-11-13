export type User = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  description: string;
};

export type BingoPhoto = {
  url: string;
  userId: User["id"];
  taskId: Task["id"];
};

export type TaskWithPhoto = {
  id: Task["id"];
  description: Task["description"];
  photoUrl: BingoPhoto["url"] | "";
  userId: User["id"];
  isMarkedAsFavorite?: boolean;
};

export type TaskWithPhotos = Task & { tasksWithPhoto: TaskWithPhoto[] };

export enum GalleryTab {
  ALL,
  BOARDS,
  TASKS,
}

export type Orientation = "landscape" | "portrait";
export type Sorting = "newest" | "oldest";

export type TasksFilters = {
  page?: number;
  limit?: number;
  taskId?: string;
  userId?: string;
  favoritesOnly: boolean;
  sorting: Sorting;
};

export type Photo = {
  id: string;
  url: string;
  tag: PhotoTags;
  message: string;
};

export enum PhotoTags {
  SIGNATURES = "signatures",
  PARTY = "party",
}
