import {isEscapeKey, isStringFits, isEqualStringsInArray} from './util.js';
const body=document.querySelector('body');
const imageUploadForm=document.querySelector('.img-upload__form');
const uploadFile=imageUploadForm.querySelector('#upload-file');
const imageUploadOverlay=imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel=imageUploadOverlay.querySelector('.img-upload__cancel');
const hashtagInput=imageUploadForm.querySelector('.text__hashtags');
const commentInput=imageUploadForm.querySelector('.text__description');
const hashtagMask=/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const onUploadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement!==hashtagInput && document.activeElement!==commentInput) {
    evt.preventDefault();
    closeUploadOverlay(evt);
  }
};

function openUploadOverlay(evt) {
  evt.preventDefault();
  body.classList.add('modal-open');
  imageUploadOverlay.classList.remove('hidden');
  imageUploadCancel.addEventListener('click', closeUploadOverlay);
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
}

function closeUploadOverlay (evt) {
  evt.preventDefault();
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value='';
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  imageUploadCancel.removeEventListener('click', closeUploadOverlay);
}
// При определении этой функции как стрелочной линтер ругается на то,
// что ее вызов происходит до объявления.
// const closeUploadOverlay = (evt) => {
//   evt.preventDefault();
//   imageUploadOverlay.classList.add('hidden');
//   body.classList.remove('modal-open');
//   document.removeEventListener('keydown', onUploadOverlayEscKeydown);
// };

const pristine = new Pristine(imageUploadForm);

const validateComment = (value) => isStringFits(value,140);

const validateHashtag = (value) => {
  const testValue=value.trim();
  // сервер принимает строку с пробелами в начале иил в конце,
  // а для пользователю лучше, чтобы ошибки возникали реже.
  if (testValue.length === 0) {
    //console.log('хештегов нет');
    return true;
  }
  const testWords=testValue.split(' ');
  if (testWords.length >5){
    //console.log('Больше 5 хештегов');
    return false;
  }
  for (let i=0; i<testWords.length; i++) {
    if (!hashtagMask.test(testWords[i])) {
      //console.log('Некорректные хештеги');
      return false;
    }
  }
  if (isEqualStringsInArray(testWords)) {
    //console.log('Одинаковые хештеги');
    return false;
  }
  return true;
};

pristine.addValidator(imageUploadForm.querySelector('.text__description'), validateComment,'Comment');

pristine.addValidator(imageUploadForm.querySelector('.text__hashtags'), validateHashtag,'Hashtag');

uploadFile.addEventListener('change', openUploadOverlay);

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()){
    imageUploadForm.submit();
  }
  else{
    //console.log('Проверка не прошла');
    // Как и куда отправлять сообщения об ошибках, я пока не разобрался.
  }
});
