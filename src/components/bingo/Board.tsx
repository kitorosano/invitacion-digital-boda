import { actions } from "astro:actions";
import { BINGO_LOCAL_STORAGE_KEY } from "astro:env/client";
import { navigate } from "astro:transitions/client";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import type { Task, User } from "../../types";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import { shuffleTasks } from "../../utils/shuffleTasks";
import BoardTask from "./BoardTask";
import ChecklistIcon from "./icons/Checklist";
import PhotoEditIcon from "./icons/PhotoEdit";
import Modal from "./Modal";
import "./styles/Board.css";

interface Props {
  optionalTasks: Task[];
  mandatoryTasks: Task[];
}

const Board = ({ optionalTasks, mandatoryTasks }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskModal, setSelectedTaskModal] = useState({
    open: false,
    task: null as Task | null,
  });
  const [shouldAnimateProgress, setShouldAnimateProgress] = useState(false);
  const completedTasksCount = tasks.filter((task) => task.imageId).length;
  const hasFinished = tasks.length !== 0 && tasks.every((task) => task.imageId);

  useEffect(() => {
    const storedTasks = loadFromLocalStorage<Task[]>(BINGO_LOCAL_STORAGE_KEY);
    const initialTasks =
      storedTasks || shuffleTasks(optionalTasks, mandatoryTasks);

    setTasks(initialTasks);

    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    try {
      const { user } = await actions.getCurrentUser.orThrow();
      setUser(user);
    } catch (error) {
      await actions.unregisterUser();
      navigate("/bingo", { history: "replace" });
    }
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

  const updateTask = (taskId: string, imageId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, imageId } : task,
    );

    setTasks(updatedTasks);
    setShouldAnimateProgress(true);
    setTimeout(() => setShouldAnimateProgress(false), 1000);
    saveToLocalStorage(BINGO_LOCAL_STORAGE_KEY, updatedTasks);
  };

  const handleDeletePhoto = () => {
    if (!selectedTaskModal.task) return;
    handleCloseModal();

    updateTask(selectedTaskModal.task.id, "");
  };

  const handleCloseModal = () => {
    setSelectedTaskModal({ open: false, task: null });
  };

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
          <p>"{selectedTaskModal.task?.text}"</p>
          <picture>
            <img
              src={selectedTaskModal.task?.imageId}
              alt={selectedTaskModal.task?.text}
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
