import usePhotos from "../../hooks/usePhotos";
import { type Photo } from "../../types";
import GridGalleryItem from "./GridGalleryItem";
import "./styles/GridGallery.css";

export interface Props {
  initialPhotos: Photo[];
  refetchIntervalMs: number;
  // TODO: add filtering props
}

const GridGallery = ({ initialPhotos = [], refetchIntervalMs }: Props) => {
  const { photos } = usePhotos({ initialPhotos, refetchIntervalMs });

  return (
    <div className="grid-gallery-container">
      {photos.map((image) => (
        <GridGalleryItem key={image.public_id} image={image} />
      ))}
    </div>
  );
};

export default GridGallery;
