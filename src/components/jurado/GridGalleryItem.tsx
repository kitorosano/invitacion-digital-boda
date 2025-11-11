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
    if (!taskWithPhoto.photoUrl) return;

    setSelectedTaskWithPhotoModal({ open: true, taskWithPhoto });
  };

  const processedUrl = taskWithPhoto.photoUrl
    ? taskWithPhoto.photoUrl.replace(
        "/upload/",
        `/upload/c_fill,h_500,w_360/q_auto/f_auto/`,
      )
    : "";

  return (
    <li className="grid-gallery-item-container" onClick={onPhotoClick}>
      {!processedUrl ? (
        <span>{taskWithPhoto.description}</span>
      ) : (
        <picture>
          <img src={processedUrl} alt={taskWithPhoto.description} />
        </picture>
      )}
    </li>
  );
};

export default GridGalleryItem;
