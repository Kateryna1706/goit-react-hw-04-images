import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

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
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.buttonLabel}>Search</span>
          </button>

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
