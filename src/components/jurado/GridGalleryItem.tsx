import type { Photo } from "../../types";
import "./styles/GridGalleryItem.css";

interface Props {
  image: Photo;
}

const GridGalleryItem = ({ image }: Props) => {
  return (
    <picture>
      <img src={image.secure_url} />
    </picture>
  );
};

export default GridGalleryItem;

// TODO: if this doesn't scale well with more features, refactor to accept props for different use cases or move it to GridGallery
