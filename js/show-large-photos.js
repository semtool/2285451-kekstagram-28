const newBody = document.querySelector('body');

const bigPictureContainer = document.querySelector('.big-picture');

const bigPictureClose = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPictureContainer();
  }
};

function openBigPictureContainer () {
  bigPictureContainer.classList.remove('hidden');
  newBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPictureContainer () {
  bigPictureContainer.classList.add('hidden');
  newBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureClose.addEventListener('click', () =>{
  closeBigPictureContainer ();
});

export {openBigPictureContainer, bigPictureContainer};
