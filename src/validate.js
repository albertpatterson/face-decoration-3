const leftEyeX = 200;
const leftEyeY = 100;
const rightEyeX = 100;
const rightEyeY = 110;
const noseTipX = 150;
const noseTipY = 105;
const mouthCenterX = 150;
const mouthCenterY = 200;
const leftEarTragionX = 250;
const leftEarTragionY = 110;
const rightEarTragionX = 50;
const rightEarTragionY = 110;
const faceTiltAngle = (Math.PI / 180) * 10;

const BASE_MESSAGE =
  '"window.getDrawProps must return an object like the following {xCenter:1, yCenter:2, width:3, height:4, angle:5}';

export function throwDrawError() {
  throwFcnError() || throwPropsError() || null;
}

function throwFcnError() {
  if (!window.getDrawProps) {
    throw new Error(
      `You must define a function called "window.getDrawProps". ${BASE_MESSAGE}`
    );
  }
}

function throwPropError(drawProps, name) {
  const value = drawProps[name];
  if (value === undefined) {
    throw new Error(`Property "${name}" missing. ${BASE_MESSAGE}`);
  }

  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`Property "${name}" must be a number. ${BASE_MESSAGE}`);
  }
}

function throwPropsError() {
  const drawProps = window.getDrawProps(
    leftEyeX,
    leftEyeY,
    rightEyeX,
    rightEyeY,
    noseTipX,
    noseTipY,
    mouthCenterX,
    mouthCenterY,
    leftEarTragionX,
    leftEarTragionY,
    rightEarTragionX,
    rightEarTragionY,
    faceTiltAngle
  );

  if (!drawProps) {
    throw new Error(
      `"window.getDrawProps" does not return a value. ${BASE_MESSAGE}`
    );
  }

  const names = ['xCenter', 'yCenter', 'width', 'height', 'angle'];
  for (const name of names) {
    throwPropError(drawProps, name);
  }
}

export async function waitForValidUserCode() {
  await new Promise((res) => {
    const int = setInterval(async () => {
      if (window.userCodeError) {
        showUserLoadError(window.userCodeError);
      } else {
        clearUserLoadError();
        try {
          throwDrawError();
          clearUserRunError();
          clearInterval(int);
          res();
        } catch (drawError) {
          showUserRunError(drawError);
        }
      }
    }, 250);
  });
}

const USER_CODE_ERROR_BLOCK = document.getElementById('user-code-error');
const USER_CODE_ERROR_DISPLAY = document.getElementById(
  'user-code-error-display'
);
function showUserLoadError(drawErrorEvent) {
  const msg = `Error in code.js at line #${drawErrorEvent.lineno}, col #${drawErrorEvent.colno}: "${drawErrorEvent.message}" -- code.js: line #${drawErrorEvent.lineno}, col #${drawErrorEvent.colno}`;
  USER_CODE_ERROR_DISPLAY.innerText = msg;
  USER_CODE_ERROR_BLOCK.style.display = 'block';
}

function clearUserLoadError() {
  USER_CODE_ERROR_BLOCK.style.display = 'none';
}

function showUserRunError(drawError) {
  USER_CODE_ERROR_DISPLAY.innerText = drawError.stack;
  USER_CODE_ERROR_BLOCK.style.display = 'block';
}

function clearUserRunError() {
  USER_CODE_ERROR_BLOCK.style.display = 'none';
}
