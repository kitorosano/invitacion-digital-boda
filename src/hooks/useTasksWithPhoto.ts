import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import type { TaskWithPhoto } from "../types";

export interface Props {
  initialTasksWithPhoto: TaskWithPhoto[];
  refetchIntervalMs: number;
  filters?: {
    taskId?: string;
    userId?: string;
  };
}

const useTasksWithPhoto = ({
  initialTasksWithPhoto,
  refetchIntervalMs,
  filters,
}: Props) => {
  const [tasksWithPhoto, setTasksWithPhoto] = useState<TaskWithPhoto[]>(
    initialTasksWithPhoto,
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => fetchPhotos(filters),
      refetchIntervalMs,
    );
    return () => clearInterval(intervalId);
  }, [filters]);

  const fetchPhotos = async (filters?: Props["filters"]) => {
    const { taskId, userId } = filters || {};
    try {
      const { tasksWithPhoto } = await actions.getTasksWithPhoto.orThrow({
        taskId,
        userId,
      });

      setTasksWithPhoto(tasksWithPhoto);
    } catch (error) {
      alert(
        "Ha ocurrido un error al obtener las imágenes. Por favor, recarga la página.",
      );
    }
  };

  return { tasksWithPhoto };
};

export default useTasksWithPhoto;
