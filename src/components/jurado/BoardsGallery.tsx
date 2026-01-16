import { navigate } from "astro:transitions/client";
import useUsers from "../../hooks/useUsers";
import type { User } from "../../types";
import BoardsGalleryItem from "./BoardsGalleryItem";
import "./styles/BoardsGallery.css";

export interface Props {
  initialUsers: User[];
  refetchIntervalMs: number;
  page: number;
}

const BoardsGallery = ({ initialUsers, refetchIntervalMs, page }: Props) => {
  const { users, totalPages } = useUsers({
    initialUsers,
    refetchIntervalMs,
    page: page - 1,
  });
  const hasPreviousPage = page - 1 > 0;
  const hasNextPage = page < totalPages;

  const handleBoardClick = (userId: string) => {
    navigate(`/jurado/boards/${userId}`, {
      state: { fromPage: page },
    });
  };

  const handlePreviousPage = () => {
    if (!hasPreviousPage) return;
    // setPage((currentPage) => currentPage - 1);
    navigate(`/jurado/boards?page=${page - 1}`);
  };

  const handleNextPage = () => {
    if (!hasNextPage) return;
    // setPage((currentPage) => currentPage + 1);
    navigate(`/jurado/boards?page=${page + 1}`);
  };

  return (
    <div className="board-gallery-container">
      {totalPages > 1 && (
        <div className="board-gallery-header">
          <nav className="controllers-container">
            <button
              className={`board-gallery-controller-button ${
                hasPreviousPage ? "" : "disabled"
              }`}
              onClick={handlePreviousPage}
            >
              &larr;
            </button>
            <button
              className={`board-gallery-controller-button ${
                hasNextPage ? "" : "disabled"
              }`}
              onClick={handleNextPage}
            >
              &rarr;
            </button>
          </nav>
        </div>
      )}

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
