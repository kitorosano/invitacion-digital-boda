import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import type { Photo, Task } from "../../types";
import "./styles/TasksGallery.css";

export interface Props {
  initialPhotos: Photo[];
  refetchIntervalMs: number;
  tasks: Task[];
  colors: string[];
}

type TaskWithPhotos = Task & { photos: Photo[] };

const TasksGallery = ({
  initialPhotos,
  tasks,
  refetchIntervalMs,
  colors,
}: Props) => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [groupedTasks, setGroupedTasks] = useState<TaskWithPhotos[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => fetchPhotos(), refetchIntervalMs);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const tasksGrouped = tasks.map((task) => {
      const taskPhotos = photos.filter((photo) => photo.taskId === task.id);
      return { ...task, photos: taskPhotos };
    });

    setGroupedTasks(tasksGrouped);
  }, [photos]);

  const fetchPhotos = async () => {
    try {
      const data = await actions.getPhotos.orThrow();

      setPhotos(data.photos);
    } catch (error) {
      // TODO: more UI friendly error handling
      alert(
        "Ha ocurrido un error al obtener las imágenes. Por favor, recarga la página.",
      );
    }
  };

  return (
    <div className="tasks-gallery-container">
      {groupedTasks.map((task, i) => (
        <div
          key={task.id}
          className="task-gallery-item"
          style={{ backgroundColor: colors[i % colors.length] }}
        >
          <h3>
            {task.text}
            <span> {task.photos.length} fotos</span>
          </h3>

          <div className="task-photos">
            {task.photos.map((photo, i) => (
              <picture className={i === 0 ? "active" : ""}>
                <img src={photo.secure_url} />
              </picture>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksGallery;
