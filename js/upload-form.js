import {isEscapeKey, isStringFits, isEqualStringsInArray} from './util.js';
import {sendData} from './server-interactions.js';
import {setDefaultEffect} from './image-effects.js';
const body = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imageUploadForm.querySelector('#upload-file');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = imageUploadOverlay.querySelector('.img-upload__cancel');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const errorMessageTemplate = document.querySelector('#error').content;
const successMessageTemplate = document.querySelector('#success').content;
const previewImage = document.querySelector('.img-upload__preview img');
const hashtagMask = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const setDefaultFields = () => {
  uploadFile.value='';
  hashtagInput.value='';
  commentInput.value='';
};

const setFormDefaultValues = () => {
  setDefaultFields();
  setDefaultEffect();
};

const onUploadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== hashtagInput && document.activeElement !== commentInput) {
    evt.preventDefault();
    setFormDefaultValues();
    closeUploadOverlay();
  }
};

const onUploadOverlayCancelClick = (evt) => {
  evt.preventDefault();
  setFormDefaultValues();
  closeUploadOverlay();
};

function openUploadOverlay() {
  body.classList.add('modal-open');
  imageUploadOverlay.classList.remove('hidden');
  imageUploadCancel.addEventListener('click', onUploadOverlayCancelClick);
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

function closeUploadOverlay () {
  unblockSubmitButton();
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value='';
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  imageUploadCancel.removeEventListener('click', onUploadOverlayCancelClick);
}

const pristine = new Pristine(imageUploadForm);

const validateComment = (value) => isStringFits(value,140);

const validateHashtag = (value) => {
  const testValue=value.trim();
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


pristine.addValidator(commentInput, validateComment,'Comment');

pristine.addValidator(hashtagInput, validateHashtag,'Hashtag');

const displayErrorMessage = (message, buttonTitle)=>{
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageButton = newErrorMessage.querySelector('.error__button');
  newErrorMessage.querySelector('.error__title').textContent = message;
  errorMessageButton.textContent=buttonTitle;
  errorMessageButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const currentMessage = document.querySelector('body > .error');
    body.removeChild(currentMessage);
  });
  body.appendChild(newErrorMessage);
};

const displaySuccessMessage = () => {
  const newSuccessMessage = successMessageTemplate.cloneNode(true);
  const successMessageButton = newSuccessMessage.querySelector('.success__button');
  successMessageButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const currentMessage = document.querySelector('body > .success');
    body.removeChild(currentMessage);
  });
  body.appendChild(newSuccessMessage);
};

const onSuccessUpload = () => {
  displaySuccessMessage();
  closeUploadOverlay();
  setFormDefaultValues();
};

const onUploadError = (message, buttonTitle) => {
  displayErrorMessage(message, buttonTitle);
  closeUploadOverlay();
};

uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault(evt);
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewImage.src = URL.createObjectURL(file);
    openUploadOverlay();
  }
  else {
    onUploadError('Выбранный файл не является изображением', 'Попробовать еще раз');
  }
});

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()){
    sendData(blockSubmitButton, imageUploadForm, onSuccessUpload, onUploadError);
  }
  else{
    //console.log('Проверка не прошла');
    // Как и куда отправлять сообщения об ошибках, я пока не разобрался.
  }
});
