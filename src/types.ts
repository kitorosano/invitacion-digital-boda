export type User = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  description: string;
};

export type Photo = {
  url: string;
  userId: User["id"];
  taskId: Task["id"];
};

export type TaskWithPhoto = {
  id: Task["id"];
  description: Task["description"];
  photoUrl: Photo["url"] | "";
  userId: User["id"];
};

export type TaskWithPhotos = Task & { tasksWithPhoto: TaskWithPhoto[] };

export enum GalleryTab {
  ALL,
  BOARDS,
  TASKS,
}

export type Orientation = "landscape" | "portrait";
