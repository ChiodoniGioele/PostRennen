import {Draw} from "./draw";
import {Position} from "../utils/position";

export class Obstacle extends Draw {

  private moveInterval: any;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, position: Position, image: HTMLImageElement) {
    super(canvas, ctx, position, image);
    this.start();
  }

  start() {
    this.moveInterval = setInterval(() => {
      this.position.x -= 5;
    }, 30);
  }
}
// test