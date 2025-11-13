import { actions } from "astro:actions";
import { useEffect, useRef, useState } from "react";
import type { TasksFilters, TaskWithPhoto } from "../types";

export interface Props {
  initialTasksWithPhoto?: TaskWithPhoto[];
  refetchIntervalMs: number;
  tasksFilters: TasksFilters;
}

const useTasksWithPhoto = ({
  initialTasksWithPhoto = [],
  refetchIntervalMs,
  tasksFilters,
}: Props) => {
  const [tasksWithPhoto, setTasksWithPhoto] = useState<TaskWithPhoto[]>(
    initialTasksWithPhoto,
  );
  const [filters, setFilters] = useState<TasksFilters>(tasksFilters);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current as unknown as number);
      intervalIdRef.current = null;
    }

    fetchPhotos(filters);

    intervalIdRef.current = setInterval(
      () => fetchPhotos(filters),
      refetchIntervalMs,
    ) as unknown as NodeJS.Timeout;

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current as unknown as number);
        intervalIdRef.current = null;
      }
    };
  }, [filters, refetchIntervalMs]);

  const fetchPhotos = async (filtersParam: TasksFilters) => {
    try {
      const { tasksWithPhoto } = await actions.getTasksWithPhoto.orThrow(
        filtersParam,
      );

      setTasksWithPhoto(tasksWithPhoto);
    } catch (error) {
      alert(
        "Ha ocurrido un error al obtener las imágenes. Por favor, recarga la página.",
      );
    }
  };

  return { tasksWithPhoto, filters, setFilters };
};

export default useTasksWithPhoto;
