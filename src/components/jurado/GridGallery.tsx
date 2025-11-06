import { useState } from "react";
import usePhotos from "../../hooks/usePhotos";
import { type Photo } from "../../types";
import Modal from "../shared/Modal";
import GridGalleryItem from "./GridGalleryItem";
import "./styles/GridGallery.css";

export interface Props {
  initialPhotos: Photo[];
  refetchIntervalMs: number;
  filters?: {
    taskId?: string;
    userId?: string;
  };
}

const GridGallery = ({
  initialPhotos = [],
  refetchIntervalMs,
  filters,
}: Props) => {
  const { photos } = usePhotos({ initialPhotos, refetchIntervalMs, filters });
  const [selectedPhotoModal, setSelectedPhotoModal] = useState({
    open: false,
    photo: null as Photo | null,
  });

  const handleCloseModal = () => {
    setSelectedPhotoModal({ open: false, photo: null });
  };

  return (
    <div className="grid-gallery-container">
      <ul>
        {photos.map((image) => (
          <GridGalleryItem
            key={image.public_id}
            photo={image}
            setSelectedPhotoModal={setSelectedPhotoModal}
          />
        ))}
      </ul>

      <Modal open={selectedPhotoModal.open} onClose={handleCloseModal}>
        <div className="modal-content">
          <p>"{selectedPhotoModal.photo?.taskId}"</p>
          <picture>
            <img
              src={selectedPhotoModal.photo?.secure_url}
              alt={selectedPhotoModal.photo?.taskId} // TODO: better alt text
            />
          </picture>
        </div>
      </Modal>
    </div>
  );
};

// TODO: add buttons for "mark" and "select as winner"

export default GridGallery;
