function getRandomInteger(minimalValue, maximalValue) {
  if (minimalValue < 0) {
    minimalValue = 0;
  }
  if (maximalValue <= minimalValue) {
    return Math.floor(minimalValue);
    // Если максимальное значение <= минимального,
    // то функция возвращает округленное вниз минимальное значение или ноль.
  }
  return Math.floor(Math.random() * (maximalValue - minimalValue) + minimalValue);
}

function checkStringFits(examinedString, maximalLength) {
  return examinedString.length <= maximalLength;
}

checkStringFits('Some string',10);

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

function getShufledIndeces(arraySize) {
  const shufledIndeces=[];
  for (let i=0; i<arraySize; i++) {
    shufledIndeces[i]=i;
  }
  for (let i=0; i<arraySize; i++){
    const randomIndex=getRandomInteger(0,arraySize-1);
    const swap=shufledIndeces[i];
    shufledIndeces[i]=shufledIndeces[randomIndex];
    shufledIndeces[randomIndex]=swap;
  }
  return shufledIndeces;
}

function createComment(givenId) {
  return {
    id: givenId,
    avatar: `img/avatar-${getRandomInteger(1,MAX_AVATARS_NUMBER)}.svg`,
    message: mockComments[getRandomInteger(1, mockComments.length)],
    name: mockNames[getRandomInteger(1, mockNames.length)],
  };
}

function createAllComments() {
  const numberOfComments=getRandomInteger(0,MAX_NUMBER_OF_COMMENTS);
  const allComments=[];
  const shufledIndeces=getShufledIndeces(numberOfComments);
  for (let i=0; i<numberOfComments; i++) {
    allComments[i]=createComment(shufledIndeces[i]);
  }
  return allComments;
}

function createPhoto(givenId, imageIndex){
  return {
    id: givenId,
    url: `photos/${imageIndex+1}.jpg`,
    description: photoDescriptions[imageIndex],
    likes: getRandomInteger(15, 200),
    comments: createAllComments()
  };
}

function createAllPhotos(){
  const allPhotos=[];
  const photoIdentificators=getShufledIndeces(NUMBER_OF_PHOTOS);
  const imageIndeces=getShufledIndeces(NUMBER_OF_PHOTOS);
  for (let i=0; i<NUMBER_OF_PHOTOS; i++) {
    allPhotos[i]=createPhoto(photoIdentificators[i],imageIndeces[i]);
  }
  return allPhotos;
}

createAllPhotos();
