export type User = {
  id: string;
  username: string;
};

export type Task = {
  id: string;
  description: string;
};

export type Photo = {
  id: string;
  url: string;
  userId: User["id"];
  taskId: Task["id"];
};

export type TaskWithPhoto = {
  id: Task["id"];
  description: Task["description"];
  photoId: Photo["id"] | "";
  photoUrl: Photo["url"] | "";
};

export enum GalleryTab {
  ALL,
  BOARDS,
  TASKS,
}

export type Orientation = "landscape" | "portrait";

export type TaskWithPhotos = Task & { photos: Photo[] };
