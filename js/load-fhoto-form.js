const button = document.querySelector('.img-upload__label');
const buttonаа = document.querySelector('.img-upload__overlay ');

button.addEventListener('click',()=>{
    buttonаа.classList.remove('hidden');
    console.log(buttonаа);
});



const wizardForm = document.querySelector('.img-upload__form');

console.log(wizardForm);

const pristine = new Pristine(wizardForm);

console.log(pristine);
