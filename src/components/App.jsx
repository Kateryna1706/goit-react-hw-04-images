import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from './Services/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    value: '',
    images: [],
    loading: false,
    modal: { isOpen: false, visibleData: null },
    error: null,
  };

  changeValue = value => {
    this.setState({
      value,
    });
  };

  handleClick = () => {
    let currentPage = this.state.page;
    this.setState({
      page: (currentPage += 1),
    });
  };

  handleClickGallery = (id, image) => {
    this.setState(state => ({
      modal: {
        isOpen: true,
        visibleData: { id, image },
      },
    }));
  };

  closeModal = () => {
    this.setState({
      modal: {
        isOpen: false,
      },
    });
  };

  componentDidMount() {
    // const contacts = localStorage.getItem('contacts');
    // const parsedContacts = JSON.parse(contacts);
    // this.setState({
    //   contacts: parsedContacts,
    // });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      try {
        this.setState({
          loading: true,
          page: 1,
        });
        const images = await fetchImages(this.state.value, this.state.page);
        this.setState({
          images: [...images.data.hits],
        });
      } catch (error) {
        console.log(error);
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({
          loading: false,
        });
      }

      // localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    if (this.state.page !== prevState.page) {
      try {
        this.setState({
          loading: true,
        });
        const moreImages = await fetchImages(this.state.value, this.state.page);
        this.setState(({ images }) => ({
          images: [...images, ...moreImages.data.hits],
        }));
      } catch (error) {
        console.log(error);
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          height: '100vh',
          paddingBottom: 24,
          padding: 20,
          fontSize: 30,
          color: '#010101',
        }}
      >
        {this.state.modal.isOpen && (
          <Modal
            largeImage={this.state.modal.visibleData}
            onClick={this.closeModal}
          />
        )}
        <Searchbar onSubmit={this.changeValue} />
        {this.state.loading && <p>Loading...</p>}
        {this.state.images.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem
              images={this.state.images}
              onClick={this.handleClickGallery}
            />
          </ImageGallery>
        )}
        {this.state.images.length > 0 && <Button onClick={this.handleClick} />}
      </div>
    );
  }
}
