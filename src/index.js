import './style.css';
import shopkinImg from './images/shopkin.png';
import { log } from './util/util.js';

import stuff from './stuff';

console.log('hello world');
log();

const img = document.createElement('img');
img.src = shopkinImg;
document.body.appendChild(img);
