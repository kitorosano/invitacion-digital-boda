import "./Modal.css";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  withCloseButton?: boolean;
}

const Modal = ({ open, onClose, children, withCloseButton = true }: Props) => {
  return (
    <div className={`modal-backdrop ${open ? "open" : ""}`} onClick={onClose}>
      <div
        className={`modal-container ${open ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {withCloseButton && (
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
