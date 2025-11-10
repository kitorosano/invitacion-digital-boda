import type { TaskWithPhoto } from "../../types";
import "./styles/GridGalleryItem.css";

interface Props {
  taskWithPhoto: TaskWithPhoto;
  setSelectedTaskWithPhotoModal: (state: {
    open: boolean;
    taskWithPhoto: TaskWithPhoto | null;
  }) => void;
}

const GridGalleryItem = ({
  taskWithPhoto,
  setSelectedTaskWithPhotoModal,
}: Props) => {
  const onPhotoClick = () => {
    setSelectedTaskWithPhotoModal({ open: true, taskWithPhoto });
  };

  return (
    <li className="grid-gallery-item-container" onClick={onPhotoClick}>
      {!taskWithPhoto.photoUrl ? (
        <span>{taskWithPhoto.description}</span>
      ) : (
        <picture>
          <img src={taskWithPhoto.photoUrl} alt={taskWithPhoto.description} />
        </picture>
      )}
    </li>
  );
};

export default GridGalleryItem;

// TODO: if this doesn't scale well with more features, refactor to accept props for different use cases or move it to GridGallery
