import { navigate } from "astro:transitions/client";
import { useEffect, useState } from "react";
import usePhotos from "../../hooks/usePhotos";
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
  const { photos } = usePhotos({ initialPhotos, refetchIntervalMs });
  const [groupedTasks, setGroupedTasks] = useState<TaskWithPhotos[]>([]);

  useEffect(() => {
    const tasksGrouped = tasks.map((task) => {
      const taskPhotos = photos.filter((photo) => photo.taskId === task.id);
      return { ...task, photos: [...taskPhotos] };
    });

    setGroupedTasks(tasksGrouped);
  }, [tasks, photos]);

  const handleTaskClick = (task: TaskWithPhotos) => {
    navigate(`/jurado/tasks/${task.id}`);
  };

  return (
    <div className="tasks-gallery-container">
      {groupedTasks.map((task, i) => (
        <div
          key={task.id}
          className="task-gallery-item"
          style={{ backgroundColor: colors[i % colors.length] }}
          onClick={() => handleTaskClick(task)}
        >
          <header>
            <h3>{task.text}</h3>·<span>{task.photos.length} fotos</span>
            <p>Ver más...</p>
          </header>

          <div className="task-photos">
            {task.photos.map((photo, index) => (
              <picture
                key={photo.public_id}
                className={index === 0 ? "active" : ""}
              >
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
