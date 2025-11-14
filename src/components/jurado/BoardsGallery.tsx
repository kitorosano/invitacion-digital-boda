import { navigate } from "astro/virtual-modules/transitions-router.js";
import useUsers from "../../hooks/useUsers";
import type { User } from "../../types";
import BoardsGalleryItem from "./BoardsGalleryItem";
import "./styles/BoardsGallery.css";

export interface Props {
  initialUsers: User[];
  refetchIntervalMs: number;
}

const BoardsGallery = ({ initialUsers, refetchIntervalMs }: Props) => {
  const { users } = useUsers({ initialUsers, refetchIntervalMs });

  const handleBoardClick = (userId: string) => {
    navigate(`/jurado/boards/${userId}`);
  };

  return (
    <div className="board-gallery-container">
      <ol>
        {users.map((user, index) => (
          <BoardsGalleryItem
            key={user.id}
            user={user}
            position={index}
            onBoardClick={handleBoardClick}
          />
        ))}
      </ol>
    </div>
  );
};

export default BoardsGallery;
