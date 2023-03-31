import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '34776092-e1ad4760d698a403538ddbaea';

const axiosOptions = {
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
};

const axiosGetImg = async (currentSearchValue, page = 1) => {
  try {
    const response = await axios.get(
      `?q=${currentSearchValue}&page=${page}`,
      axiosOptions
    );

    if (response.data.totalHits > 0) {
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );

      if (response.data.totalHits <= page * 40) {
        const loadMoreBtn = document.querySelector('.load-more');
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }
      return response;
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export default axiosGetImg;

// v2

// const axiosGetImg = searchInput => {
//   return axios
//     .get(
//       `https://pixabay.com/api/?key=34776092-e1ad4760d698a403538ddbaea&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
//     )
//     .then(response => {
//       if (response.data.totalHits > 0) {
//         Notiflix.Notify.success(
//           `Hooray! We found ${response.data.totalHits} images.`
//         );
//         return response;
//       } else {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }
//     })
//     .then(data => {
//       console.log(data); // проверка ответа в консоли
//       return data;
//     })
//     .catch(error => console.log(error));
// };

// export default axiosGetImg;
