const ALERT_SHOW_TIME=5000;

const getRandomInteger = (minimalValue, maximalValue) => {
  if (minimalValue < 0) {
    minimalValue = 0;
  }
  if (maximalValue <= minimalValue) {
    return Math.floor(minimalValue);
  }
  return Math.floor(Math.random() * (maximalValue - minimalValue) + minimalValue);
};

const getShuffledIndices = (arraySize) => {
  const shuffledIndices=[];
  for (let i=0; i<arraySize; i++) {
    shuffledIndices[i]=i;
  }
  for (let i=0; i<arraySize; i++){
    const randomIndex=getRandomInteger(0,arraySize-1);
    const swap=shuffledIndices[i];
    shuffledIndices[i]=shuffledIndices[randomIndex];
    shuffledIndices[randomIndex]=swap;
  }
  return shuffledIndices;
};

const getShuffledArray = (items) => {
  const newItems=[];
  const shuffledIndeces=getShuffledIndices(items.length);
  for (let i=0; i<items.length; i++) {
    newItems[i]=items[shuffledIndeces[i]];
  }
  return newItems;
};

const isStringFits = (examinedString, maximalLength) => (examinedString.length <= maximalLength);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEqualStringsInArray = (strings) =>{
  for (let i=0; i<strings.length-1; i++) {
    for (let j=i+1; j<strings.length; j++) {
      if (strings[i].toLowerCase() === strings[j].toLowerCase()) {
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

const preventBounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isStringFits, isEscapeKey, isEqualStringsInArray, showAlert, getShuffledArray, preventBounce};
