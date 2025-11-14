import type { TaskWithPhotos } from "../../types";
import { lowQualityPhotoUrl } from "../../utils/cloudinaryHelpers";
import "./styles/TasksGalleryItem.css";

interface Props {
  taskWithPhoto: TaskWithPhotos;
  backgroundColor: string;
  onTaskClick: (task: TaskWithPhotos) => void;
}

const TasksGalleryItem = ({
  taskWithPhoto,
  backgroundColor,
  onTaskClick,
}: Props) => {
  const handleTaskClick = () => {
    onTaskClick(taskWithPhoto);
  };

  return (
    <div
      className="task-gallery-item-container"
      style={{ backgroundColor }}
      onClick={handleTaskClick}
    >
      <header>
        <h3>{taskWithPhoto.description}</h3>·
        <span>{taskWithPhoto.tasksWithPhoto.length} fotos</span>
        <p>Ver más...</p>
      </header>

      <div className="task-photos">
        {taskWithPhoto.tasksWithPhoto.map((taskWithPhoto, index) => (
          <picture
            key={taskWithPhoto.photoUrl}
            className={index === 0 ? "active" : ""}
          >
            <img src={lowQualityPhotoUrl(taskWithPhoto.photoUrl)} />
          </picture>
        ))}
      </div>
    </div>
  );
};

export default TasksGalleryItem;
