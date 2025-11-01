import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { currentGalleryTab } from "../../store";
import { GalleryTab, type Orientation } from "../../types";
import BoardGallery, { type Props as BoardGalleryProps } from "./BoardGallery";
import GridGallery, { type Props as GridGalleryProps } from "./GridGallery";
import TasksGallery, { type Props as TasksGalleryProps } from "./TasksGallery";
import OrientationIcon from "./icons/Orientation";
import "./styles/Navigation.css";

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
  const $selectedTab = useStore(currentGalleryTab);
  const [orientationOverlay, setOrientationOverlay] = useState({
    show: false,
    currentOrientation: "landscape" as Orientation,
  });

  useEffect(() => {
    const requiresPortrait = $selectedTab === GalleryTab.TASKS;
    const currentPortrait =
      orientationOverlay.currentOrientation === "portrait";

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (!currentPortrait && requiresPortrait) {
      setOrientationOverlay({ show: true, currentOrientation: "portrait" });

      timeoutId = setTimeout(() => {
        setOrientationOverlay((prev) => ({ ...prev, show: false }));
      }, 2000);
    }
    if (currentPortrait && !requiresPortrait) {
      setOrientationOverlay({ show: true, currentOrientation: "landscape" });

      timeoutId = setTimeout(() => {
        setOrientationOverlay((prev) => ({ ...prev, show: false }));
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [$selectedTab]);

  return (
    <div className="navigation-container">
      <div
        className={`orientation-overlay ${
          orientationOverlay.show ? "active" : ""
        }`}
      >
        <OrientationIcon
          size={192}
          className={orientationOverlay.currentOrientation}
        />
        ¡Gira tu dispositivo!
      </div>
      {$selectedTab === GalleryTab.ALL && <GridGallery {...gridGalleryProps} />}
      {$selectedTab === GalleryTab.BOARDS && (
        <BoardGallery {...boardGalleryProps} />
      )}
      {$selectedTab === GalleryTab.TASKS && (
        <TasksGallery {...tasksGalleryProps} />
      )}
    </div>
  );
};

export default Navigation;

// TODO: move orientation logic to a custom hook
