import {photoPreview} from './change-scale.js';
const FILTERS = [
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

let clickedSet = FILTERS[0];

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

const createsTemplateSlider = () => sliderElement.noUiSlider.updateOptions({
  range: {
    min: clickedSet.min,
    max: clickedSet.max,
  },
  step: clickedSet.step,
  start: clickedSet.max,
});

function recetEffects () {
  clickedSet = FILTERS[0];
  createsTemplateSlider();
}

const onAddsClassEffect = (evt) => {
  clickedSet = FILTERS.find((set)=> set.name === evt.target.value);
  photoPreview.className = `effects__preview--${clickedSet.name}`;
  createsTemplateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: FILTERS[0].min,
    max: FILTERS[0].max,
  },
  start: FILTERS[0].min,
  step: FILTERS[0].step,
  connect: 'lower',
});

const onChangeLevelEffect = () => {
  const sliderLevel = sliderElement.noUiSlider.get() ;
  if(clickedSet === FILTERS[0]){
    photoPreview.style.filter = FILTERS[0].style;
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
