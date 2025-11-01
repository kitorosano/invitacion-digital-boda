import { useStore } from "@nanostores/react";
import { selectedTab } from "../../store";
import { GalleryTab } from "../../types";
import BoardGallery, { type Props as BoardGalleryProps } from "./BoardGallery";
import GridGallery, { type Props as GridGalleryProps } from "./GridGallery";
import TasksGallery, { type Props as TasksGalleryProps } from "./TasksGallery";

interface Props {
  gridGalleryProps: GridGalleryProps;
  boardGalleryProps: BoardGalleryProps;
  tasksGalleryProps: TasksGalleryProps;
}

const Navigation = ({
  gridGalleryProps,
  boardGalleryProps,
  tasksGalleryProps,
}: Props) => {
  const $selectedTab = useStore(selectedTab);

  switch ($selectedTab) {
    case GalleryTab.BOARDS:
      return <BoardGallery {...boardGalleryProps} />;
    case GalleryTab.TASKS:
      return <TasksGallery {...tasksGalleryProps} />;
    case GalleryTab.ALL:
    default:
      return <GridGallery {...gridGalleryProps} />;
  }
};

export default Navigation;
