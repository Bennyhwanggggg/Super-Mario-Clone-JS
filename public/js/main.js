import { loadLevel } from './loaders.js';
import { createBackgroundLayer, createSpriteLayer } from './Layers.js';
import Compositor from './Compositor.js';
import { createMario } from './entities.js';
import { loadBackgroundSprites } from './sprites.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([mario, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    // comp.layers.push(backgroundLayer);

    const gravity = 0.5;

    const spriteLayer = createSpriteLayer(mario, mario.pos);
    comp.layers.push(spriteLayer);
    function update() {
        comp.draw(context);
        mario.update();
        mario.vel.y += gravity;
        requestAnimationFrame(update);
    }

    update();
});
