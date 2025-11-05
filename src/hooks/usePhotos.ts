import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import type { Photo } from "../types";

export interface Props {
  initialPhotos: Photo[];
  refetchIntervalMs: number;
  filters?: {
    taskId?: string;
    userId?: string;
  };
}

const usePhotos = ({ initialPhotos, refetchIntervalMs, filters }: Props) => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);

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
      const data = await actions.getPhotos.orThrow({ taskId, userId });

      setPhotos(data.photos);
    } catch (error) {
      // TODO: more UI friendly error handling
      alert(
        "Ha ocurrido un error al obtener las imágenes. Por favor, recarga la página.",
      );
    }
  };

  return { photos };
};

export default usePhotos;
