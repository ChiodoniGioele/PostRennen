import { GameService } from '../../../service/game.service';
import { Drawable } from '../interfaces/drawable';
import { Position } from '../utils/position';
import { Altitude } from '../utils/altitude';

export class Initial implements Drawable {
    ctx: CanvasRenderingContext2D;
    position: Position;
    image: HTMLImageElement = new Image();
    private canvas: HTMLCanvasElement;

    constructor(private gameService: GameService, canvas: HTMLCanvasElement) {
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
