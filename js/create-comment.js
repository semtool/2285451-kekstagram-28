import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement} from './util.js';

const MESSAGE_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES_LIST = [
  'Alex',
  'Peter',
  'Ann',
  'Boris',
  'Yakov',
  'Ioan',
];

const generateIdAvatar = createRandomIdFromRangeGenerator(1, 250);

const createComments = ()=>({
  id: generateIdAvatar(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE_LIST),
  name: getRandomArrayElement(NAMES_LIST),
});

const generateCardsComments = () => Array.from({length: 5}, createComments);

export {generateCardsComments};
