import { picturesContainer, renderCards } from './draw-thumbnail.js';
import { debounce } from './util.js';

const PPORTION_PFOTOS = 10;

const filtersContainer = document.querySelector('.img-filters');
// gkgkgkgkgkgk
const showFiltersContainer = () => filtersContainer.classList.remove('img-filters--inactive');

const cleansButtonStatus = () => {
  const allButtons = filtersContainer.querySelectorAll('.img-filters__button');
  allButtons.forEach((element)=>element.classList.remove('img-filters__button--active'));
};

const cleansPicturesContainer = (container) => {
  container.querySelectorAll('.picture').forEach((element)=>element.remove());
};

const debouncedRenderCards = debounce(renderCards);
const debouncedCleansPicturesContainer = debounce(cleansPicturesContainer);
let filteredData = [];

const selectFilter = (data) => {
  filtersContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')){
      cleansButtonStatus();
      evt.target.classList.add('img-filters__button--active');
      if(evt.target.id === 'filter-random'){
        filteredData = data.slice().sort(() => Math.random() - 0.5).slice(0, PPORTION_PFOTOS);
      }else if(evt.target.id === 'filter-discussed'){
        filteredData = data.slice().sort((picA,picB) => picB.comments.length - picA.comments.length);
      }else{
        filteredData = data;
      }
      debouncedCleansPicturesContainer(picturesContainer);
      debouncedRenderCards(filteredData);
    }
  });
};

export {showFiltersContainer, selectFilter};
