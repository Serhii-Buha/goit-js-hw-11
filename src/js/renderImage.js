import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const renderImage = (responses, clearGallery = false) => {
  const galleryEl = document.querySelector('.gallery');

  // проверяем, что на странице есть элемент .gallery
  if (!galleryEl) return;

  if (clearGallery) {
    galleryEl.innerHTML = '';
  }

  // проверяем, что есть изображения в ответе
  if (!responses.data.hits || responses.data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  const createImageEls = response => {
    const {
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = response;

    return `
      <a href="${largeImageURL}" class="gallery__link">
        <img src="${webformatURL}" alt="${tags}" class="gallery__image">
        <div class="info">
          <p class="info__item"><b>Likes</b> ${likes}</p>
          <p class="info__item"><b>Views</b> ${views}</p>
          <p class="info__item"><b>Comments</b> ${comments}</p>
          <p class="info__item"><b>Downloads</b> ${downloads}</p>
        </div>
      </a>`;
  };

  const imageEl = responses.data.hits.map(createImageEls).join('');
  galleryEl.innerHTML += imageEl;

  const initLightbox = () => {
    const lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
    });
    lightbox.refresh();
  };
  initLightbox();
};

export default renderImage;
