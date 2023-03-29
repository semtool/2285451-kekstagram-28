const CORRECT_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_QUANTITY = 5;
const ERROR_MESSAGE = 'Правильно заполните поле';

const DEFAULT_SCALE = 100;
const STEP_SCALE = 25;
const MIN_SCALE = 25;


const editingForm = document.querySelector('.img-upload__overlay');
const loadingFileButton = document.querySelector('#upload-file');
const outputEditingForm = document.querySelector('#upload-cancel');
const hashtagField = editingForm.querySelector('.text__hashtags');
const descriptionField = editingForm.querySelector('.text__description');

const mainEditingForm = document.querySelector('#upload-select-image');

const photoPreview = document.querySelector('.img-upload__preview > img ');
const buttonPhotoBigger = document.querySelector('.scale__control--bigger');
const buttonPhotoSmaller = document.querySelector('.scale__control--smaller');
const outputScale = document.querySelector('.scale__control--value');

const onExitFromFormByEsc = (evt) => {
  if (evt.key === 'Escape') {
    if(hashtagField === document.activeElement || descriptionField === document.activeElement) {
      return;
    }
    mainEditingForm.reset();
    onCloseEditingForm();
  }
};

function onOpenEditingForm () {
  editingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onExitFromFormByEsc);
}

function onCloseEditingForm () {
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onExitFromFormByEsc);
  loadingFileButton.value = '';
  mainEditingForm.reset();
  onReturnDafaultScale();
}

const pristine = new Pristine(mainEditingForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

const isCorrectTag = (tag) => CORRECT_HASHTAG_SYMBOLS.test(tag);

const hasCorrectTagsCount = (tags) => tags.length <= MAX_HASHTAG_QUANTITY;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = (tags).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tagsArr = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasCorrectTagsCount(tagsArr) && tagsArr.every(isCorrectTag) && hasUniqueTags(tagsArr);
};

pristine.addValidator (
  hashtagField,
  validateTags,
  ERROR_MESSAGE
);

const onValidData = (evt)=> {
  evt.preventDefault();
  if(pristine.validate()) {
    mainEditingForm.submit();
  }
};

let scaleNumber = parseInt(outputScale.value, 10);

function onChangeScale (volue) {
  outputScale.value = `${volue}%`;
  photoPreview.style.transform = `scale(${ volue / 100})`;
}

function onIncreaseStepScale () {
  if(scaleNumber < DEFAULT_SCALE){
    scaleNumber += STEP_SCALE;
    onChangeScale(scaleNumber);
  }
}

function onDecreaseStepScale () {
  if(scaleNumber > MIN_SCALE){
    scaleNumber -= STEP_SCALE;
    onChangeScale(scaleNumber);
  }
}

function onReturnDafaultScale () {
  scaleNumber = DEFAULT_SCALE;
  onChangeScale(DEFAULT_SCALE);
}

loadingFileButton.addEventListener('change', onOpenEditingForm);
outputEditingForm.addEventListener('click', onCloseEditingForm);
mainEditingForm.addEventListener('submit', onValidData);

buttonPhotoBigger.addEventListener('click', onIncreaseStepScale);
buttonPhotoSmaller.addEventListener('click', onDecreaseStepScale);





const Element = document.querySelector('.img-upload__preview');
const none = document.querySelector('.effects__list');
const sliderElement = document.querySelector('effect-level__slider');
const sepia = document.querySelector('#effect-sepia');
const marvin = document.querySelector('#effect-marvin');
const phobos = document.querySelector('#effect-phobos');
const heat = document.querySelector('#effect-heat');


// none.addEventListener('click', (evt)=>{
//     if(evt.target.value){
//       Element.className = `effects__preview--${evt.target.value}`;
//     }
// });


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
});