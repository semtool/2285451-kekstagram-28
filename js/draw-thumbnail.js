import { generateCardsDescription } from './create-description.js';

import { openBigPictureContainer, bigPictureContainer} from './show-large-photos.js';

const picturesContainer = document.querySelector('.pictures');

const thumbnailTemplete = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailBox = document.createDocumentFragment();

const thumbnailArray = generateCardsDescription();

const commentstBlock = document.querySelector('.social__comments');
const commentPattern = commentstBlock.querySelector('.social__comment');

thumbnailArray.forEach((item) => {
  const newThumbnail = thumbnailTemplete.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = item.url;
  newThumbnail.querySelector('.picture__img').alt = item.description;
  newThumbnail.querySelector('.picture__likes').textContent = item.likes;
  newThumbnail.querySelector('.picture__comments').textContent = item.comments.length;
  newThumbnail.dataset.newThumbnailId = item.id;
  thumbnailBox.appendChild(newThumbnail);
});

const renderCards = () => picturesContainer.appendChild(thumbnailBox);

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const thumbnailClicked = evt.target.closest('.picture');
    bigPictureContainer.querySelector('.big-picture__img > img').src = thumbnailClicked.querySelector('.picture__img').src;
    bigPictureContainer.querySelector('.likes-count').textContent = thumbnailClicked.querySelector('.picture__likes').textContent;
    bigPictureContainer.querySelector('.comments-count').textContent = thumbnailClicked.querySelector('.picture__comments').textContent;
    bigPictureContainer.querySelector('.social__caption').textContent = thumbnailClicked.querySelector('.picture__img').alt;
    bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
    openBigPictureContainer();
    commentstBlock.innerHTML = '';
    thumbnailArray.find((item)=>{
      if(item.id === + thumbnailClicked.dataset.newThumbnailId){
        const commentsArray = item.comments;
        commentsArray.forEach((comment) => {
          const newComment = commentPattern.cloneNode(true);
          newComment.querySelector('.social__picture').src = comment.avatar;
          newComment.querySelector('.social__picture').alt = comment.name;
          newComment.querySelector('.social__text').textContent = comment.message;
          commentstBlock.appendChild(newComment);
        });
      }
    });
  }
});

export { renderCards };

