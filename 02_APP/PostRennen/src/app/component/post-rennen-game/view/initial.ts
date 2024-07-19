import {GameService} from '../../../service/game.service';
import {Drawable} from '../interfaces/drawable';
import {Position} from '../utils/position';
import {Altitude} from '../utils/altitude';
import {LocalStorageService} from "../../../service/local-storage.service";

export class Initial implements Drawable {
    ctx: CanvasRenderingContext2D;
    position: Position;
    image: HTMLImageElement = new Image();
    private canvas: HTMLCanvasElement;

    constructor(private gameService: GameService, private localStorage: LocalStorageService, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        if (!this.ctx) {
            throw new Error('Impossibile ottenere il contesto 2D dal canvas.');
        }

        this.position = new Position(canvas.width, canvas.height);
        this.image.src = "assets/start.png";

        this.image.onload = () => {
            this.canvas.addEventListener('click', this.handleCanvasClick.bind(this));

            this.position = new Position(
                (canvas.width - this.image.width) / 2,
                Altitude.Auto,
                (canvas.height - this.image.height) / 2,
                this.image
            );

            this.draw();
        };

        document.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
    }

    draw() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.drawButton();
        this.drawPoints();
    }

    private drawPoints(): void {
        if (!this.localStorage.containsKey("points")) {
            return;
        }

        const points = JSON.parse(this.localStorage.getItem("points")!);
        const sortedPoints = this.getSortedPoints(points);
        const lastPoint = points[points.length - 1];

        const x = this.canvas.width / 5;
        let y = this.canvas.height / 3;
        let drawLastPoint = false;

        this.drawText(this.canvas.width / 5, this.canvas.height / 4, "Results:");

        sortedPoints.forEach((point: string, index: number) => {
            const position = index + 1;
            const value = `${position < 10 ? " " : ""}${position}. ${point}`;

            if (point === lastPoint && !drawLastPoint) {
                this.drawText(x, y, value, "red");
                drawLastPoint = true;
            } else {
                this.drawText(x, y, value);
            }
            y += 30;
        });
    }

    private getSortedPoints(points: string[]): string[] {
        return points.slice().sort((a: string, b: string) => parseFloat(b) - parseFloat(a));
    }

    private drawText(x: number, y: number, value: string, color: string = "black"): void {
        this.ctx.font = "24px 'Press Start 2P'";
        this.ctx.fillStyle = color;
        this.ctx.fillText(value, x, y);
    }



    private drawBackground() {
        if (!this.ctx) return;

        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#FFFFFF';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * 3;
            this.ctx.fillRect(x, y, size, size);
        }
    }

    private drawButton() {
        if (!this.ctx) return;

        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.position.width, this.position.height);
    }

    private handleCanvasClick(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x >= this.position.x && x <= this.position.x + this.position.width &&
            y >= this.position.y && y <= this.position.y + this.position.height) {
            this.onButtonClick();
        }
    }

    private onButtonClick() {
        this.startGame();
    }

    private startGame(): void {
        this.gameService.setGameStatus(true);
    }

    private handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == ' ') {
            this.startGame();
        }
    }
}
