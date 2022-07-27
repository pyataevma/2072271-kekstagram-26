import {getShuffledArray} from './util.js';
const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const userPicturesFragment = document.createDocumentFragment();
const imageFiltersContainer = document.querySelector('.img-filters');
const filterButtons = imageFiltersContainer.querySelectorAll('.img-filters__button');

const findActiveFilter = () => {
  let currentFilterButton;
  filterButtons.forEach((button) => {
    if (button.classList.contains('img-filters__button--active')){
      currentFilterButton = button;
    }
  });
  return currentFilterButton;
};

const clearActiveFilter = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const replaceActiveFilter = (button) => {
  if (! button.classList.contains('img-filters__button--active')){
    clearActiveFilter();
    button.classList.add('img-filters__button--active');
  }
};

const setFilterClick = (cb) => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt)=>{
      evt.preventDefault();
      replaceActiveFilter(button);
      cb();
    });
  });
};

const displayImageFilter = () => {
  imageFiltersContainer.classList.remove('img-filters--inactive');
};

const removePhotos = ()=>{
  const presentPhotos = pictureContainer.querySelectorAll('.picture');
  presentPhotos.forEach((photo) => {
    pictureContainer.removeChild(photo);
  });
};

const addPhoto = (photo) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src=photo.url;
  newPicture.querySelector('.picture__likes').textContent=photo.likes;
  newPicture.querySelector('.picture__comments').textContent=photo.comments.length;
  userPicturesFragment.appendChild(newPicture);
};

const comparePhotos = (firstPhoto,secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;

const displayPhotos = (photos)=>{
  const currentFilterId=findActiveFilter().id;
  let selectedPhotos;
  switch(currentFilterId) {
    case 'filter-default':
      selectedPhotos=photos;
      break;
    case 'filter-random':
      selectedPhotos=getShuffledArray(photos).slice(0,10);
      break;
    case 'filter-discussed':
      selectedPhotos=photos.slice().sort(comparePhotos);
  }
  selectedPhotos.forEach ((photo) => {
    addPhoto(photo);
  });
  removePhotos();
  pictureContainer.appendChild(userPicturesFragment);
};

export{displayPhotos,displayImageFilter,setFilterClick};
