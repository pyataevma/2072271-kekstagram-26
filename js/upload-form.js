import {isEscapeKey, isStringFits, isEqualStringsInArray} from './util.js';
import {sendData} from './server-interactions.js';
import {setDefaultEffect, addEffectsEventListeners, removeEffectsEventListeners} from './image-effects.js';
const MAX_HASHTAG_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const NO_ERROR_MESSAGE = 'OK';
const HASHTAG_MASK = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const ALLOWED_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];
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

const uploadFormValidator = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
}, true);

const setFormDefaultValues = () => {
  uploadFile.value='';
  hashtagInput.value='';
  commentInput.value='';
  setDefaultEffect();
  uploadFormValidator.reset();
};

const onUploadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== hashtagInput && document.activeElement !== commentInput) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onUploadOverlayCancelClick = (evt) => {
  evt.preventDefault();
  closeUploadOverlay();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const validateComment = (value) => isStringFits(value, MAX_COMMENT_LENGTH);

const getHashtagErrorMessage = (value) => {
  const testValue=value.trim();
  if (testValue.length === 0) {
    return NO_ERROR_MESSAGE;
  }
  const testWords=testValue.split(' ');
  if (testWords.length >MAX_HASHTAG_NUMBER){
    return `Можно использовать не более ${MAX_HASHTAG_NUMBER} хештегов`;
  }
  for (let i=0; i<testWords.length; i++) {
    if (!HASHTAG_MASK.test(testWords[i])) {
      return `Хэш-тег должен начинаться с символа #, содержать буквы и числа
       и иметь длину до ${MAX_HASHTAG_LENGTH} символов. Хэш-теги разделяются пробелом`;
    }
  }
  if (isEqualStringsInArray(testWords)) {
    return 'Один и тот же хэш-тег нельзя использовать дважды';
  }
  return NO_ERROR_MESSAGE;
};

const validateHashtag = (value) => getHashtagErrorMessage(value) === NO_ERROR_MESSAGE;

uploadFormValidator.addValidator(commentInput, validateComment, `Длина комментария - не более ${MAX_COMMENT_LENGTH} символов`);

uploadFormValidator.addValidator(hashtagInput, validateHashtag, getHashtagErrorMessage);

const onErorrMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrrorMessage();
  }
};

const onOutsideErrorMessageClick = (evt) => {
  const errorInnerArea = body.querySelector('.error__inner');
  if (! evt.composedPath().includes(errorInnerArea)) {
    closeErrrorMessage();
  }
};

function closeErrrorMessage () {
  const currentMessage = document.querySelector('body > .error');
  body.removeChild(currentMessage);
  document.removeEventListener('click', onOutsideErrorMessageClick);
  document.removeEventListener('keydown', onErorrMessageEscKeydown);
  showUploadOverlay();
}

const displayErrorMessage = (message, buttonTitle)=>{
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageButton = newErrorMessage.querySelector('.error__button');
  newErrorMessage.querySelector('.error__title').textContent = message;
  errorMessageButton.textContent=buttonTitle;
  errorMessageButton.addEventListener('click', closeErrrorMessage);
  document.addEventListener('click', onOutsideErrorMessageClick);
  document.addEventListener('keydown', onErorrMessageEscKeydown);
  body.appendChild(newErrorMessage);
};

const handleUploadError = (message, buttonTitle) => {
  hideUploadOverlay();
  displayErrorMessage(message, buttonTitle);
};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onOutsideSuccessMessageClick = (evt) => {
  const successInnerArea = body.querySelector('.success__inner');
  if (! evt.composedPath().includes(successInnerArea)) {
    closeSuccessMessage();
  }
};

const displaySuccessMessage = () => {
  const newSuccessMessage = successMessageTemplate.cloneNode(true);
  const successMessageButton = newSuccessMessage.querySelector('.success__button');
  successMessageButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('click', onOutsideSuccessMessageClick);
  document.addEventListener('keydown',onSuccessMessageEscKeydown);
  body.appendChild(newSuccessMessage);
};

function closeSuccessMessage() {
  const currentMessage = document.querySelector('body > .success');
  body.removeChild(currentMessage);
  document.removeEventListener('click',onOutsideSuccessMessageClick);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

const handleSuccessUpload = () => {
  displaySuccessMessage();
  closeUploadOverlay();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = uploadFormValidator.validate();

  if (!isValid) {
    return;
  }

  sendData(blockSubmitButton, imageUploadForm, handleSuccessUpload, handleUploadError);
};

function showUploadOverlay () {
  body.classList.add('modal-open');
  imageUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  imageUploadCancel.addEventListener('click', onUploadOverlayCancelClick);
  imageUploadForm.addEventListener('submit', onUploadFormSubmit);
  addEffectsEventListeners();
}

function hideUploadOverlay () {
  unblockSubmitButton();
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  imageUploadCancel.removeEventListener('click', onUploadOverlayCancelClick);
  removeEffectsEventListeners();
  imageUploadForm.removeEventListener('submit', onUploadFormSubmit);
}

function closeUploadOverlay () {
  setFormDefaultValues();
  hideUploadOverlay();
}

const onFileInputChange = (evt) => {
  evt.preventDefault(evt);
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const isPicture = ALLOWED_EXTENSIONS.some((it) => fileName.endsWith(it));
  if (isPicture) {
    previewImage.src = URL.createObjectURL(file);
    setDefaultEffect();
    showUploadOverlay();
  }
  else {
    handleUploadError('Выбранный файл не является изображением', 'Загрузить другой файл');
  }
};

const prepareUploadForm = () => {
  uploadFile.addEventListener('change', onFileInputChange);
};

export {prepareUploadForm};
