import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//clearGallery необязательный аргумент и имеет значение по умолчанию false. Если он установлен в true, то галерея изображений будет очищена перед отображением нового результата поиска
const renderImage = (responses, clearGallery = false) => {
  //Аргумент page === 1 определяет значение переменной clearGallery, которое равно true, если текущая страница поиска = 1. Это означает, что галерея будет очищена перед добавлением новых изображений только при первой загрузке страницы. Если мы находимся на 2 странице и далее, то новые изображения будут добавлены в конец списка.
  const galleryEl = document.querySelector('.gallery');

  // проверяем, что на странице есть элемент .gallery
  if (!galleryEl) return;
  // если clearGallery = true
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

//

// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const renderImage = responses => {
//   const galleryEl = document.querySelector('.gallery');
//   const imageEl = responses.data.hits
//     .map(
//       response =>
//         `<a href="${response.largeImageURL}" class="gallery__link">
//     <img src="${response.webformatURL}" alt="${response.tags}" class="gallery__image">
//     <div class="info">
//     <p class="info__item">
//     <b>Likes</b> ${response.likes}
//     </p>
//     <p class="info__item">
//     <b>Views</b> ${response.views}
//     </p>
//     <p class="info__item">
//     <b>Comments</b> ${response.comments}
//     </p>
//     <p class="info__item">
//     <b>Downloads</b> ${response.downloads}
//     </p>
//     </div>
//       </a>`
//     )
//     .join('');

//   galleryEl.innerHTML = imageEl;

//   const lightbox = new SimpleLightbox('.gallery a', {
//     captionDelay: 250,
//     captionsData: 'alt',
//   });
// };

// export default renderImage;
