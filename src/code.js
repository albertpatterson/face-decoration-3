// keypoints pointed to on the face https://github.com/albertpatterson/face-decoration#keypoints-identified

// When looking face to face at a person, they are facing
// in the opposite direction from you, so their right side
// is on your left, the face keypoints from your
// perspective are arranged as follows
//
//                rightEye   leftEye
// rightEarTragion    noseTip    leftEarTragion
//                  mouthCenter

window.getDrawProps = function (face) {
  // face object has the properties shown at https://github.com/albertpatterson/face-decoration#keypoints-json
  // getFacePoint method helps to get the desired face point

  const leftEye = getPredictionPoint(face, 'leftEye');
  const rightEye = getPredictionPoint(face, 'rightEye');
  const leftEar = getPredictionPoint(face, 'leftEarTragion');
  const rightEar = getPredictionPoint(face, 'rightEarTragion');
  const rawWidth = leftEar.x - rightEar.x;
  const width = rawWidth;

  const xCenter = (rightEye.x + leftEye.x) / 2;
  const yCenter = (rightEye.y + leftEye.y) / 2;
  const height = width / 3;
  const earXDistance = rawWidth;
  const earYDistance = leftEar.y - rightEar.y;

  const angle = getAngle(earXDistance, earYDistance);

  // draw properties on the face https://github.com/albertpatterson/face-decoration#draw-properties
  return { xCenter, yCenter, width, height, angle };
};

// window.getDrawProps = function getDrawProps(face) {
//   // face object has the properties shown at https://github.com/albertpatterson/face-decoration#keypoints-json
//   // getFacePoint method helps to get the desired face point

//   const leftEar = getPredictionPoint(face, 'leftEarTragion');
//   const rightEar = getPredictionPoint(face, 'rightEarTragion');
//   const rawWidth = leftEar.x - rightEar.x;
//   const width = 1.75 * rawWidth;
//   const height = width;

//   const xCenter = (rightEar.x + leftEar.x) / 2;
//   const yCenter = (rightEar.y + leftEar.y) / 2;

//   const earXDistance = rawWidth;
//   const earYDistance = leftEar.y - rightEar.y;

//   const angle = getAngle(earXDistance, earYDistance);

//   // draw properties drawn on the face https://github.com/albertpatterson/face-decoration#draw-properties
//   return { xCenter, yCenter, width, height, angle };
// }

// window.getDrawProps = function getDrawProps(face) {
//   // face object has the properties shown at https://github.com/albertpatterson/face-decoration#keypoints-json
//   // getFacePoint method helps to get the desired face point

//   const leftEar = getPredictionPoint(face, 'leftEarTragion');
//   const rightEar = getPredictionPoint(face, 'rightEarTragion');
//   const mouthCenter = getPredictionPoint(face, 'mouthCenter');

//   const rawWidth = leftEar.x - rightEar.x;
//   const width = 0.75 * rawWidth;
//   const height = width / 2;
//   const xCenter = mouthCenter.x;
//   const yCenter = mouthCenter.y;

//   const earXDistance = rawWidth;
//   const earYDistance = leftEar.y - rightEar.y;

//   const angle = getAngle(earXDistance, earYDistance);

//   // draw properties drawn on the face https://github.com/albertpatterson/face-decoration#draw-properties
//   return { xCenter, yCenter, width, height, angle };
// }
