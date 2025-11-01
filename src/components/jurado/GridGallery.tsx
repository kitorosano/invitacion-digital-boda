import { useStore } from "@nanostores/react";
import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import { selectedTab } from "../../store";
import { GalleryTab, type Photo } from "../../types";
import GridGalleryItem from "./GridGalleryItem";
import "./styles/GridGallery.css";

interface Props {
  initialPhotos: Photo[];
  refetchIntervalMs: number;
}

const GridGallery = ({ initialPhotos = [], refetchIntervalMs }: Props) => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const $selectedTab = useStore(selectedTab);

  useEffect(() => {
    const intervalId = setInterval(
      () => fetchPhotos($selectedTab),
      refetchIntervalMs,
    );
    return () => clearInterval(intervalId);
  }, [$selectedTab]);

  const fetchPhotos = async (tab: GalleryTab) => {
    try {
      const data = await actions.getPhotos.orThrow();

      const filteredPhotos: Photo[] = [];

      setPhotos(data.photos);
    } catch (error) {
      // TODO: more UI friendly error handling
      alert(
        "Ha ocurrido un error al obtener las imágenes. Por favor, recarga la página.",
      );
    }
  };

  return (
    <div className="grid-gallery-container">
      {photos.map((image) => (
        <GridGalleryItem key={image.public_id} image={image} />
      ))}
    </div>
  );
};

export default GridGallery;
