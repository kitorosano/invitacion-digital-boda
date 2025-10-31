import { useEffect, useState } from "react";
import type { Photo } from "../../types";
import GridGalleryItem from "./GridGalleryItem";
import "./styles/GridGallery.css";

interface Props {
  initialImages: Photo[];
}

const REFETCH_INTERVAL_MS = 5000;

const GridGallery = ({ initialImages = [] }: Props) => {
  const [images, setImages] = useState<Photo[]>(initialImages);

  useEffect(() => {
    const intervalId = setInterval(fetchImages, REFETCH_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/photos", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const { resources } = await response.json();

      setImages(resources);
    } catch (error) {
      alert(
        "Ha ocurrido un error al obtener las imágenes. Por favor, recarga la página.",
      );
    }
  };

  return (
    <div className="grid-gallery-container">
      {images.map((image) => (
        <GridGalleryItem key={image.public_id} image={image} />
      ))}
    </div>
  );
};

export default GridGallery;
