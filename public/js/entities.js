import Entity from './Entity.js';
import { loadMarioSprite } from './sprites.js'

export function createMario() {
    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();
        mario.pos.set(64, 180);
        mario.vel.set(2, -10);

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y)
        }

        mario.update = function updateMario() {
            mario.pos.x += mario.vel.x;
            mario.pos.y += mario.vel.y;
        }

        return mario;
    })
}