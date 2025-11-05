import type { Photo } from "../../types";
import "./styles/GridGalleryItem.css";

interface Props {
  photo: Photo;
  setSelectedPhotoModal: (state: {
    open: boolean;
    photo: Photo | null;
  }) => void;
}

const GridGalleryItem = ({ photo, setSelectedPhotoModal }: Props) => {
  const onPhotoClick = () => {
    setSelectedPhotoModal({ open: true, photo });
  };

  return (
    <li className="grid-gallery-item-container" onClick={onPhotoClick}>
      <picture>
        <img src={photo.secure_url} />
      </picture>
    </li>
  );
};

export default GridGalleryItem;

// TODO: if this doesn't scale well with more features, refactor to accept props for different use cases or move it to GridGallery
