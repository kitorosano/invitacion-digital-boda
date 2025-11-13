import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import type { Photo } from "../types";

export interface Props {
  initialPhotos?: Photo[];
  tag: string;
  spotlightIntervalMs?: number;
}

const usePhotos = ({
  initialPhotos = [],
  tag,
  spotlightIntervalMs = 10000,
}: Props) => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (!currentPhoto) fetchPhotos();
  }, [currentPhoto]);

  const fetchPhotos = async () => {
    try {
      const { photos } = await actions.getPhotosByTag.orThrow({ tag });

      if (photos.length > 0) {
        setPhotos(photos);
        if (!currentPhoto) setCurrentPhoto(photos[0]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    
  }, [photos])

  return { currentPhoto };
};

export default usePhotos;
