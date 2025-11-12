import { useState } from "react";
import type { TaskWithPhoto } from "../../types";
import CloseIcon from "./icons/Close";
import DotsIcon from "./icons/Dots";
import "./styles/Modal.css";

interface Props {
  open: boolean;
  onClose: () => void;
  task: TaskWithPhoto | null;
  children?: React.ReactNode;
}

const TaskModal = ({ children, open, onClose, task }: Props) => {
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  if (!task) return null;

  const handleControls = () => {
    setIsControlsOpen(!isControlsOpen);
  };

  const handleClose = () => {
    if (isControlsOpen) setIsControlsOpen(false);
    else onClose();
  };

  return (
    <div
      className={`modal-backdrop ${open ? "open" : ""}`}
      onClick={handleClose}
    >
      <header onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-content">
          <button onClick={handleClose}>
            <CloseIcon size={20} />
          </button>
          <h2>{task.description}</h2>
          <button className="modal-controls" onClick={handleControls}>
            <DotsIcon size={20} />
          </button>
        </div>
      </header>

      <main>
        <picture>
          <img src={task.photoUrl} alt={task.description} />
        </picture>
      </main>

      <footer
        className={open && isControlsOpen ? "open" : ""}
        onClick={(e) => e.stopPropagation()}
      >
        <p>{task.description}</p>

        {children}
      </footer>
    </div>
  );
};

export default TaskModal;
