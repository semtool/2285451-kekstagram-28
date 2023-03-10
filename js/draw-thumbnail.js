import {generateCardsDescription} from './create-description.js';

const picturesContainer = document.querySelector('.pictures');

const thumbnailTemplete = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailArray = generateCardsDescription();

const thumbnailBox = document.createDocumentFragment();

thumbnailArray.forEach((item)=>{
  const newThumbnail = thumbnailTemplete.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = item.url;
  newThumbnail.querySelector('.picture__likes').textContent = item.likes;
  newThumbnail.querySelector('.picture__comments').textContent = item.comments.length;
  thumbnailBox.appendChild(newThumbnail);
});

const renderCards = () => picturesContainer.appendChild(thumbnailBox);

export {renderCards};
