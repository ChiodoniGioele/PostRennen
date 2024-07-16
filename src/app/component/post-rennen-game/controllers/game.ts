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
    this.drawRepository = new DrawRepository(postman);
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
        this.drawRepository.postman.stopMove();
        break;
      case 'ArrowRight':
      case 'd':
        this.drawRepository.postman.stopMove();
        break;
      case 'ArrowDown':
      case 's':
        this.drawRepository.postman.stopCrouch();
        break;
    }
  }
}
