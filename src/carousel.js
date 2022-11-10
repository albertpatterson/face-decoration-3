import {
  getCachedImgs,
  getCachedSelectedSrc,
  setCachedSelectedImg,
} from './cache';

export const previewContainer = document.getElementById('preview-container');
const fullImg = document.getElementById('full-img');

// showFullImg(previewContainer.querySelector('img'));

const cachedImgs = getCachedImgs();
for (const cachedImg of cachedImgs) {
  const img = document.createElement('img');
  img.src = cachedImg;
  previewContainer.appendChild(img);
}

const selectedImg = getInitialSelectedImg();
showFullImg(selectedImg);

// const selectedSrc = getCachedSelectedSrc();
// let intialSelectionMade = false;
// if (selectedSrc) {

// }

// if (!intialSelectionMade) {
//   showFullImg(previewContainer.querySelector('img'));
// }

// const imgs = previewContainer.querySelectorAll('img');
// const selected = imgs[selectedIdx] || imgs[0];
// showFullImg(selected);

previewContainer.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName !== 'IMG') {
    return;
  }
  showFullImg(target);
});

export function showFullImg(preview) {
  const currentSelection = previewContainer.querySelector('.selected');
  if (currentSelection) {
    currentSelection.classList.remove('selected');
  }
  preview.classList.add('selected');
  const src = preview.src.slice();
  fullImg.src = src;
  setCachedSelectedImg(src);
}

function getInitialSelectedImg() {
  const selectedSrc = getCachedSelectedSrc();
  const imgs = Array.from(previewContainer.querySelectorAll('img'));

  for (const img of imgs) {
    if (img.src === selectedSrc) {
      return img;
    }
  }

  return imgs[0];
}
