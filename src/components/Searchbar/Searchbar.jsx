import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { IconButton } from '../IconButton/IconButton';
import { ReactComponent as Search } from '../Icons/Icons.svg';
import { Notify } from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setValue(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      return Notify.warning('Enter value!');
    }

    onSubmit(value);

    reset();
  };

  const reset = () => {
    setValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <IconButton onClick={handleSubmit}>
          <Search width="25" height="25" />
        </IconButton>

        <input
          className={css.SearchFormInput}
          type="text"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
