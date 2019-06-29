import SpriteSheet from './SpriteSheet.js';
import { loadImage } from './loaders.js'



const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);
    sprites.draw('sky', context, 45, 62);
})