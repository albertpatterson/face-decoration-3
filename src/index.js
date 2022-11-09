import './style.scss';
import shopkinImg from './assets/shopkin.png';
import { log } from './util/util.js';

console.log('hello world from index');
log();

const img = document.createElement('img');
img.src = shopkinImg;
document.body.appendChild(img);
