import './sass/index.scss';
import axiosGetImg from './js/axiosGetImg';
import renderImage from './js/renderImage';

const form = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.style.display = 'none';
let currentSearchValue = ''; //Задаем начальное значение текущего поискового запроса в пустую строку
let page = 1; //Задаем начальное значение текущей страницы результатов поиска в 1

//функция для поиска изображений с помощью API и отображения их на странице
const searchImages = () => {
  axiosGetImg(currentSearchValue, page)
    .then(response => {
      renderImage(response, page === 1);
      if (response.data.totalHits > page * 40) {
        //проверка наличия дополнительных страниц результатов поиска и отображение кнопки "Загрузить еще" в случае их наличия
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
      page++; //увеличение значения текущей страницы на 1
    })
    .catch(error => console.log(error));
};

//функция для обработки отправки формы поиска.
const onFormSubmit = e => {
  e.preventDefault();

  const searchValue = form.elements.searchQuery.value;

  if (!searchValue.trim()) {
    // проверка наличия поискового запроса и предотвращение отправки пустого запроса
    return;
  }

  //проверка изменения поискового запроса и очистка галереи и сброс текущей страницы при изменении запроса.
  if (currentSearchValue !== searchValue) {
    galleryEl.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    page = 1;
  }

  currentSearchValue = searchValue; //это обновление значения текущего поискового запроса, которое было сохранено в переменной currentSearchValue. Это позволяет сохранять текущее значение запроса и использовать его для проверки изменений при последующих поисках.
  searchImages();
};

form.addEventListener('submit', onFormSubmit);

loadMoreBtn.addEventListener('click', () => {
  searchImages();
});
// loadMoreBtn.addEventListener('click', searchImages);
