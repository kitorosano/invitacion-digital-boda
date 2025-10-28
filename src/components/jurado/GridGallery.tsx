import { useEffect, useState } from "react";
import "./GridGallery.css";

interface Props {
  initialImages: Image[];
}

type Image = {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
};

const REFETCH_INTERVAL_MS = 5000;

const GridGallery = ({ initialImages = [] }: Props) => {
  const [images, setImages] = useState<Image[]>(initialImages);

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
      {images.map((image) => {
        return (
          <picture key={image.public_id}>
            <img src={image.secure_url} width={200} height={300} />
          </picture>
        );
      })}
    </div>
  );
};

export default GridGallery;
