import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ largeImage }) => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImage.image} alt="" key={largeImage.id} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
