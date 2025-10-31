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
