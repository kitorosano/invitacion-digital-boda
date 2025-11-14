import { actions } from "astro:actions";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { TaskWithPhoto } from "../../types";
import { lowQualityPhotoUrl } from "../../utils/cloudinaryHelpers";
import { fileToUri } from "../../utils/formatFiles";
import "./styles/BoardTask.css";

interface Props {
  task: TaskWithPhoto;
  updateBoard: (taskId: string, photoUrl: string) => void;
  setSelectedTaskModal: (state: {
    open: boolean;
    task: TaskWithPhoto | null;
  }) => void;
}

const BoardTask = ({ task, updateBoard, setSelectedTaskModal }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!task.photoUrl && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [task]);

  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const uri = await fileToUri(file);

      const { photo } = await actions.updateTaskWithPhoto.orThrow({
        uri,
        taskId: task.id,
      });

      updateBoard(task.id, photo.url);
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

    if (task.photoUrl) setSelectedTaskModal({ open: true, task });
    else fileInputRef.current?.click();
  };

  const handleImageError = () => {
    updateBoard(task.id, "");
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

      {!task.photoUrl ? (
        <span>{task.description}</span>
      ) : (
        <picture>
          <img
            src={lowQualityPhotoUrl(task.photoUrl)}
            alt={task.description}
            onError={handleImageError}
          />
        </picture>
      )}
    </li>
  );
};

export default BoardTask;
