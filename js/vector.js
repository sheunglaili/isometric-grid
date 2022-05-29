export class Vector { 
  #components;
  
  constructor(components) {
    this.#components = components;
  }

  dotProduct(vector) {
    if(!(vector instanceof Vector)) throw new Error("Invalid Vector.");
    return vector.raw().reduce((acc, component, index) => acc + component * this.#components[index], 0)
  }

  raw() {
    return this.#components;
  }

  length() {
    return this.#components.length;
  }
}