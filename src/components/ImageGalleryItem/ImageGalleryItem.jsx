import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images }) => {
  return (
    <div className={css.ImageGallery}>
      {images.map(image => (
        <li className={css.imageGalleryItem} key={image.id}>
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={css.imageGalleryItemImage}
            width="640"
            height="260"
          />
        </li>
      ))}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
