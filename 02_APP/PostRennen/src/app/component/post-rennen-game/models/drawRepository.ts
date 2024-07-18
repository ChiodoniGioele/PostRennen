import {Postman} from "./postman";
import {Obstacle} from "./obstacle";
import {Draw} from "./draw";
import {ObstacleGenerator} from "./obstacleGenerator";

export class DrawRepository {
    private _postman: Postman;
    private obstacleGenerator: ObstacleGenerator;

    constructor(canvas: HTMLCanvasElement, postman: Postman) {
        this._postman = postman;
        this.obstacleGenerator = new ObstacleGenerator(canvas);
        this.obstacleGenerator.startGenerate();
    }

    getDraw(): Draw[] {
        return [...this.obstacleGenerator.obstacles, this._postman];
    }

    get postman(): Postman {
        return this._postman;
    }

    obstacles(): Obstacle[] {
        return this.obstacleGenerator.obstacles;
    }

    removeObstacle(obstacle: Obstacle) {
        this.obstacleGenerator.removeObstacle(obstacle);
    }

    stopAll() {
        this.obstacleGenerator.stopObstacle();
    }

    reStartAll() {
        this.obstacleGenerator.startGenerate();
    }
}
