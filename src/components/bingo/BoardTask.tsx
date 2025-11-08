import { actions } from "astro:actions";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { TaskWithImage } from "../../types";
import { fileToUri } from "../../utils/formatFiles";
import "./styles/BoardTask.css";

interface Props {
  task: TaskWithImage;
  updateTask: (taskId: string, imageId: string) => void;
  setSelectedTaskModal: (state: {
    open: boolean;
    task: TaskWithImage | null;
  }) => void;
}

const BoardTask = ({ task, updateTask, setSelectedTaskModal }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!task.imageId && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [task]);

  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const uri = await fileToUri(file);

      const data = await actions.uploadPhoto.orThrow({
        uri,
        taskId: task.id,
      });

      updateTask(task.id, data.photo.secure_url);
    } catch (error) {
      alert(
        "Ha ocurrido un error al subir la imagen. Por favor, recarga la página.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskClick = () => {
    if (isLoading) return;

    if (task.imageId) setSelectedTaskModal({ open: true, task });
    else fileInputRef.current?.click();
  };

  const handleImageError = () => {
    updateTask(task.id, "");
  };

  return (
    <li className="task-container" onClick={handleTaskClick}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleUploadFile}
      />

      {isLoading && (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      )}

      {!task.imageId ? (
        <span>{task.description}</span>
      ) : (
        <picture>
          <img
            src={task.imageId}
            alt={task.description}
            onError={handleImageError}
          />
        </picture>
      )}
    </li>
  );
};

export default BoardTask;
