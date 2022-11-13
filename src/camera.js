export async function getVideoStream() {
  return await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
}

export async function getScreenStream() {
  return await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: false,
  });
}

const wrapper = document.getElementById('video-wrapper');

let showingVideo = null;
export async function showExampleVideo() {
  const video = document.createElement('video');
  video.src =
    'https://static.videezy.com/system/resources/previews/000/053/055/original/20200718_VDOFitness_60.mp4';
  video.crossOrigin = 'anonymous';
  video.muted = true;
  video.preload = true;
  video.autoplay = true;
  video.loop = true;

  if (showingVideo) {
    wrapper.removeChild(showingVideo);
  }

  wrapper.appendChild(video);
  showingVideo = video;
  return showingVideo;
}

export async function showCameraVideo() {
  const video = document.createElement('video');
  const stream = await getVideoStream();
  video.srcObject = stream;

  if (showingVideo) {
    wrapper.removeChild(showingVideo);
  }

  wrapper.appendChild(video);
  showingVideo = video;
  return showingVideo;
}

export async function showScreenVideo() {
  const video = document.createElement('video');
  const stream = await getScreenStream();
  video.srcObject = stream;

  if (showingVideo) {
    wrapper.removeChild(showingVideo);
  }

  wrapper.appendChild(video);
  showingVideo = video;
  return showingVideo;
}
