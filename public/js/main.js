import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {createCollisionLayer, createCameraLayer} from './layers.js';
import {setupKeyboard} from './input.js';
import {setupMouseControl} from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {
    const camera = new Camera();
    window.camera = camera;

    mario.pos.set(64, 64);

    level.comp.layers.push(
        createCollisionLayer(level),
        createCameraLayer(camera));


    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    setupMouseControl(canvas, mario, camera);


    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.comp.draw(context, camera);
    }

    timer.start();
});