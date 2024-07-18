import {Obstacle} from "./obstacle";
import {Position} from "../utils/position";
import {Altitude} from "../utils/altitude";

export class ObstacleGenerator {

    private canvas: HTMLCanvasElement;

    private gift: HTMLImageElement = new Image();
    private bird: HTMLImageElement = new Image();
    private icicle: HTMLImageElement = new Image();

    private _obstacles: Obstacle[];

    private generationInterval: any;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this._obstacles = [];
        this.gift.src = "assets/obstacle/down/gift.png"; // Altitude.Down
        this.bird.src = "assets/obstacle/middle/bird.png"; // Altitude.Middle
        this.icicle.src = "assets/obstacle/up/icicle.png"; // Altitude.Up
    }

    startGenerate() {
        this.generationInterval = setInterval(() => {
            const altitude = this.getRandomAltitude();
            const image = this.getImageForAltitude(altitude);
            this.obstacles.push(this.generate(altitude, image));
        }, 2000);
    }

    private generate(altitude: Altitude, image: HTMLImageElement): Obstacle {
        const newSpowner = new Position(window.innerWidth + image.width, altitude);
        return new Obstacle(this.canvas, this.canvas.getContext('2d')!, newSpowner, image);
    }

    private getRandomAltitude(): Altitude {
        const num = Math.floor(Math.random() * 3);
        switch (num) {
            case 0:
                return Altitude.Down;
            case 1:
                return Altitude.Middle;
            case 2:
                return Altitude.Up;
            default:
                return Altitude.Down;
        }
    }

    private getImageForAltitude(altitude: Altitude): HTMLImageElement {
        switch (altitude) {
            case Altitude.Down:
                return this.gift;
            case Altitude.Middle:
                return this.bird;
            case Altitude.Up:
                return this.icicle;
            default:
                return this.gift;
        }
    }

    get obstacles(): Obstacle[] {
        return this._obstacles;
    }

    removeObstacle(obstacle: Obstacle) {
        const index = this._obstacles.indexOf(obstacle);
        if (index > -1) {
            this._obstacles.splice(index, 1);
        }
    }

    stopObstacle() {
        this._obstacles.splice(0, this._obstacles.length);
        clearInterval(this.generationInterval);
        this.generationInterval = null;
    }
}
