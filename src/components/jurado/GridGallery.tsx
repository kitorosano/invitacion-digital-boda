import { useState } from "react";
import useTasksWithPhoto from "../../hooks/useTasksWithPhoto";
import { type TasksFilters, type TaskWithPhoto } from "../../types";
import Modal from "../shared/Modal";
import FilterControls from "./FilterControls";
import GridGalleryItem from "./GridGalleryItem";
import "./styles/GridGallery.css";

export interface Props {
  initialTasksWithPhoto: TaskWithPhoto[];
  refetchIntervalMs: number;
  tasksFilters: TasksFilters;
  showFilterControls: boolean;
  bingoBoardLayout: boolean;
}

const GridGallery = ({
  initialTasksWithPhoto,
  refetchIntervalMs,
  tasksFilters,
  showFilterControls,
  bingoBoardLayout,
}: Props) => {
  const { tasksWithPhoto, filters, setFilters } = useTasksWithPhoto({
    initialTasksWithPhoto,
    refetchIntervalMs,
    tasksFilters,
  });

  const [selectedTaskWithPhotoModal, setSelectedTaskWithPhotoModal] = useState({
    open: false,
    taskWithPhoto: null as TaskWithPhoto | null,
  });

  const handleCloseModal = () => {
    setSelectedTaskWithPhotoModal({ open: false, taskWithPhoto: null });
  };

  return (
    <div className={`grid-gallery-container`}>
      {showFilterControls && (
        <FilterControls filters={filters} setFilters={setFilters} />
      )}

      <ul
        className={`${bingoBoardLayout ? "bingo-board-layout" : ""} ${
          showFilterControls ? "with-filters" : ""
        }`}
      >
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
