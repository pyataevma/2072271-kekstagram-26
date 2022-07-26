import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(()=> {
      showAlert('Не удалось загрузить данные с сервера.');
    });
};


const sendData = (beforeSubmit, form, onSuccess, onFail) =>{
  beforeSubmit();
  const formData = new FormData(form);
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('При отправке формы произошла ошибка', 'Попробовать ещё раз');
    }
  })
    .catch(()=> {
      onFail('Ошибка отравки на сервер', 'Попробовать ещё раз');
    });
};

export {getData, sendData};
