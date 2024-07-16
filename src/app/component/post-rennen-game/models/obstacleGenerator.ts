import {Obstacle} from "./obstacle";
import {Position} from "../utils/position";
import {Altitude} from "../utils/altitude";

export class ObstacleGenerator {

  private canvas: HTMLCanvasElement;

  private regalo: HTMLImageElement = new Image();
  private uccello: HTMLImageElement = new Image();

  private _obstacles: Obstacle[];
  private spowner: Position;

  private generationInterval: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.spowner = new Position(this.canvas.width + 100, Altitude.Down);
    this._obstacles = [];
    this.regalo.src = "assets/obstacle/regalo.png";
    this.uccello.src = "assets/obstacle/uccello.png";
    this.startGenerate();
  }

  startGenerate() {
    this.generationInterval = setInterval(() => {
      this.obstacles.push(this.generate(Altitude.Down));
    }, 200);
  }

  private generate(altitude: Altitude): Obstacle {
    return new Obstacle(this.canvas, this.canvas.getContext('2d')!, this.spowner, this.regalo);
  }

  get obstacles(): Obstacle[] {
    return this._obstacles;
  }
}
