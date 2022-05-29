import { Block } from './block.js';


export class World {
  #canvas;
  #grid;
  constructor(canvas) {
    this.#canvas = canvas;
    this.#grid = [];
  }

  background(asset) {
    this.#canvas.addDrawable({
      id() { return 'background' },
      async draw(ctx) {
        const raw = await asset.raw();
        ctx.drawImage(raw, 0, 0, asset.width(), asset.height());
      }
    });
  }

  grid(block_asset) {

    this.#grid = []; // clear old grid;

    const row = 16;
    const column = 16;

    for (let r = 0; r < row; r++) {
      const row = [];
      for (let c = 0; c < column; c++) {
        const block = new Block({
          x: r,
          y: c,
          asset: block_asset
        });
        this.#canvas.addDrawable(block);
        row.push(block);
      }
      this.#grid.push(row);
    }
  }

  async start() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < this.#grid.length; i++) {
      for (let j = 0; j < this.#grid[i].length; j++) {
        const block = this.#grid[i][j];
        // animation worker
        (async () => {

          const tween = [
            ...[1, 2, 3, 3, 4, 4, 4, 5, 5].map((_, index) => index * 2),
            ...[1, 2, 3, 3, 4, 4, 4, 5, 5].map((_, index) => index * 2).reverse(),
            // ...[...new Array(10)].map((_, index) => -index * 2),
            // ...[...new Array(10)].map((_, index) => -index * 2).reverse()
          ]
          while (true) {
            for (let i = 0; i < tween.length; i++) {
              block.elevate(tween[i]);
              await delay(50);
            }
          }
        })();
      }
      await delay(100)
    }
  }
}