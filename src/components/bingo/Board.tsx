import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import useBoard from "../../hooks/useBoard";
import type { Task, TaskWithPhoto, User } from "../../types";
import TaskModal from "../shared/TaskModal";
import BoardTask from "./BoardTask";
import PhotoEditIcon from "./icons/PhotoEdit";
import "./styles/Board.css";

interface Props {
  initialTasksWithPhoto: TaskWithPhoto[];
  optionalTasks: Task[];
  mandatoryTasks: Task[];
  currentUser: User;
}

const Board = ({
  optionalTasks,
  mandatoryTasks,
  currentUser,
  initialTasksWithPhoto,
}: Props) => {
  const { tasks, updateBoard, completedTasksCount, hasFinished } = useBoard({
    initialTasksWithPhoto,
    optionalTasks,
    mandatoryTasks,
  });
  const [selectedTaskModal, setSelectedTaskModal] = useState({
    open: false,
    task: null as TaskWithPhoto | null,
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

    updateBoard(selectedTaskModal.task.id, "");
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
            updateBoard={updateBoard}
            setSelectedTaskModal={setSelectedTaskModal}
          />
        ))}
      </ul>

      <div className="board-info">
        <p className="username">Tablero de {currentUser.name}</p>
        <p
          className={`tasks-progress ${shouldAnimateProgress ? "animate" : ""}`}
        >
          Tareas completadas: {completedTasksCount} / {tasks.length}
        </p>
      </div>

      <TaskModal
        open={selectedTaskModal.open}
        task={selectedTaskModal.task}
        onClose={handleCloseModal}
      >
          {!hasFinished && (
            <button onClick={handleDeletePhoto}>
              <PhotoEditIcon size={24} />
              Cambiar foto
            </button>
          )}
      </TaskModal>
    </div>
  );
};

export default Board;
