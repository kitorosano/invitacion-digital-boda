import { actions } from "astro:actions";
import { useState } from "react";
import useTasksWithPhoto from "../../hooks/useTasksWithPhoto";
import { type TasksFilters, type TaskWithPhoto } from "../../types";
import TaskModal from "../shared/TaskModal";
import FilterControls from "./FilterControls";
import GridGalleryItem from "./GridGalleryItem";
import FavoriteIcon from "./icons/Favorite";
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

  const handleMarkAsFavorite = async () => {
    if (!selectedTaskWithPhotoModal.taskWithPhoto) return;

    try {
      const { taskWithPhoto } =
        await actions.markTaskWithPhotoAsFavorite.orThrow({
          userId: selectedTaskWithPhotoModal.taskWithPhoto.userId,
          taskId: selectedTaskWithPhotoModal.taskWithPhoto.id,
          isMarkedAsFavorite:
            !selectedTaskWithPhotoModal.taskWithPhoto.isMarkedAsFavorite,
        });

      setSelectedTaskWithPhotoModal({
        open: true,
        taskWithPhoto,
      });
    } catch (error) {
      alert(
        "Ha ocurrido un error al obtener las imágenes. Por favor, recarga la página.",
      );
    }
  };

  return (
    <div className={`grid-gallery-container`}>
      {showFilterControls && (
        <FilterControls filters={filters} setFilters={setFilters} />
      )}

      {tasksWithPhoto.length === 0 && (
        <p className="no-photos-message">No hay fotos que mostrar.</p>
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

      <TaskModal
        open={selectedTaskWithPhotoModal.open}
        task={selectedTaskWithPhotoModal.taskWithPhoto}
        onClose={handleCloseModal}
      >
        <button onClick={handleMarkAsFavorite}>
          <FavoriteIcon
            size={24}
            isActive={
              !!selectedTaskWithPhotoModal.taskWithPhoto?.isMarkedAsFavorite
            }
          />
          Marcar favorita
        </button>
      </TaskModal>
    </div>
  );
};

export default GridGallery;
