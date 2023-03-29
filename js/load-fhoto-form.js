import {recetEffects} from './change-effects.js';
import {onReturnDafaultScale} from './change-scale.js';

const CORRECT_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_QUANTITY = 5;
const ERROR_MESSAGE = 'Правильно заполните поле';

const editingForm = document.querySelector('.img-upload__overlay');
const loadingFileButton = document.querySelector('#upload-file');
const outputEditingForm = document.querySelector('#upload-cancel');
const hashtagField = editingForm.querySelector('.text__hashtags');
const descriptionField = editingForm.querySelector('.text__description');

const mainEditingForm = document.querySelector('#upload-select-image');

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
  recetEffects();
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

loadingFileButton.addEventListener('change', onOpenEditingForm);
outputEditingForm.addEventListener('click', onCloseEditingForm);
mainEditingForm.addEventListener('submit', onValidData);
