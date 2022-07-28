import {isEscapeKey} from './util.js';
const body = document.querySelector('body');
const bigPictureSection = document.querySelector('section.big-picture');
const bigPictureImage = bigPictureSection.querySelector('div.big-picture__img > img');
const bigPictureLikes = bigPictureSection.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureSection.querySelector('.comments-count');
const bigPictureSocialCommentsCount = bigPictureSection.querySelector('.social__comment-count');
const bigPictureCaption = bigPictureSection.querySelector('p.social__caption');
const bigPictureCancelButton = bigPictureSection.querySelector('button.big-picture__cancel');
const bigPictureCommentsLoader = bigPictureSection.querySelector('button.comments-loader');
const bigPictureCommentsList = bigPictureSection.querySelector('ul.social__comments');
const bigPictureComment = bigPictureSection.querySelector('li.social__comment');

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  bigPictureSection.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

function onBigPictureEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const clearComments = () =>{
  const presentComments = bigPictureCommentsList.querySelectorAll('li.social__comment');
  presentComments.forEach((comment) => {
    bigPictureCommentsList.removeChild(comment);
  });
};

const addComment = (comment) =>{
  const newComment = bigPictureComment.cloneNode(true);
  newComment.querySelector('p.social__text').textContent = comment.message;
  newComment.querySelector('img.social__picture').src = comment.avatar;
  newComment.querySelector('img.social__picture').alt = comment.name;
  bigPictureCommentsList.appendChild(newComment);
};

const displayBigPicture = (photo) => {
  body.classList.add('modal-open');
  bigPictureSection.classList.remove('hidden');
  bigPictureImage.src = photo.url;
  bigPictureCaption.textContent = photo.description;
  bigPictureLikes.textContent=photo.likes;
  bigPictureCommentsCount.textContent=photo.comments.length;
  clearComments();
  photo.comments.forEach((comment)=>{
    addComment(comment);
  });
  bigPictureCommentsLoader.classList.add('hidden');
  bigPictureSocialCommentsCount.classList.add('hidden');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCancelButton.addEventListener('click',()=>{
    closeBigPicture();
  });
};

export{displayBigPicture};
