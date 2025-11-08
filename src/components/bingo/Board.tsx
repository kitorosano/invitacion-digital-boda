import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import useBoard from "../../hooks/useBoard";
import type { Task, TaskWithImage, User } from "../../types";
import Modal from "../shared/Modal";
import BoardTask from "./BoardTask";
import ChecklistIcon from "./icons/Checklist";
import PhotoEditIcon from "./icons/PhotoEdit";
import "./styles/Board.css";

interface Props {
  optionalTasks: Task[];
  mandatoryTasks: Task[];
  user: User;
}

const Board = ({ optionalTasks, mandatoryTasks, user }: Props) => {
  const { tasks, updateTask, completedTasksCount, hasFinished } = useBoard({
    optionalTasks,
    mandatoryTasks,
  });
  const [selectedTaskModal, setSelectedTaskModal] = useState({
    open: false,
    task: null as TaskWithImage | null,
  });
  const [shouldAnimateProgress, setShouldAnimateProgress] = useState(false);

  useEffect(() => {
    setShouldAnimateProgress(true);
    const timeoutId = setTimeout(() => setShouldAnimateProgress(false), 1000);
    return () => clearTimeout(timeoutId);
  }, [tasks]);

  const handleDeletePhoto = () => {
    if (!selectedTaskModal.task) return;
    handleCloseModal();

    updateTask(selectedTaskModal.task.id, "");
  };

  const handleCloseModal = () => {
    setSelectedTaskModal({ open: false, task: null });
  };

  useEffect(() => {
    if (hasFinished) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.9 },
      });
    }
  }, [hasFinished]);

  return (
    <div className="board-container">
      <ul>
        {tasks.map((task) => (
          <BoardTask
            key={task.id}
            task={task}
            updateTask={updateTask}
            setSelectedTaskModal={setSelectedTaskModal}
          />
        ))}
      </ul>

      <div className="board-info">
        <p className="username">Tablero de {user?.username}</p>
        <p
          className={`tasks-progress ${shouldAnimateProgress ? "animate" : ""}`}
        >
          Tareas completadas: {completedTasksCount} / {tasks.length}
        </p>
      </div>

      <Modal open={selectedTaskModal.open} onClose={handleCloseModal}>
        <div className="modal-content">
          <ChecklistIcon size={64} />
          <p>"{selectedTaskModal.task?.description}"</p>
          <picture>
            <img
              src={selectedTaskModal.task?.imageId}
              alt={selectedTaskModal.task?.description}
            />
          </picture>
          {!hasFinished && (
            <div className="task-actions">
              <button onClick={handleDeletePhoto}>
                <PhotoEditIcon size={16} />
                Cambiar foto
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
// TODO: guardar el orden de usuarios que completan el bingo; replantear guardar los demas datos del usuario.

export default Board;
