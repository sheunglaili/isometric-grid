export class Asset { 
  #raw;
  #path;

  constructor(path){
    this.#path = path;
  }

  raw() {
    if (this.#raw) return this.#raw;
    return new Promise((resolve) => {
      const raw = new Image();
      raw.src = this.#path;
      raw.addEventListener('load', () => {
        this.#raw = raw;
        resolve(this.#raw);
      });
    })
  }

  width() {
    return this.#raw.width;
  }

  height() {
    return this.#raw.height;
  }
}