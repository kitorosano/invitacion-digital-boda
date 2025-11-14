import { useEffect } from "react";
import usePhotos from "../../hooks/usePhotos";
import type { Photo } from "../../types";
import { mediumQualityPhotoUrl } from "../../utils/cloudinaryHelpers";
import "./styles/Spotlight.css";

interface Props {
  initialPhotos: Photo[];
  photoTag: string;
  spotlightInterval: number;
  refetchIntervals: {
    short: number;
    medium: number;
    long: number;
  };
}

const Spotlight = ({
  initialPhotos,
  photoTag,
  spotlightInterval,
  refetchIntervals,
}: Props) => {
  const { currentPhoto, shouldHideSpotlight } = usePhotos({
    initialPhotos,
    tag: photoTag,
    spotlightInterval,
    refetchIntervals,
  });

  return (
    <div className="spotlight-container">
      {!shouldHideSpotlight && currentPhoto && (
        <>
          <picture>
            <img
              src={mediumQualityPhotoUrl(currentPhoto.url)}
              alt={currentPhoto.message}
            />
          </picture>
          <p>{currentPhoto?.message}</p>
        </>
      )}
    </div>
  );
};

export default Spotlight;
