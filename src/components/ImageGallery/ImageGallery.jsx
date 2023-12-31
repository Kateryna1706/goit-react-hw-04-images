import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <li
          className={css.imageGalleryItem}
          key={image.id}
          onClick={() => onClick(image.id, image.largeImageURL)}
        >
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={css.imageGalleryItemImage}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
