import type { TaskWithPhoto } from "../../types";
import { lowQualityPhotoUrl } from "../../utils/cloudinaryHelpers";
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
    if (!taskWithPhoto.photoUrl) return;

    setSelectedTaskWithPhotoModal({ open: true, taskWithPhoto });
  };

  return (
    <li className="grid-gallery-item-container" onClick={onPhotoClick}>
      {!taskWithPhoto.photoUrl ? (
        <span>{taskWithPhoto.description}</span>
      ) : (
        <picture>
          <img
            src={lowQualityPhotoUrl(taskWithPhoto.photoUrl)}
            alt={taskWithPhoto.description}
          />
        </picture>
      )}
    </li>
  );
};

export default GridGalleryItem;
