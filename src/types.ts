export type User = {
  id: string;
  username: string;
};

export type Task = {
  id: string;
  description: string;
};

export type TaskWithPhoto = Task & {
  photoUrl: Photo["url"] | "";
};

export type TaskWithPhotos = Task & { photos: Photo[] };

export type Photo = {
  id: string;
  url: string;
  userId: User["id"];
  taskId: Task["id"];
};

export enum GalleryTab {
  ALL,
  BOARDS,
  TASKS,
}

export type Orientation = "landscape" | "portrait";
