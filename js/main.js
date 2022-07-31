import {preventBounce} from './util.js';
import {displayPhotos, displayImageFilter, prepareFilterButtons} from './pictures.js';
import {prepareUploadForm} from './upload-form.js';
import{getData} from  './server-interactions.js';

const RERENDER_DELAY=500;

prepareUploadForm();

getData((photos)=>{
  displayPhotos(photos);
  displayImageFilter();
  prepareFilterButtons(preventBounce(() => displayPhotos(photos), RERENDER_DELAY,));
});
