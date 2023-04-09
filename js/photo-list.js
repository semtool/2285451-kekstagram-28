import { picturesContainer } from './draw-thumbnail.js';

const PPORTION_PFOTOS = 10;

const cleansFiltersContainer = (contain) => {
  contain.querySelectorAll('.picture').forEach((element)=>element.remove());
};

const filtersContainer = document.querySelector('.img-filters');
// filtersContainer.classList.remove('img-filters--inactive');
const discussedButton = filtersContainer.querySelector('#filter-discussed');
const randomButton = filtersContainer.querySelector('#filter-random');
const defaultButton = filtersContainer.querySelector('#filter-default');

const showFiltersContainer = () => filtersContainer.classList.remove('img-filters--inactive');

const sortsRandomly = (mass) => mass.slice().sort(() => Math.random() - 0.5).slice(0, PPORTION_PFOTOS);
const sortsByRating = (mass) => mass.slice().sort((picA,picB) => picB.comments.length - picA.comments.length);

const cleansButtonStatus = () => {
  const allButtons = filtersContainer.querySelectorAll('.img-filters__button');
  allButtons.forEach((element)=>element.classList.remove('img-filters__button--active'));
};

const addsButtonStatus = (evt) => {
  evt.target.classList.add('img-filters__button--active');
};

const selectedByRating = (rendering) => {
  discussedButton.addEventListener('click', (evt) => {
    cleansButtonStatus();
    addsButtonStatus (evt);
    cleansFiltersContainer(picturesContainer);
    rendering();
  });
};

const selectedRandomly = (rendering) => {
  randomButton.addEventListener('click', (evt) => {
    cleansButtonStatus();
    addsButtonStatus (evt);
    cleansFiltersContainer(picturesContainer);
    rendering();
  });
};

const selectedDefolt = (rendering) => {
  defaultButton.addEventListener('click', (evt) => {
    cleansButtonStatus();
    addsButtonStatus (evt);
    cleansFiltersContainer(picturesContainer);
    rendering();
  });
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {showFiltersContainer, sortsRandomly, sortsByRating, selectedByRating, selectedRandomly, selectedDefolt, debounce};
