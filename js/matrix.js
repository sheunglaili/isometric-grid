import { Vector } from './vector.js';

export class Matrix {
  #row;
  #column;
  #matrix;
  constructor(matrix) {
    this.#row = matrix.length; 
    this.#column = matrix[0].length;
    this.#matrix = matrix;
  }

  /**
   * Multiply 2 Matrix and return a new matrix as the result.
   * 
   * @param {Matrix} matrix 
   * @returns {Matrix}
   */
  multiply(matrix) {
    if (!matrix instanceof Matrix) throw new Error("Only Matrix is allowed.")
    const multipliers = this.vectors('horizontal');
    const multiplicands = matrix.vectors('vertical');
    const result = [];
    for (let i = 0; i < multipliers.length; i++) {
      const vector = [];
      for (let j = 0; j < multiplicands.length; j++) {
        const multiplier = multipliers[i];
        const multiplicand = multiplicands[j];
        vector.push(multiplier.dotProduct(multiplicand));
      }
      result.push(vector);
    }
    return new Matrix(result);
  }

  /**
   * Returns Vector representation of Matrix by given direction
   * @param {'horizontal' | 'vertical'} direction 
   * @returns {Vector[]}
   */
  vectors(direction) {
    if (!['horizontal', 'vertical'].includes(direction)) throw new Error('Invalid direction.');
    if (direction === 'horizontal') {
      return this.#matrix.map((row) => new Vector(row));
    } else {
      const vectors = [];
      for (let i = 0; i < this.#column; i++) {
        const column = [];
        for (let j = 0; j < this.#row; j++) {
          column.push(this.#matrix[j][i]);
        }
        vectors.push(new Vector(column));
      }
      return vectors;
    }
  }
}