import { navigate } from "astro:transitions/client";
import { useEffect, useState } from "react";
import usePhotos from "../../hooks/usePhotos";
import type { Photo, Task, TaskWithPhotos } from "../../types";
import "./styles/TasksGallery.css";
import TasksGalleryItem from "./TasksGalleryItem";

export interface Props {
  initialPhotos: Photo[];
  refetchIntervalMs: number;
  tasks: Task[];
  colors: string[];
}

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
        <TasksGalleryItem
          key={task.id}
          task={task}
          backgroundColor={colors[i % colors.length]}
          onTaskClick={handleTaskClick}
        />
      ))}
    </div>
  );
};

export default TasksGallery;
