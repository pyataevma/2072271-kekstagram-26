import {debounce} from './util.js';
import {displayPhotos,displayImageFilter,setFilterClick} from './pictures.js';
import './upload-form.js';
import './image-effects.js';
import './server-interactions.js';
import{getData} from  './server-interactions.js';

const RERENDER_DELAY=500;

getData((photos)=>{
  displayPhotos(photos);
  displayImageFilter();
  setFilterClick(debounce(() => displayPhotos(photos), RERENDER_DELAY,));
});
