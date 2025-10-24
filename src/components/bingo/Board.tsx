import { BINGO_LOCAL_STORAGE_KEY } from "astro:env/client";
import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";
import { fileToUri } from "../../utils/formatFiles";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import { shuffleTasks, type Task } from "../../utils/shuffleTasks";
import "./Board.css";
import ChecklistIcon from "./icons/Checklist";
import PhotoEditIcon from "./icons/PhotoEdit";
import Modal from "./Modal";

interface Props {
  optionalTasks: string[];
  mandatoryTasks: string[];
}

const Board = ({ optionalTasks, mandatoryTasks }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedTasks = loadFromLocalStorage<Task[]>(BINGO_LOCAL_STORAGE_KEY);
    const initialTasks =
      storedTasks || shuffleTasks(optionalTasks, mandatoryTasks);

    setTasks(initialTasks);
  }, []);

  const handleImageError = (taskWithError: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskWithError.id ? { ...task, imageId: "" } : task,
    );

    setTasks(updatedTasks);
    saveToLocalStorage(BINGO_LOCAL_STORAGE_KEY, updatedTasks);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);

    if (!task.imageId) {
      fileInputRef.current?.click();
    } else {
      setShouldOpenModal(true);
    }
  };

  const handleUploadFile = async (
    file: File | undefined,
    selectedTask: Task | null,
  ) => {
    if (!file || !selectedTask) return;

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

      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask?.id
          ? { ...task, imageId: data.secure_url }
          : task,
      );

      setTasks(updatedTasks);
      setSelectedTask(null);
      saveToLocalStorage(BINGO_LOCAL_STORAGE_KEY, updatedTasks);
    } catch (error) {
      console.error("Error uploading file:", error);
      // TODO: show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePhoto = (task?: Task | null) => {
    if (!task) return;
    handleCloseModal();

    const taskWithoutImage = { ...task, imageId: "" };
    handleTaskClick(taskWithoutImage);
  };

  const handleCloseModal = () => {
    setShouldOpenModal(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    if (tasks.length === 0) return;

    const hasFinished = tasks.every((task) => task.imageId);
    if (hasFinished) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.9 },
      });
    }
  }, [tasks]);

  return (
    <div className="board-container">
      {isLoading && (
        <div className="loading-container">
          <div className="loader" />
          <span>Cargando...</span>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => handleUploadFile(e.target.files?.[0], selectedTask)}
        style={{ display: "none" }}
      />

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="task-card-container"
            onClick={() => handleTaskClick(task)}
          >
            {!task.imageId ? (
              <span>{task.text}</span>
            ) : (
              <picture>
                <img
                  src={task.imageId}
                  alt={task.text}
                  onError={() => handleImageError(task)}
                />
              </picture>
            )}
          </li>
        ))}
      </ul>

      <p className="tasks-progress">
        Tareas completadas: {tasks.filter((task) => task.imageId).length} /{" "}
        {tasks.length}
      </p>

      <Modal open={shouldOpenModal} onClose={handleCloseModal}>
        <div className="task-container">
          <ChecklistIcon size={64} />
          <p>"{selectedTask?.text}"</p>
          <picture>
            <img src={selectedTask?.imageId} alt={selectedTask?.text} />
          </picture>
          <div className="task-actions">
            <button onClick={() => handleDeletePhoto(selectedTask)}>
              <PhotoEditIcon size={16} />
              Cambiar foto
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
// TODO: addheartbeat effect to tasks-progress when completed tasks
// TODO: guardar el orden de usuarios que completan el bingo; replantear guardar los demas datos del usuario.
// TODO: cuando completas el bingo, ya no deberia dejar cambiar fotos.

export default Board;
