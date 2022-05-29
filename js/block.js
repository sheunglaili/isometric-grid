import { Drawable } from "./drawable.js";
import { Matrix } from "./matrix.js";

export class Block extends Drawable {

  constructor({ x, y, asset, block_size = 32 }) {
    super(`${x}-${y}`);

    this.block_size = block_size;
    this.x = x
    this.y = y;
    this.elevation = 0;
    this.asset = asset;

    const isometric_weight = new Matrix([
      [0.5, 0.25],
      [-0.5, 0.25]
    ]);

    const coordinate = new Matrix([
      [this.x * this.block_size, this.y * this.block_size]
    ]);
    const [isometric_vector] = coordinate.multiply(isometric_weight).vectors('horizontal');
    const [isometric_x, isometric_y] = isometric_vector.raw();

    this.isometric_x = isometric_x;
    this.isometric_y = isometric_y;
  }

  elevate(elevation) {
    this.elevation = -elevation;
  }

  async draw(ctx, canvas) {
    const asset = await this.asset.raw();
    ctx.drawImage(
      asset,
      this.isometric_x - this.block_size / 2 + canvas.width / 2,
      this.isometric_y + canvas.height / 3 + this.elevation,
      // this.block_size,
      // this.block_size
    );
  }
}