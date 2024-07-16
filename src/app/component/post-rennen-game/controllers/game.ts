import {DrawRepository} from "../models/drawRepository";
import {Postman} from "../models/postman";
import {Position} from "../utils/position";
import {Altitude} from "../utils/altitude";

export class Game {

  private readonly ctx: CanvasRenderingContext2D | null = null;
  private gameInterval: any;
  private canvas: HTMLCanvasElement;
  private drawRepository: DrawRepository;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    if (!this.ctx) {
      throw new Error('Impossibile ottenere il contesto 2D dal canvas.');
    }
    const postman = new Postman(this.canvas, this.ctx, new Position(100, Altitude.Auto));
    this.drawRepository = new DrawRepository(canvas, postman);
  }

  start() {
    this.gameInterval = setInterval(() => this.gameLoop(), 20);
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    window.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  gameLoop() {
    this.clearCanvas();
    this.drawFrame();
  }

  drawFrame(): void {
    this.drawTemporalHeightLine();
    for (let draw of this.drawRepository.getDraw()) {
      draw.draw();
    }
  }


  stop() {
    clearInterval(this.gameInterval);
    window.removeEventListener('keydown', (event) => this.handleKeyDown(event));
  }

  private clearCanvas(): void {
    this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        if (!this.drawRepository.postman.isCrouch && !this.drawRepository.postman.isJumping) {
          this.drawRepository.postman.jump();
        }
        break;
      case 'ArrowDown':
      case 's':
        if (!this.drawRepository.postman.isJumping) {
          this.drawRepository.postman.crouch();
        }
        break;
      case 'ArrowLeft':
      case 'a':
        if (!this.drawRepository.postman.isCrouch && !this.drawRepository.postman.isJumping) {
          this.drawRepository.postman.moveLeft();
        }
        break;
      case 'ArrowRight':
      case 'd':
        if (!this.drawRepository.postman.isCrouch && !this.drawRepository.postman.isJumping) {
          this.drawRepository.postman.moveRight();
        }
        break;
      case ' ':
        this.drawRepository.postman.up();
        break;
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
        if (!this.drawRepository.postman.isJumping) {
          this.drawRepository.postman.stopMove();
        }
        break;
      case 'ArrowRight':
      case 'd':
        if (!this.drawRepository.postman.isJumping) {
          this.drawRepository.postman.stopMove();
        }
        break;
      case 'ArrowDown':
      case 's':
        this.drawRepository.postman.stopCrouch();
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
}
