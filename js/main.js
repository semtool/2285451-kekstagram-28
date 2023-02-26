const DESCRIPTION_LIST = [
  'Отель',
  'Направление',
  'Пляж',
  'Бикини',
  'Суп',
  'Авто',
  'Клубника',
  'Сок',
  'Самолет',
  'Обувь',
  'Песок',
  'Ауди',
  'Овощи',
  'Суши- кот',
  'Унты',
  'Реактивный след',
  'Хор',
  'Ретро -авто',
  'Фары- тапки',
  'Двор с пальмамами',
  'Завтрак вегана',
  'Морской закат',
  'Веселый крабик',
  'Концерт',
  'Сафари',
];

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

const COUNT_CARDS = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createDescription = () => ({
  id: getRandomInteger(0, 25),
  url: `photos/ ${getRandomInteger(0, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION_LIST),
  likes: getRandomInteger(15, 200),
  comments:{
    id: getRandomInteger(0, 220),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE_LIST),
    name: getRandomArrayElement(NAMES_LIST),
  }
});

const cardsDescriotion = Array.from({length: COUNT_CARDS}, createDescription);

console.log(cardsDescriotion);
