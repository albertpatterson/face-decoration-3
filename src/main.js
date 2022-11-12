import {
  getExampleVideo,
  getCameraVideo,
  showExampleVideo,
  showCameraVideo,
  showScreenVideo,
} from './camera';
import { getModel } from './model';
import {
  initiateVideoAndCanvas,
  takepictures,
  sizeVideoAndCanvas,
  sizeImgAndCanvas,
} from './draw';
import './style.scss';
import './carousel';
import './add_img';
import { getDrawError } from './validate';

const canvas = document.getElementById('decoration-canvas');
let currentVideo = null;

window.launchExample = async function () {
  await playExample();
};

window.launchCamera = async function () {
  await playCamera();
};

window.launchScreen = async function () {
  await playScreen();
};

getModel();

(async () => {
  const drawError = getDrawError();

  if (!drawError) {
    showContent();
    const model = await getModel();
    startVideo();
  } else {
    showUserError(drawError);
  }
})();

function showContent() {
  document.getElementById('user-code-valid').style.display = 'block';
}

function showUserError(drawError) {
  const errorBlock = document.getElementById('user-code-error');
  const pre = document.createElement('pre');
  pre.innerText = drawError.stack;
  errorBlock.appendChild(pre);

  errorBlock.style.display = 'block';
}

async function startVideo() {
  startLoading();

  await playExample();

  window.addEventListener('resize', () =>
    sizeVideoAndCanvas(currentVideo, canvas)
  );

  clearLoading();
  showLaunchButton();
}

let extraLoadingInfoTimeout = null;
function startLoading() {
  extraLoadingInfoTimeout = setTimeout(() => {
    document.getElementById('extra-loading-info').style.display = 'block';
  }, 10e3);
}

function showLaunchButton() {
  const launchButtonRow = document.getElementById('view-button-row');
  launchButtonRow.style.display = 'flex';
}

function clearLoading() {
  clearTimeout(extraLoadingInfoTimeout);
  const loadingIndicator = document.getElementById('loading-indicator');
  loadingIndicator.parentElement.removeChild(loadingIndicator);
}

async function playExample() {
  const video = await showExampleVideo();
  currentVideo = video;
  await initiateVideoAndCanvas(video, canvas);
  const model = await getModel();
  takepictures(video, canvas, model);
}

async function playCamera() {
  const video = await showCameraVideo(); //update
  currentVideo = video;
  await initiateVideoAndCanvas(video, canvas);
  const model = await getModel();
  takepictures(video, canvas, model);
}

async function playScreen() {
  const video = await showScreenVideo(); //update
  currentVideo = video;
  await initiateVideoAndCanvas(video, canvas);
  const model = await getModel();
  takepictures(video, canvas, model);
}
