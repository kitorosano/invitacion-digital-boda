import type { TasksFilters } from "../../types";
import FavoriteIcon from "./icons/Favorite";
import SortIcon from "./icons/Sort";
import "./styles/FilterControls.css";

interface Props {
  filters: TasksFilters;
  setFilters: (filters: TasksFilters) => void;
}

const FilterControls = ({ filters, setFilters }: Props) => {
  const isSortByNewest = filters.sorting === "newest";

  const handleToggleFavorites = () => {
    const newFilters: TasksFilters = {
      ...filters,
      favoritesOnly: !filters.favoritesOnly,
    };
    setFilters(newFilters);
  };

  const handleSetSorting = () => {
    const newFilters: TasksFilters = {
      ...filters,
      sorting: isSortByNewest ? "oldest" : "newest",
    };
    setFilters(newFilters);
  };

  return (
    <div className="filter-controls">
      <button type="button" onClick={handleToggleFavorites}>
        <FavoriteIcon size={20} isActive={filters.favoritesOnly} />
      </button>

      <button type="button" onClick={handleSetSorting}>
        <SortIcon size={20} isActive={isSortByNewest} />
      </button>
    </div>
  );
};

export default FilterControls;
