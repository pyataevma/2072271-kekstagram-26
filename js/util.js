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

const checkStringFits = (examinedString, maximalLength) => (examinedString.length <= maximalLength);

export {getRandomInteger};
export {checkStringFits};
