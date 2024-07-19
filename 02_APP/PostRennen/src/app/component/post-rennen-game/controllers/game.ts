import {DrawRepository} from "../models/drawRepository";
import {Postman} from "../models/postman";
import {Position} from "../utils/position";
import {Altitude} from "../utils/altitude";
import {Obstacle} from "../models/obstacle";
import {Draw} from "../models/draw";
import {Counter} from "../models/counter";
import {LocalStorageService} from "../../../service/local-storage.service";

export class Game {

    private _status = false;
    private readonly ctx: CanvasRenderingContext2D | null = null;
    private gameInterval: any;
    private canvas: HTMLCanvasElement;
    private drawRepository: DrawRepository | null = null;
    private localStorage: LocalStorageService;
    private counter: Counter;

    constructor(canvas: HTMLCanvasElement, localStorage: LocalStorageService) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        if (!this.ctx) {
            throw new Error('Impossibile ottenere il contesto 2D dal canvas.');
        }
        this.counter = new Counter(canvas, this.ctx);
        this.localStorage = localStorage;
    }

    start() {
        stop();
        this._status = true;
        const postman = new Postman(this.canvas, this.ctx!, new Position(100, Altitude.Auto));
        this.drawRepository = new DrawRepository(this.canvas, postman);
        this.gameInterval = setInterval(() => this.gameLoop(), 20);
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }

    stop() {
        this._status = false;
        clearInterval(this.gameInterval);
        this.gameInterval = null;
        this.drawRepository = null;
        window.removeEventListener('keydown', (event) => this.handleKeyDown(event));
        window.removeEventListener('keydown', (event) => this.handleKeyUp(event));
    }

    gameLoop() {
        this.clearCanvas();
        this.drawFrame();
    }

    drawFrame(): void {
        this.drawTemporalHeightLine();
        for (let draw of this.drawRepository!.getDraw()) {
            this.obstaclePassed(draw);
            draw.draw();
            this.obstacleTouch(draw);
        }
        this.counter.draw();
    }

    private obstaclePassed(draw: Draw): void {
        if ((draw.position.x < 0 - draw.image.width) && !(draw instanceof Postman)) {
            this.counter.increment();
            this.drawRepository!.removeObstacle(draw as Obstacle);
        }
    }

    private obstacleTouch(draw: Draw): void {
        if (!(draw instanceof Postman) && draw.isOverlapping(this.drawRepository!.postman.position)) {
            this.drawRepository!.removeObstacle(draw as Obstacle);
            this.setPoint();
        }
    }

    private setPoint(): void {
        const storedPoints = this.localStorage.getItem<string>("points");
        let arrayPoints: number[] = [];

        if (storedPoints) {
            arrayPoints = JSON.parse(storedPoints);
        }

        arrayPoints.sort((a, b) => b - a);

        if (arrayPoints.length > 9) {
            arrayPoints.splice(9);
        }

        arrayPoints.push(this.counter.count);
        console.log(arrayPoints);
        this.localStorage.setItem("points", JSON.stringify(arrayPoints));
    }


    private clearCanvas(): void {
        this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (!this.status) return;
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                if (!this.drawRepository!.postman.isCrouch && !this.drawRepository!.postman.isJumping) {
                    this.drawRepository!.postman.jump();
                }
                break;
            case 'ArrowDown':
            case 's':
                if (!this.drawRepository!.postman.isJumping) {
                    this.drawRepository!.postman.crouch();
                }
                break;
            case 'ArrowLeft':
            case 'a':
                if (!this.drawRepository!.postman.isCrouch && !this.drawRepository!.postman.isJumping) {
                    this.drawRepository!.postman.moveLeft();
                }
                break;
            case 'ArrowRight':
            case 'd':
                if (!this.drawRepository!.postman.isCrouch && !this.drawRepository!.postman.isJumping) {
                    this.drawRepository!.postman.moveRight();
                }
                break;
        }
    }

    private handleKeyUp(event: KeyboardEvent) {
        if (!this.status) return;
        switch (event.key) {
            case 'ArrowLeft':
            case 'a':
                if (!this.drawRepository!.postman.isJumping) {
                    this.drawRepository!.postman.stopMove();
                }
                break;
            case 'ArrowRight':
            case 'd':
                if (!this.drawRepository!.postman.isJumping) {
                    this.drawRepository!.postman.stopMove();
                }
                break;
            case 'ArrowDown':
            case 's':
                this.drawRepository!.postman.stopCrouch();
                break;
        }
    }


    // da elliminare quando finito il gioco //
    private drawTemporalHeightLine(): void {
        if (!this.ctx) return; // Check if ctx is null, although it should be initialized in the constructor
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, Altitude.Up);
        this.ctx.lineTo(10000, Altitude.Up);
        this.ctx.stroke();

        if (!this.ctx) return; // Check if ctx is null, although it should be initialized in the constructor
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, Altitude.Middle);
        this.ctx.lineTo(10000, Altitude.Middle);
        this.ctx.stroke();

        if (!this.ctx) return; // Check if ctx is null, although it should be initialized in the constructor
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2
        this.ctx.beginPath();
        this.ctx.moveTo(0, Altitude.Down);
        this.ctx.lineTo(10000, Altitude.Down);
        this.ctx.stroke();
    }


    get status(): boolean {
        return this._status;
    }

    set status(value: boolean) {
        this._status = value;
    }
}
