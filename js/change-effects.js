import {photoPreview} from './change-scale.js';
const SET_OF_FILTERS = [
  {
    name: 'none',
    style: 'none',
    min: 0 ,
    max: 100,
    step: 1,
    unit:'',
  } ,

  {
    name: 'chrome',
    style: 'grayscale',
    min: 0 ,
    max: 1,
    step: 0.1,
    unit:'',
  } ,

  {
    name: 'sepia',
    style: 'sepia',
    min: 0 ,
    max: 1,
    step: 0.1,
    unit:'',
  },

  {
    name: 'marvin',
    style: 'invert',
    min: 1 ,
    max: 100,
    step: 1,
    unit:'%',
  },

  {
    name: 'phobos',
    style: 'blur',
    min: 0 ,
    max: 3,
    step: 0.1,
    unit:'px',

  },

  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit:'',
  },
];

let clickedSet = SET_OF_FILTERS[0];

const effectsBlock = document.querySelector('.effects');
const sliderSetsContainer = document.querySelector('.img-upload__effect-level');
const levelEffect = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');

function hideSlaiderContainer () {
  sliderSetsContainer.classList.add('hidden');
}

function showSlaiderContainer () {
  sliderSetsContainer.classList.remove('hidden');
}

const templateSlider = ()=> sliderElement.noUiSlider.updateOptions({
  range: {
    min: clickedSet.min,
    max: clickedSet.max,
  },
  step: clickedSet.step,
  start: clickedSet.max,
});

function recetEffects () {
  clickedSet = SET_OF_FILTERS[0];
  templateSlider();
}

const onAddsClassEffect = (evt) => {
  clickedSet = SET_OF_FILTERS.find((set)=> set.name === evt.target.value);
  photoPreview.className = `effects__preview--${clickedSet.name}`;
  templateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: SET_OF_FILTERS[0].min,
    max: SET_OF_FILTERS[0].max,
  },
  start: SET_OF_FILTERS[0].min,
  step: SET_OF_FILTERS[0].step,
  connect: 'lower',
});

const onChangeLevelEffect = () => {
  const sliderLevel = sliderElement.noUiSlider.get() ;
  if(clickedSet === SET_OF_FILTERS[0]){
    photoPreview.style.filter = SET_OF_FILTERS[0].style;
    hideSlaiderContainer();
  }else{
    photoPreview.style.filter = `${clickedSet.style}(${sliderLevel}${clickedSet.unit})`;
    levelEffect.value = sliderLevel;
    showSlaiderContainer();
  }
};

effectsBlock.addEventListener('change', onAddsClassEffect);
sliderElement.noUiSlider.on('update', onChangeLevelEffect);

export {recetEffects};
