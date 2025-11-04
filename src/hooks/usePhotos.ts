import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import type { Photo } from "../types";

export interface Props {
  initialPhotos: Photo[];
  refetchIntervalMs: number;
}

const usePhotos = ({ initialPhotos, refetchIntervalMs }: Props) => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);

  useEffect(() => {
    const intervalId = setInterval(() => fetchPhotos(), refetchIntervalMs);
    return () => clearInterval(intervalId);
  }, []);

  const fetchPhotos = async () => {
    try {
      const data = await actions.getPhotos.orThrow();

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
