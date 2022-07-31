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
const COMMENT_BUNCH_SIZE=5;
let commentCounter=0;
let currentComments;

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const clearComments = () => {
  const presentComments = bigPictureCommentsList.querySelectorAll('li.social__comment');
  presentComments.forEach((comment) => {
    bigPictureCommentsList.removeChild(comment);
  });
  commentCounter=0;
};

const addComment = (comment) =>{
  const newComment = bigPictureComment.cloneNode(true);
  newComment.querySelector('p.social__text').textContent = comment.message;
  newComment.querySelector('img.social__picture').src = comment.avatar;
  newComment.querySelector('img.social__picture').alt = comment.name;
  bigPictureCommentsList.appendChild(newComment);
};

const addCommentBunch = () =>{
  if (commentCounter < currentComments.length){
    const firstComment = commentCounter;
    commentCounter+=COMMENT_BUNCH_SIZE;
    if (commentCounter>currentComments.length){
      commentCounter = currentComments.length;
    }
    bigPictureSocialCommentsCount.textContent=`${commentCounter} из ${currentComments.length} комментариев`;
    for(let i = firstComment; i<commentCounter; i++) {
      addComment(currentComments[i]);
    }
  }
  if (commentCounter === currentComments.length){
    bigPictureCommentsLoader.classList.add('hidden');
  }
};

const onCommentsLoaderClick = () => {
  addCommentBunch();
};

const onCancelButtonClick = (evt)=>{
  evt.preventDefault();
  closeBigPicture();
};

function closeBigPicture () {
  body.classList.remove('modal-open');
  bigPictureSection.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCommentsLoader.removeEventListener('click', onCommentsLoaderClick);
  bigPictureCancelButton.removeEventListener('click', onCancelButtonClick);
}

const displayBigPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureCaption.textContent = photo.description;
  bigPictureLikes.textContent=photo.likes;
  bigPictureCommentsCount.textContent=photo.comments.length;
  clearComments();
  currentComments = photo.comments;
  if (currentComments.length>0){
    bigPictureCommentsLoader.classList.remove('hidden');
  }
  addCommentBunch();
  document.addEventListener('keydown', onBigPictureEscKeydown);
  bigPictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);
  bigPictureCancelButton.addEventListener('click', onCancelButtonClick);
  body.classList.add('modal-open');
  bigPictureSection.classList.remove('hidden');
};

export{displayBigPicture};
