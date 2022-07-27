import {getRandomInteger,getShuffledIndeces} from './util.js';

const MAX_NUMBER_OF_COMMENTS=10;
const MAX_AVATARS_NUMBER=6;
const NUMBER_OF_PHOTOS=25;

const mockComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const mockNames = [
  'Петр',
  'Павел',
  'Роберт',
  'Илья',
  'Анна',
  'Александр',
  'Александра',
  'Елизавета',
  'Екатерина'
];

const photoDescriptions = [
  'Отель',
  'Дорога на пляж',
  'Море',
  'Девушка',
  'Суп',
  'Черная машина',
  'Ягода',
  'Напиток',
  'Самолет над пляжем',
  'Обувь',
  'Забор',
  'Белая машина',
  'Рыба с овощами',
  'Кот',
  'Угги',
  'Самолет в небе',
  'Хор',
  'Красная машина',
  'Тапочки',
  'Пальмы',
  'Салат с лимоном',
  'Закат',
  'Краб',
  'Концерт',
  'Джип'
];


const createComment = (givenId) => (
  {
    id: givenId,
    avatar: `img/avatar-${getRandomInteger(1,MAX_AVATARS_NUMBER)}.svg`,
    message: mockComments[getRandomInteger(1, mockComments.length)],
    name: mockNames[getRandomInteger(1, mockNames.length)]
  }
);

const createAllComments = () => {
  const numberOfComments=getRandomInteger(0,MAX_NUMBER_OF_COMMENTS);
  const allComments=[];
  const shuffledIndeces=getShuffledIndeces(numberOfComments);
  for (let i=0; i<numberOfComments; i++) {
    allComments[i]=createComment(shuffledIndeces[i]);
  }
  return allComments;
};

const createPhoto = (givenId, imageIndex) => (
  {
    id: givenId,
    url: `photos/${imageIndex+1}.jpg`,
    description: photoDescriptions[imageIndex],
    likes: getRandomInteger(15, 200),
    comments: createAllComments()
  }
);

const createAllPhotos = () => {
  const allPhotos=[];
  const photoIdentificators=getShuffledIndeces(NUMBER_OF_PHOTOS);
  const imageIndeces=getShuffledIndeces(NUMBER_OF_PHOTOS);
  for (let i=0; i<NUMBER_OF_PHOTOS; i++) {
    allPhotos[i]=createPhoto(photoIdentificators[i],imageIndeces[i]);
  }
  return allPhotos;
};

export{createAllPhotos};
