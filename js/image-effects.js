const previewImage = document.querySelector('.img-upload__preview img');
const imageScaleControl = document.querySelector('.img-upload__scale');
const scaleSmallerButton = imageScaleControl.querySelector('.scale__control--smaller');
const scaleBiggerButton = imageScaleControl.querySelector('.scale__control--bigger');
const scaleControlValue = imageScaleControl.querySelector('.scale__control--value');
const effectsList = document.querySelector('.effects__list');
const effectRadioItems = effectsList.querySelectorAll('.effects__radio');
const effectKinds = effectsList.querySelectorAll('.effects__preview');
const effectLevelField = document.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevelField.querySelector('.effect-level__value');
const effectLevelSlider = effectLevelField.querySelector('.effect-level__slider');

const SCALE_PERCENT_STEP = 25;
const MAX_SCALE_PERCENT = 100;
const MIN_SCALE_PERCENT = 25;
let scalePercent = MAX_SCALE_PERCENT;

const effectProperties = [
  {class: 'effects__preview--none', filter: 'none', isSliderHidden: true, min: 0, max: 1, step: 0.1, unit: '' },
  {class: 'effects__preview--chrome', filter: 'grayscale', isSliderHidden: false, min: 0, max: 1, step: 0.1, unit: '' },
  {class: 'effects__preview--sepia', filter: 'sepia', isSliderHidden: false, min: 0, max: 1, step: 0.1, unit: '' },
  {class: 'effects__preview--marvin', filter: 'invert', isSliderHidden: false, min: 0, max: 100, step: 1, unit: '%' },
  {class: 'effects__preview--phobos', filter: 'blur', isSliderHidden: false, min: 0, max: 3, step: 0.1, unit: 'px' },
  {class: 'effects__preview--heat', filter: 'brightness', isSliderHidden: false, min: 0, max: 3, step: 0.1, unit: '' },
];
let currentEffect = effectProperties[0];

const changeScale = (percentShift) => {
  scalePercent += percentShift;
  if (scalePercent > MAX_SCALE_PERCENT) {
    scalePercent = MAX_SCALE_PERCENT;
  }
  if (scalePercent < MIN_SCALE_PERCENT) {
    scalePercent = MIN_SCALE_PERCENT;
  }
  scaleControlValue.value = `${scalePercent}%`;
  previewImage.style.transform = `scale(${scalePercent / 100})`;
};

scaleBiggerButton.addEventListener('click', () => {
  changeScale(SCALE_PERCENT_STEP);
});

scaleSmallerButton.addEventListener('click', () => {
  changeScale(-SCALE_PERCENT_STEP);
});

noUiSlider.create(effectLevelSlider, {
  range: {
    min: currentEffect.min,
    max: currentEffect.max,
  },
  start: currentEffect.max,
  step: currentEffect.step,
  connect: 'lower',
});

const findEffect = (effectKind) => {
  for (let i = 0; i < effectProperties.length; i++) {
    if (effectKind.classList.contains(effectProperties[i].class)){
      return effectProperties[i];
    }
  }
  return undefined;
};

const updateSlider = (effectProperty) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effectProperty.min,
      max: effectProperty.max,
    },
    step: effectProperty.step,
    start: effectProperty.max,
  });
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  previewImage.style.filter = `${currentEffect.filter}(${effectLevelValue.value}${currentEffect.unit })`;
});

const replaceEffect = (newEffect) => {
  previewImage.classList.remove(currentEffect.class);
  currentEffect = newEffect;
  if (currentEffect.isSliderHidden) {
    effectLevelField.classList.add('hidden');
    previewImage.style.removeProperty('filter');
  }
  else {
    effectLevelField.classList.remove('hidden');
    previewImage.classList.add(currentEffect.class);
    updateSlider(currentEffect);
  }
};

const setEffect = () => {
  for (let i = 0; i < effectRadioItems.length; i++) {
    if (effectRadioItems[i].checked) {
      const effectProperty=findEffect(effectKinds[i]);
      replaceEffect(effectProperty);
    }
  }
};

effectsList.addEventListener('change', () => {
  setEffect();
});

const setDefaultEffect = () => {
  scalePercent = MAX_SCALE_PERCENT; // set default scale
  changeScale(0);
  effectRadioItems[0].checked=true;
  setEffect();
};

setDefaultEffect();
export {setDefaultEffect};
