import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { fetchImages } from './Services/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { MagnifyingGlass } from 'react-loader-spinner';

export class App extends Component {
  state = {
    page: 1,
    value: '',
    images: [],
    loading: false,
    modal: { isOpen: false, visibleData: null },
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.value !== prevState.value ||
      this.state.page !== prevState.page
    ) {
      try {
        this.setState({
          loading: true,
        });
        const response = await fetchImages(this.state.value, this.state.page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          loadMore: this.state.page < Math.ceil(response.data.totalHits / 12),
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

  changeValue = value => {
    this.setState({
      value,
      page: 1,
      images: [],
    });
  };

  showMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
        visibleData: null,
      },
    });
  };

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
        {this.state.loading && (
          <MagnifyingGlass
            visible={true}
            height="300"
            width="300"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            onClick={this.handleClickGallery}
          />
        )}
        {this.state.images.length > 0 && this.state.loadMore && (
          <Button onClick={this.showMore} />
        )}
      </div>
    );
  }
}
