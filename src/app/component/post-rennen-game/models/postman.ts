import {Draw} from "./draw";
import {Altitude} from "../utils/altitude";
import {Position} from "../utils/position";
import {Function as ParabolaFunction} from "../utils/function";

export class Postman extends Draw {

  private _isJumping = false;
  private _isCrouch = false;

  frames: HTMLImageElement[] = [];
  private currentFrameIndex = 0;
  private animationFramesSequence = ['1', '2', '2', '3', '3', '2', '2', '1'];
  private crouchImage = new Image();
  private jumpImage = new Image();

  private animationInterval: number | null = null;
  private moveInterval: number | null = null;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, position: Position) {
    super(canvas, ctx, position);
    this.crouchImage.src = 'assets/postman/5.png';
    this.jumpImage.src = 'assets/postman/4.png';

    this.loadFrames();
  }

  private loadFrames(): void {
    const promises = this.animationFramesSequence.map((frameNumber) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const image = new Image();
        image.src = `assets/postman/${frameNumber}.png`;
        image.onload = () => resolve(image);
      });
    });

    Promise.all(promises).then((images) => {
      this.frames = images;
      this.startAnimationLoop();
    });
  }

  private startAnimationLoop(speed: number = 80): void {
    this.stopAnimationLoop();
    if (this.animationInterval === null) {
      this.animationInterval = setInterval(() => {
        this.animationLoop();
      }, speed);
    }
  }

  private updateFrameIndex(): void {
    this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
  }

  private animationLoop(): void {
    this.updateFrameIndex();
    if (this._isCrouch) {
      this.image = this.crouchImage;
    } else if (this._isJumping) {
      this.image = this.jumpImage;
    } else {
      this.image = this.frames[this.currentFrameIndex];
    }
  }

  private stopAnimationLoop(): void {
    if (this.animationInterval !== null) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  override draw(altitude?: Altitude) {
    this.adaptY();
    this.controlPosition();
    if (!this.ctx) {
      console.error('Contesto 2D non valido.');
      return;
    }
    if (!this.image?.complete) {
      return;
    }
    this.drawImage(this.isFlipped);
  }

  private controlPosition(): void {
    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x + this.position.width > this.canvas.width) {
      this.position.x = this.canvas.width - this.position.width;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.position.altitude = Altitude.Auto;
    } else if (this.position.y + this.position.height > this.canvas.height) {
      this.position.y = this.canvas.height - this.position.height;
      this.position.altitude = Altitude.Auto;
    }
  }

  adaptY(): void {
    if (this.isJumping) {
      this.position.altitude = Altitude.Auto;
    } else {
      this.position.altitude = Altitude.Down;
    }
  }


  jump() {
    this.stopMove();
    this.isJumping = true;
    const parabola = new ParabolaFunction(-1 / 15, 200);
    const distanceX = parabola.getDistanceX();
    const totalStep = 20;
    let distanceRun = 0;

    const initialPosition: { x: number, y: number } = {
      x: this.position.x,
      y: this.position.y,
    };

    this.moveInterval = setInterval(() => {
      if (distanceRun < distanceX) {
        distanceRun += distanceX / totalStep;
        if (this.isFlipped) {
          this.position.x = initialPosition.x - distanceRun;
        } else {
          this.position.x = initialPosition.x + distanceRun;
        }
        const deltaY = parabola.getYByX(distanceRun);
        this.position.y = initialPosition.y - deltaY;
      } else {
        this.stopMove();
        this.isJumping = false;
        this.position.y = initialPosition.y;
      }
    }, 20);
  }

  moveLeft() {
    this.stopMove();
    this.isFlipped = true;
    this.startAnimationLoop(60);
    this.moveInterval = setInterval(() => {
      this.position.x -= 7;
    }, 20);
  }

  moveRight() {
    this.stopMove();
    this.isFlipped = false;
    this.startAnimationLoop(60);
    this.moveInterval = setInterval(() => {
      this.position.x += 7;
    }, 20);
  }

  crouch() {
    this.stopMove();
    this._isCrouch = true;
  }

  stopCrouch() {
    this.isCrouch = false;
  }

  up() {
    this.stopMove();
  }

  stopMove() {
    if (this.moveInterval !== null) {
      clearInterval(this.moveInterval);
      this.moveInterval = null;
      this.startAnimationLoop();
    }
  }

  get isJumping(): boolean {
    return this._isJumping;
  }

  set isJumping(value: boolean) {
    this._isJumping = value;
  }

  get isCrouch(): boolean {
    return this._isCrouch;
  }

  set isCrouch(value: boolean) {
    this._isCrouch = value;
  }
}
