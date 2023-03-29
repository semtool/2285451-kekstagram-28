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

const START_SET = SET_OF_FILTERS[0];
let CLICKED_SET = START_SET;

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
    min: CLICKED_SET.min,
    max: CLICKED_SET.max,
  },
  step: CLICKED_SET.step,
  start: CLICKED_SET.max,
});

function recetEffects () {
  CLICKED_SET = START_SET;
  templateSlider();
}

const onAddsClassEffect = (evt) => {
  CLICKED_SET = SET_OF_FILTERS.find((set)=> set.name === evt.target.value);
  photoPreview.className = `effects__preview--${CLICKED_SET.name}`;
  templateSlider();
};

effectsBlock.addEventListener('change', onAddsClassEffect);

noUiSlider.create(sliderElement, {
  range: {
    min: START_SET.min,
    max: START_SET.min,
  },
  start: START_SET.min,
  step: START_SET.min,
  connect: 'lower',
});

const onChangeLevelEffect = () => {
  const sliderLevel = sliderElement.noUiSlider.get() ;
  if(CLICKED_SET === START_SET){
    photoPreview.style.filter = START_SET.style;
    hideSlaiderContainer();
  }else{
    photoPreview.style.filter = `${CLICKED_SET.style}(${sliderLevel}${CLICKED_SET.unit})`;
    levelEffect.value = sliderLevel;
    showSlaiderContainer();
  }
};

sliderElement.noUiSlider.on('update', onChangeLevelEffect);

export {recetEffects};
