import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { fileToUri } from "../../utils/formatFiles";
import type { Task } from "../../utils/shuffleTasks";
import "./BoardTask.css";

interface Props {
  task: Task;
  updateTask: (taskId: string, imageId: string) => void;
  setSelectedTaskModal: (state: { open: boolean; task: Task | null }) => void;
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

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uri }),
      });
      const { data } = await response.json();

      updateTask(task.id, data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
      // TODO: show error message to user
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
        <span>{task.text}</span>
      ) : (
        <picture>
          <img src={task.imageId} alt={task.text} onError={handleImageError} />
        </picture>
      )}
    </li>
  );
};

// TODO: replantear custom hook para manejar subida de imagenes.

export default BoardTask;
