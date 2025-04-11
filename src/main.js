import { searchFormEl, fetchImages } from './js/pixabay-api.js';
import {
  renderImageCards,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import './js/scroll-to-up';
import errorIcon from './img/error.svg';

const onFormSubmit = event => {
  event.preventDefault();

  clearGallery();

  const userQuery = searchFormEl.elements.search_request.value.trim();

  if (userQuery === '') {
    iziToast.show({
      message: 'Please enter your request!',
      position: 'topRight',
    });

    clearGallery();

    return;
  }

  showLoader();

  fetchImages(userQuery)
    .then(imagesData => {
      if (imagesData.hits.length === 0) {
        hideLoader();

        iziToast.show({
          iconUrl: errorIcon,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          maxWidth: '432px',
          backgroundColor: '#ef4040',
          theme: 'dark',
          messageColor: '#ffffff',
        });

        clearGallery();

        searchFormEl.reset();

        return;
      }

      renderImageCards(imagesData.hits);

      hideLoader();

      searchFormEl.reset();
    })
    .catch(err =>
      iziToast.error({
        message: err.message,
        position: 'topRight',
      })
    );
};

searchFormEl.addEventListener('submit', onFormSubmit);
