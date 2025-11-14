import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import type { Photo } from "../types";

export interface Props {
  initialPhotos?: Photo[];
  tag: string;
  spotlightInterval: number;
  refetchIntervals: {
    short: number;
    medium: number;
    long: number;
  };
}

const usePhotos = ({
  initialPhotos = [],
  tag,
  spotlightInterval,
  refetchIntervals,
}: Props) => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentRefetchInterval, setCurrentRefetchInterval] = useState<number>(
    refetchIntervals.long,
  );
  const [shouldHideSpotlight, setShouldHideSpotlight] =
    useState<boolean>(false);
  const currentPhoto = photos.length > 0 ? photos[currentIndex] : null;

  const fetchPhotos = async () => {
    try {
      const { photos } = await actions.getPhotosByTag.orThrow({ tag });

      if (photos.length === 0) return;

      if (photos.length < 5) {
        setCurrentRefetchInterval(refetchIntervals.short);
      } else if (photos.length < 10) {
        setCurrentRefetchInterval(refetchIntervals.medium);
      } else {
        setCurrentRefetchInterval(refetchIntervals.long);
      }

      setPhotos(photos);
      setCurrentIndex(0);
    } catch (error) {}
  };

  useEffect(() => {
    const refetchIntervalId = setInterval(() => {
      fetchPhotos();
    }, currentRefetchInterval);

    return () => {
      clearInterval(refetchIntervalId);
    };
  }, [currentRefetchInterval]);

  useEffect(() => {
    const spotlightIntervalId = setInterval(() => {
      setShouldHideSpotlight(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      setTimeout(() => {
        setShouldHideSpotlight(false);
      }, 1000);
    }, spotlightInterval);

    return () => {
      clearInterval(spotlightIntervalId);
    };
  }, [photos, spotlightInterval]);

  return { currentPhoto, shouldHideSpotlight };
};

export default usePhotos;
