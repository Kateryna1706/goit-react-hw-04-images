import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

const API_KEY = '36259505-7f3dd5b7540e269f4a04dc70a';

export class App extends Component {
  state = {
    page: 1,
    value: '',
    images: [],
    loading: false,
  };

  changeValue = value => {
    console.log(value);
    this.setState({
      value,
    });
  };

  componentDidMount() {
    // const contacts = localStorage.getItem('contacts');
    // const parsedContacts = JSON.parse(contacts);
    // this.setState({
    //   contacts: parsedContacts,
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.setState({
        loading: true,
      });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.state.value}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => response.json())
          .then(response =>
            this.setState({
              images: [...response.hits],
              loading: false,
            })
          );
      }, 2000);

      // localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div
        style={{
          // display: 'flex',
          // justifyContent: 'center',
          // flexDirection: 'column',
          // alignItems: 'flex-start',

          height: '100vh',
          // display: 'grid',
          // gridTemplateColumns: 1,
          // gridGap: 16,
          paddingBottom: 24,
          padding: 20,
          fontSize: 30,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.changeValue} />
        {this.state.loading && <p>Loading...</p>}
        {this.state.images.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem images={this.state.images} />
          </ImageGallery>
        )}
      </div>
    );
  }
}
