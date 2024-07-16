import {Drawable} from "../interfaces/drawable";
import {Position} from "../utils/position";
import {Altitude} from "../utils/altitude";

export abstract class Draw implements Drawable {

  ctx: CanvasRenderingContext2D;
  position: Position;
  isFlipped: boolean = false;
  private _image: HTMLImageElement;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, position: Position, image?: HTMLImageElement) {
    this.ctx = ctx;
    this.position = position;
    this._image = image || new Image();
    this.canvas = canvas;
  }

  draw() {
    this.drawImage(false);
  }

  protected drawImage(flipped: boolean = false): void {
    let y = this.position.y;
    let x = this.position.x;
    if (flipped) {
      x += this.position.width;
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.image,
        -x,
        y,
        this.position.width,
        this.position.height
      );
      this.ctx.restore();
    } else {
      this.ctx.drawImage(
        this.image,
        x,
        y,
        this.position.width,
        this.position.height
      );
    }
  }


  isOverlapping(otherPosition: Position): boolean {
    return this.compareX(otherPosition) && this.compareY(otherPosition);
  }

  private compareX(otherPosition: Position): boolean {
    return !(
      otherPosition.x + otherPosition.width < this.position.x ||
      otherPosition.x > this.position.x + this.position.width
    );
  }

  private compareY(otherPosition: Position): boolean {
    return !(
      otherPosition.y + otherPosition.height < this.position.y ||
      otherPosition.y > this.position.y + this.position.height
    );
  }

  get image(): HTMLImageElement {
    return this._image;
  }

  set image(value: HTMLImageElement) {
    this._image = value;
    this.position.setDimension(this.image)
  }
}
