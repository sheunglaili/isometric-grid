import { Canvas } from './canvas.js';
import { World } from './world.js';
import { Asset } from "./asset.js";
import { Matrix } from './matrix.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new Canvas("world");

  const world = new World(canvas);
  const background = new Asset('./asset/background/sky.png');
  const soil = new Asset('./asset/block/tile000.png');

  world.background(background);
  world.grid(soil); 

  window.addEventListener('resize', () => canvas.draw(), false)
  canvas.draw();

  world.start()
});
