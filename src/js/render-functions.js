import SimpleLightBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryEl = document.querySelector('.js-img-list');

let lightbox = new SimpleLightBox('.js-img-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createImageCard(image) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;

  return `<li class="gallery-item js-item">
        <a href="${largeImageURL}" class="gallery-link">
          <img class="img" src="${webformatURL}" alt="${tags}" width="360" />
          <div class="info-wrapper">
            <div class="img-info">
              <p class="label">Likes</p>
              <p class="value">${likes}</p>
            </div>
            <div class="img-info">
              <p class="label">Views</p>
              <p class="value">${views}</p>
            </div>
            <div class="img-info">
              <p class="label">Comments</p>
              <p class="value">${comments}</p>
            </div>
            <div class="img-info">
              <p class="label">Downloads</p>
              <p class="value">${downloads}</p>
            </div>
          </div>
        </a>
      </li>`;
}

export function renderImageCards(images) {
  const galleryTemplate = images.map(image => createImageCard(image)).join('');
  galleryEl.innerHTML = galleryTemplate;

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

const loaderEl = document.querySelector('.loader');

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}
