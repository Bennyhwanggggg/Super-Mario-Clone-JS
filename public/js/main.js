import Compositor from './Compositor.js';
import Timer from './Timer.js'
import KeyBoard from './KeyboardState.js';
import { loadLevel } from './loaders.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
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
    comp.layers.push(backgroundLayer);

    const gravity = 2000;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const input = new KeyBoard();
    // 32 = space
    const SPACE = 32;
    input.addMapping(SPACE, keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    input.listenTo(window);

    const spriteLayer = createSpriteLayer(mario, mario.pos);
    comp.layers.push(spriteLayer);
    
    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        mario.update(deltaTime);
        comp.draw(context);
        mario.vel.y += gravity * deltaTime;
    }
    timer.start();
});
