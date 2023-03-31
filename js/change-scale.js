const DEFAULT_SCALE = 100;
const STEP_SCALE = 25;
const MIN_SCALE = 25;

const photoPreview = document.querySelector('.img-upload__preview > img ');
const buttonPhotoBigger = document.querySelector('.scale__control--bigger');
const buttonPhotoSmaller = document.querySelector('.scale__control--smaller');
const outputScale = document.querySelector('.scale__control--value');


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
  onChangeScale(scaleNumber);
}

buttonPhotoBigger.addEventListener('click', onIncreaseStepScale);
buttonPhotoSmaller.addEventListener('click', onDecreaseStepScale);

export {onReturnDafaultScale, photoPreview};
