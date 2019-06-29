export default class Compositor {
    constructor() {
        this.layers = [];
    }

    draw(context) {
        this.layers.forEach(layer => {  // layer is a function that draws the context
            layer(context);
        });
    }
}