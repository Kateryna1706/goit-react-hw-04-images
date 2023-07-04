import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ largeImage, onClick }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClick();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImage.image} alt="" className={css.ModalImage} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
