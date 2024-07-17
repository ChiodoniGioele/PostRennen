import {Obstacle} from "./obstacle";
import {Position} from "../utils/position";
import {Altitude} from "../utils/altitude";

export class ObstacleGenerator {

  private canvas: HTMLCanvasElement;

  private regalo: HTMLImageElement = new Image();
  private uccello: HTMLImageElement = new Image();

  private _obstacles: Obstacle[];

  private generationInterval: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this._obstacles = [];
    this.regalo.src = "assets/obstacle/regalo.png";
    this.uccello.src = "assets/obstacle/uccello.png";
  }

  startGenerate() {
    this.generationInterval = setInterval(() => {
      this.obstacles.push(this.generate(Altitude.Down, this.regalo));
    }, 2000);
  }

  private generate(altitude: Altitude, image: HTMLImageElement): Obstacle {
    const newSpowner = new Position(window.innerWidth + image.width, altitude);
    return new Obstacle(this.canvas, this.canvas.getContext('2d')!, newSpowner, image);
  }


  get obstacles(): Obstacle[] {
    return this._obstacles;
  }
}
