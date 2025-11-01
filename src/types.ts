export type User = {
  id: string;
  username: string;
};

export type Task = {
  id: string;
  text: string;
  imageId: string;
};

export type Photo = {
  public_id: string;
  secure_url: string;
  userId: User["id"];
  taskId: Task["id"];
};

export enum GalleryTab {
  ALL,
  BOARDS,
  TASKS,
}
