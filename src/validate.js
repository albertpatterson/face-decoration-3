const exampleFace = {
  keypoints: [
    { x: 141, y: 61, name: 'rightEye' },
    { x: 180, y: 64, name: 'leftEye' },
    { x: 167, y: 80, name: 'noseTip' },
    { x: 162, y: 103, name: 'mouthCenter' },
    { x: 105, y: 76, name: 'rightEarTragion' },
    { x: 189, y: 81, name: 'leftEarTragion' },
  ],
  box: {
    xMin: 104,
    xMax: 198,
    yMin: 42,
    yMax: 135,
    width: 93,
    height: 93,
  },
};

const BASE_MESSAGE =
  '"window.getDrawProps must return an object like the following {xCenter:1, yCenter:2, width:3, height:4, angle:5}';

export function getDrawError() {
  return getFcnError() || getPropsError() || null;
}

function getFcnError() {
  if (!window.getDrawProps) {
    return new Error(
      `You must define a function called "window.getDrawProps". ${BASE_MESSAGE}`
    );
  }
  return null;
}

function getPropError(drawProps, name) {
  const value = drawProps[name];
  if (value === undefined) {
    return new Error(`Property "${name}" missing. ${BASE_MESSAGE}`);
  }

  if (typeof value !== 'number' || Number.isNaN(value)) {
    return new Error(`Property "${name}" must be a number. ${BASE_MESSAGE}`);
  }

  return null;
}

function getPropsError() {
  try {
    const drawProps = window.getDrawProps(exampleFace);
    if (!drawProps) {
      return new Error(
        `"window.getDrawProps" does not return a value. ${BASE_MESSAGE}`
      );
    }

    const names = ['xCenter', 'yCenter', 'width', 'height', 'angle'];
    for (const name of names) {
      let drawError = getPropError(drawProps, name);
      if (drawError) {
        return drawError;
      }
    }
  } catch (error) {
    return error;
  }

  return null;
}
