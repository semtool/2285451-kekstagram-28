import { generateCardsDescription } from './create-description.js';

import { openBigPictureContainer, bigPictureContainer} from './show-large-photos.js';

const picturesContainer = document.querySelector('.pictures');

const thumbnailTemplete = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailBox = document.createDocumentFragment();

const thumbnailArray = generateCardsDescription();

const commentstBlock = document.querySelector('.social__comments');
const commentPattern = commentstBlock.querySelector('.social__comment');

const coutns = bigPictureContainer.querySelector('.social__comment-count');
const loaders = bigPictureContainer.querySelector('.comments-loader');




thumbnailArray.forEach((item) => {
  const newThumbnail = thumbnailTemplete.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = item.url;
  newThumbnail.querySelector('.picture__img').alt = item.description;
  newThumbnail.querySelector('.picture__likes').textContent = item.likes;
  newThumbnail.querySelector('.picture__comments').textContent = item.comments.length;
  newThumbnail.dataset.newThumbnailId = item.id;
  thumbnailBox.appendChild(newThumbnail);

  newThumbnail.addEventListener('click', () => {

    openBigPictureContainer();
    bigPictureContainer.querySelector('.big-picture__img > img').src = newThumbnail.querySelector('.picture__img').src;
    bigPictureContainer.querySelector('.likes-count').textContent = newThumbnail.querySelector('.picture__likes').textContent;
    bigPictureContainer.querySelector('.comments-count').textContent = newThumbnail.querySelector('.picture__comments').textContent;
    bigPictureContainer.querySelector('.social__caption').textContent = newThumbnail.querySelector('.picture__img').alt;

    const sameId = thumbnailArray.find((thumbnail)=> thumbnail.id === +newThumbnail.dataset.newThumbnailId);
    let quantityComments = 0;
    const portionComments = 5;

    function addPortionComments () {
      quantityComments += portionComments;
      let addedComments = 0;
      commentstBlock.innerHTML = '';

      if(sameId){
        for (let i = 0 ; i < quantityComments ; i++) {
          const newComment = commentPattern.cloneNode(true);

          if(addedComments >= sameId.comments.length){
            bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
          }else{
            bigPictureContainer.querySelector('.comments-loader').classList.remove('hidden');
          }
          newComment.querySelector('.social__picture').src = sameId.comments[i].avatar;
          newComment.querySelector('.social__picture').alt = sameId.comments[i].name;
          newComment.querySelector('.social__text').textContent = sameId.comments[i].message;
          commentstBlock.appendChild(newComment);
          addedComments ++;
          coutns.innerHTML = `${addedComments} из <span class="comments-count">${sameId.comments.length}</span> комментариев`;
        }
      }
    }

    addPortionComments();

    loaders.addEventListener('click', addPortionComments);
  });
});

const renderCards = () => picturesContainer.appendChild(thumbnailBox);

export { renderCards };

