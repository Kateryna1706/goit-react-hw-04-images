import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { fetchImages } from './Services/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { MagnifyingGlass } from 'react-loader-spinner';

export const App = () => {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, visibleData: null });
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  // async componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.value !== prevState.value ||
  //     this.state.page !== prevState.page
  //   ) {
  //     try {
  //       this.setState({
  //         loading: true,
  //       });
  //       const response = await fetchImages(this.state.value, this.state.page);
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...response.data.hits],
  //         loadMore: this.state.page < Math.ceil(response.data.totalHits / 12),
  //       }));
  //     } catch (error) {
  //       console.log(error);
  //       this.setState({
  //         error: error.message,
  //       });
  //     } finally {
  //       this.setState({
  //         loading: false,
  //       });
  //     }
  //   }
  // }

  useEffect(() => {
    if (value !== '') {
      setLoading(true);
      fetchImages(value, page)
        .then(response => {
          setImages(prevState => [...prevState, ...response.data.hits]);
          setLoadMore(page < Math.ceil(response.data.totalHits / 12));
        })
        .catch(error => setError(error.message))
        .finally(setLoading(false));
    }
  }, [value, page]);

  const changeValue = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  const showMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleClickGallery = (id, image) => {
    setModal({
      isOpen: true,
      visibleData: { id, image },
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      visibleData: null,
    });
  };

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
      {modal.isOpen && (
        <Modal largeImage={modal.visibleData} onClick={closeModal} />
      )}
      <Searchbar onSubmit={changeValue} />
      {loading && (
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
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleClickGallery} />
      )}
      {images.length > 0 && loadMore && <Button onClick={showMore} />}
    </div>
  );
};
