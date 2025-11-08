import type { TaskWithPhotos } from "../../types";
import "./styles/TasksGalleryItem.css";

interface Props {
  task: TaskWithPhotos;
  backgroundColor: string;
  onTaskClick: (task: TaskWithPhotos) => void;
}

const TasksGalleryItem = ({ task, backgroundColor, onTaskClick }: Props) => {
  const handleTaskClick = () => {
    onTaskClick(task);
  };

  return (
    <div
      className="task-gallery-item-container"
      style={{ backgroundColor }}
      onClick={handleTaskClick}
    >
      <header>
        <h3>{task.description}</h3>·<span>{task.photos.length} fotos</span>
        <p>Ver más...</p>
      </header>

      <div className="task-photos">
        {task.photos.map((photo, index) => (
          <picture key={photo.id} className={index === 0 ? "active" : ""}>
            <img src={photo.url} />
          </picture>
        ))}
      </div>
    </div>
  );
};

export default TasksGalleryItem;
