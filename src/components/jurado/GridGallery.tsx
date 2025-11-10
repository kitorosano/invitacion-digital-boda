import { useState } from "react";
import useTasksWithPhoto from "../../hooks/useTasksWithPhoto";
import { type TaskWithPhoto } from "../../types";
import Modal from "../shared/Modal";
import GridGalleryItem from "./GridGalleryItem";
import "./styles/GridGallery.css";

export interface Props {
  initialTasksWithPhoto: TaskWithPhoto[];
  refetchIntervalMs: number;
  filters?: {
    taskId?: string;
    userId?: string;
  };
  bingoBoardLayout?: boolean;
}

const GridGallery = ({
  initialTasksWithPhoto = [],
  refetchIntervalMs,
  filters,
  bingoBoardLayout = false,
}: Props) => {
  const { tasksWithPhoto } = useTasksWithPhoto({
    initialTasksWithPhoto,
    refetchIntervalMs,
    filters,
  });
  const [selectedTaskWithPhotoModal, setSelectedTaskWithPhotoModal] = useState({
    open: false,
    taskWithPhoto: null as TaskWithPhoto | null,
  });

  const handleCloseModal = () => {
    setSelectedTaskWithPhotoModal({ open: false, taskWithPhoto: null });
  };

  return (
    <div className="grid-gallery-container">
      <ul className={bingoBoardLayout ? "bingo-board-layout" : ""}>
        {tasksWithPhoto.map((taskWithPhoto) => (
          <GridGalleryItem
            key={taskWithPhoto.photoUrl}
            taskWithPhoto={taskWithPhoto}
            setSelectedTaskWithPhotoModal={setSelectedTaskWithPhotoModal}
          />
        ))}
      </ul>

      <Modal open={selectedTaskWithPhotoModal.open} onClose={handleCloseModal}>
        <div className="modal-content">
          <picture>
            <img
              src={selectedTaskWithPhotoModal.taskWithPhoto?.photoUrl}
              alt={selectedTaskWithPhotoModal.taskWithPhoto?.description}
            />
          </picture>
        </div>
      </Modal>
    </div>
  );
};

// TODO: add buttons for "mark" and "select as winner"

export default GridGallery;
