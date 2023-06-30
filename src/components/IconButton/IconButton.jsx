import css from './IconButton.module.css';
import PropTypes from 'prop-types';

export const IconButton = ({ children, onClick }) => {
  return (
    <button type="submit" className={css.SearchFormButton} onClick={onClick}>
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
