const pictureContainer=document.querySelector('.pictures');
const pictureTemplate=document.querySelector('#picture').content;
const userPicturesFragment=document.createDocumentFragment();

const displayPhotos = (photos)=>{
  photos.forEach ((photo) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src=photo.url;
    newPicture.querySelector('.picture__likes').textContent=photo.likes;
    newPicture.querySelector('.picture__comments').textContent=photo.comments.length;
    userPicturesFragment.appendChild(newPicture);
  });
  pictureContainer.appendChild(userPicturesFragment);
};

export{displayPhotos};
