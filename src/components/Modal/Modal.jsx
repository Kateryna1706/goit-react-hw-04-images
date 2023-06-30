import css from './Modal.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      console.log('KeyDown');
      this.props.onClick();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      console.log('Backdrop');
      this.props.onClick();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img
            src={this.props.largeImage.image}
            alt=""
            className={css.ModalImage}
            key={this.props.largeImage.id}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
