import usePhotos from "../../hooks/usePhotos";
import type { Photo } from "../../types";
import { mediumQualityPhotoUrl } from "../../utils/cloudinaryHelpers";
import "./styles/Spotlight.css";

interface Props {
  initialPhotos: Photo[];
  photoTag: string;
  intervalMs: number;
}

const Spotlight = ({ initialPhotos, photoTag, intervalMs }: Props) => {
  const { currentPhoto } = usePhotos({
    initialPhotos,
    tag: photoTag,
    spotlightIntervalMs: intervalMs,
  });
  return (
    <div className="spotlight-container">
      {currentPhoto && (
        <picture>
          <img
            src={mediumQualityPhotoUrl(currentPhoto.url)}
            alt={currentPhoto.message}
          />
        </picture>
      )}
    </div>
  );
};

export default Spotlight;
