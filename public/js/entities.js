import Entity from './Entity.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import { loadMarioSprite } from './sprites.js';
import Go from './traits/Go.js';

export function createMario() {
    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(14, 16);

        mario.addTrait(new Go());
        // mario.addTrait(new Velocity());
        mario.addTrait(new Jump());

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y)
        }

        return mario;
    })
}