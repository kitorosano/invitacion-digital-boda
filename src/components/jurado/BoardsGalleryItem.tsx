import type { User } from "../../types";
import "./styles/BoardsGalleryItem.css";

interface Props {
  user: User;
  position: number;
  onBoardClick: (userId: string) => void;
}

const BoardsGalleryItem = ({ user, position, onBoardClick }: Props) => {
  const handleBoardClick = () => {
    onBoardClick(user.id);
  };

  return (
    <li className="boards-gallery-item-container" onClick={handleBoardClick}>
      <span>{position + 1}. </span>
      <p >{user.name}</p>
    </li>
  );
};

export default BoardsGalleryItem;
