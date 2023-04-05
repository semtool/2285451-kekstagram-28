import {recetEffects} from './change-effects.js';
import {onReturnDafaultScale} from './change-scale.js';
import {sendData} from './server-interaction.js';

const CORRECT_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_QUANTITY = 5;
const ERROR_MESSAGE = 'Правильно заполните поле';

const editingForm = document.querySelector('.img-upload__overlay');
const loadingFileButton = document.querySelector('#upload-file');

const loadingFormButton = document.querySelector('#upload-submit');

const outputEditingForm = document.querySelector('#upload-cancel');
const hashtagField = editingForm.querySelector('.text__hashtags');
const descriptionField = editingForm.querySelector('.text__description');

const mainEditingForm = document.querySelector('#upload-select-image');

const errorTemplate = document.querySelector('#error').content;
const errorBox = document.createDocumentFragment();
const newErrorTamplate = errorTemplate.cloneNode(true);
const newErrorSection = newErrorTamplate.querySelector('.error');
const errorButtun = newErrorTamplate.querySelector('.error__button');
errorBox.appendChild(newErrorTamplate);

const successTemplate = document.querySelector('#success').content;
const successBox = document.createDocumentFragment();
const newSuccessTamplate = successTemplate.cloneNode(true);
const newSuccessSection = newSuccessTamplate.querySelector('.success');
const successButtun = newSuccessTamplate.querySelector('.success__button');
successBox.appendChild(newSuccessTamplate);

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
  loadingFormButton.removeAttribute('disabled', true);
}

const blockSubmitButton = () => {
  loadingFormButton.disabled = true;
};

const unblockloadingFormButton = () => {
  loadingFormButton.disabled = false;
};

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

loadingFileButton.addEventListener('change', onOpenEditingForm);
outputEditingForm.addEventListener('click', onCloseEditingForm);

const setUserFormSubmit = () => {
  mainEditingForm.addEventListener('submit', (evt)=> {
    evt.preventDefault();
    if(pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onCloseEditingForm();
          createSsuccessMesage();
        })
        .catch(() => {
          createsErrorMesage();
        })
        .finally(unblockloadingFormButton);
    }
  });
};

const onEscapeErrorMesage = (evt) => {
  if (evt.key === 'Escape') {
    onHideErrorMesage();
  }
};

const onCloseErrorMesage = (evt) => {
  if (evt.target === newErrorSection) {
    onHideErrorMesage();
  }
};

function createsErrorMesage () {
  document.body.append(errorBox);
  newErrorSection.classList.remove('hidden');
  document.removeEventListener('keydown', onExitFromFormByEsc);
  document.addEventListener('keydown', onEscapeErrorMesage);
}

function onHideErrorMesage () {
  newErrorSection.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeErrorMesage);
  document.addEventListener('keydown', onExitFromFormByEsc);
}

const onEscapeSuccessMesage = (evt) => {
  if (evt.key === 'Escape') {
    onHidesuccessMesage();
  }
};

const onCloseSuccessMesage = (evt) => {
  if (evt.target === newSuccessSection) {
    onHidesuccessMesage();
  }
};

function createSsuccessMesage () {
  document.body.append(successBox);
  newSuccessSection.classList.remove('hidden');
  document.addEventListener('keydown', onEscapeSuccessMesage);
}

function onHidesuccessMesage () {
  newSuccessSection.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeSuccessMesage);
}

newErrorSection.addEventListener('click', onCloseErrorMesage);
errorButtun.addEventListener('click',onHideErrorMesage);
newSuccessSection.addEventListener('click', onCloseSuccessMesage);
successButtun.addEventListener('click',onHidesuccessMesage);

export { setUserFormSubmit };
