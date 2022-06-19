/* tslint:disable */
/* eslint-disable */
/**
*/
export function greet(): void;
/**
*/
export enum Movement {
  TOP,
  RIGHT,
  DOWN,
  LEFT,
}
/**
*/
export class Game {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @param {number} speed
* @param {number} snake_length
* @param {Vector} direction
*/
  constructor(width: number, height: number, speed: number, snake_length: number, direction: Vector);
/**
* @returns {boolean}
*/
  is_over(): boolean;
/**
* @param {number} timespan
* @param {number | undefined} movement
*/
  process(timespan: number, movement?: number): void;
/**
* @returns {Array<any>}
*/
  get_snake(): Array<any>;
/**
*/
  direction: Vector;
/**
*/
  food: Vector;
/**
*/
  height: number;
/**
*/
  score: number;
/**
*/
  speed: number;
/**
*/
  width: number;
}
/**
*/
export class Vector {
  free(): void;
/**
* @param {number} x
* @param {number} y
*/
  constructor(x: number, y: number);
/**
* @param {Vector} other
* @returns {Vector}
*/
  add(other: Vector): Vector;
/**
* @param {Vector} other
* @returns {Vector}
*/
  subtract(other: Vector): Vector;
/**
* @param {number} number
* @returns {Vector}
*/
  scale_by(number: number): Vector;
/**
* @returns {number}
*/
  length(): number;
/**
* @returns {Vector}
*/
  normalize(): Vector;
/**
* @param {Vector} other
* @returns {boolean}
*/
  equal_to(other: Vector): boolean;
/**
* @param {Vector} other
* @returns {boolean}
*/
  is_opposite(other: Vector): boolean;
/**
* @param {Vector} other
* @returns {number}
*/
  dot_product(other: Vector): number;
/**
*/
  x: number;
/**
*/
  y: number;
}
