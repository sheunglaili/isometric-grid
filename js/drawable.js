export class Drawable {

  #id;
  constructor(id) {
    this.#id = id;
  }

  id(){
   return this.#id;
  }

  async draw(ctx) {
    /* not implemented */
    throw new Error('Not implemented.')
  }
}