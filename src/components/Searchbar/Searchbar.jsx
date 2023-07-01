import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { IconButton } from '../IconButton/IconButton';
import { ReactComponent as Search } from '../Icons/Icons.svg';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    const { value } = event.currentTarget;
    this.setState({
      value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value } = this.state;

    if (value.trim() === '') {
      return alert('Enter value');
    }

    this.props.onSubmit(value, this.reset);

    this.reset();
  };

  reset = () => {
    this.setState({
      value: '',
    });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <IconButton onClick={this.handleSubmit}>
            <Search width="25" height="25" />
          </IconButton>

          <input
            className={css.SearchFormInput}
            type="text"
            value={this.state.value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
