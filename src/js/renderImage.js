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

//

//

// if (responses.length > 10) {
//   Notiflix.Notify.info(
//     'Too many matches found. Please enter a more specific name.'
//   );
//   return;
// }

// if (responses.length > 1 && responses.length <= 10) {
//   const countries = responses
//     .map(response => {
//       const { flags, name } = response;
//       return `
//       <li>
//         <img src="${flags.svg}" alt="${flags.alt}" width="48" height="48"/>
//         <p><b>${name.official}</b></p>
//       </li>
//     `;
//     })
//     .join('');

//   countryList.innerHTML = countries;
// } else if (responses.length === 1) {
//   const { flags, name, capital, population, languages } = responses[0];
//   const languagesList = Object.values(languages).join(', ');

//   const country = `
//     <h2><img src="${flags.svg}" alt="${flags.alt}" width="50" height="auto"/> ${name.official}</h2>
//     <p><b>Capital</b>: ${capital}</p>
//     <p><b>Population</b>: ${population}</p>
//     <p><b>Languages</b>: ${languagesList}</p>
//   `;

//   galleryEl.innerHTML = country;
// }
// };

// export default renderImage;

//
