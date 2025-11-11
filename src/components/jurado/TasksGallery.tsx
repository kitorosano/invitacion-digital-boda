import { navigate } from "astro:transitions/client";
import { useEffect, useState } from "react";
import useTasksWithPhoto from "../../hooks/useTasksWithPhoto";
import type { Task, TasksFilters, TaskWithPhoto, TaskWithPhotos } from "../../types";
import "./styles/TasksGallery.css";
import TasksGalleryItem from "./TasksGalleryItem";

export interface Props {
  initialTasksWithPhoto: TaskWithPhoto[];
  refetchIntervalMs: number;
  tasksFilters: TasksFilters;
  mandatoryTasks: Task[];
  colors: string[];
}

const TasksGallery = ({
  initialTasksWithPhoto,
  refetchIntervalMs,
  tasksFilters,
  mandatoryTasks,
  colors,
}: Props) => {
  const { tasksWithPhoto } = useTasksWithPhoto({
    initialTasksWithPhoto,
    refetchIntervalMs,
    tasksFilters,
  });
  const [groupedTasks, setGroupedTasks] = useState<TaskWithPhotos[]>([]);

  useEffect(() => {
    const tasksGrouped = mandatoryTasks.map((task) => {
      const taskPhotos = tasksWithPhoto.filter(
        (taskWithPhoto) => taskWithPhoto.id === task.id,
      );
      return { ...task, tasksWithPhoto: [...taskPhotos] };
    });

    setGroupedTasks(tasksGrouped);
  }, [mandatoryTasks, tasksWithPhoto]);

  const handleTaskClick = (task: TaskWithPhotos) => {
    navigate(`/jurado/tasks/${task.id}`);
  };

  return (
    <div className="tasks-gallery-container">
      {groupedTasks.map((task, i) => (
        <TasksGalleryItem
          key={task.id}
          taskWithPhoto={task}
          backgroundColor={colors[i % colors.length]}
          onTaskClick={handleTaskClick}
        />
      ))}
    </div>
  );
};

export default TasksGallery;
