import './sass/index.scss';
import axiosGetImg from './js/axiosGetImg';
import renderImage from './js/renderImage';
import './js/simplelightbox';

const form = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.style.display = 'none';
let currentSearchValue = '';
let page = 1;

const searchImages = () => {
  axiosGetImg(currentSearchValue, page)
    .then(response => {
      renderImage(response, page === 1);
      if (response.data.totalHits > page * 40) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
      page++;
    })
    .catch(error => console.log(error));
};

const onFormSubmit = e => {
  e.preventDefault();

  const searchValue = form.elements.searchQuery.value;

  if (!searchValue.trim()) {
    return;
  }

  if (currentSearchValue !== searchValue) {
    galleryEl.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    page = 1;
  }

  currentSearchValue = searchValue;
  searchImages();
};

form.addEventListener('submit', onFormSubmit);

loadMoreBtn.addEventListener('click', () => {
  searchImages();
});
