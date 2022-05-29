export class Canvas {

  #canvasId;
  #canvas;
  #ctx;
  #drawable;

  constructor(id) {
    this.#canvasId = id;
    this.#drawable = new Map();
    this.#canvas = document.getElementById(this.#canvasId);
    this.#ctx = this.#canvas.getContext('2d');
    this.draw();
  }

  addDrawable(drawable) {
    this.#drawable.set(drawable.id(), drawable);
  }

  async draw() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;

    this.paint();
  }

  async paint() {
    for (const drawable of this.#drawable.values()) {
      // run parallel render when finishing solving layering issues of sprite
      await drawable.draw(this.#ctx, this.#canvas)
    }
    requestAnimationFrame(() => this.paint());
  }

  context() {
    return this.#ctx;
  }

  height() {
    return this.#canvas.height;
  }

  width() {
    return this.#canvas.width;
  }
}