import axios from 'axios';

const API_KEY = '36259505-7f3dd5b7540e269f4a04dc70a';

export const fetchImages = (value, page) => {
  return axios.get(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
