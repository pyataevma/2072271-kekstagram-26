const ALERT_SHOW_TIME=5000;

const getRandomInteger = (minimalValue, maximalValue) => {
  if (minimalValue < 0) {
    minimalValue = 0;
  }
  if (maximalValue <= minimalValue) {
    return Math.floor(minimalValue);
    // Если максимальное значение <= минимального,
    // то функция возвращает округленное вниз минимальное значение или ноль.
  }
  return Math.floor(Math.random() * (maximalValue - minimalValue) + minimalValue);
};

const getShuffledIndeces = (arraySize) => {
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
};

const getShuffledArray = (array) => {
  const newArray=[];
  const shuffledIndeces=getShuffledIndeces(array.length);
  for (let i=0; i<array.length; i++) {
    newArray[i]=array[shuffledIndeces[i]];
  }
  return newArray;
};

const isStringFits = (examinedString, maximalLength) => (examinedString.length <= maximalLength);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isStringInArray = (testString, stringArray) =>{
  for (let i=0; i<stringArray.length; i++) {
    if (testString.toLowerCase === stringArray[i].toLowerCase) {
      return true;
    }
  }
  return false;
};

const isEqualStringsInArray = (stringsArray) =>{
  for (let i=0; i<stringsArray.length-1; i++) {
    for (let j=i+1; j<stringsArray.length; j++) {
      if (stringsArray[i].toLowerCase() === stringsArray[j].toLowerCase()) {
        return true;
      }
    }
  }
  return false;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'grey';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, isStringFits, isEscapeKey, isStringInArray,
  isEqualStringsInArray, showAlert, getShuffledIndeces, getShuffledArray, debounce};
