function getRandomInteger(minimalValue, maximalValue) {
  if (minimalValue < 0) {
    minimalValue = 0;
  }
  if (maximalValue <= minimalValue){
    return Math.floor(minimalValue);
    // Если максимальное значение <= минимального,
    // то функция возвращает округленное вниз минимальное значение или ноль.
  }
  return Math.floor(Math.random()*(maximalValue-minimalValue)+minimalValue);
}

function checkStringFits(examinedString, maximalLength){
  return examinedString.length <= maximalLength;
}
