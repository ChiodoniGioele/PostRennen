import {Drawable} from "../interfaces/drawable";
import {Position} from "../utils/position";

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
    if (image) {
      this.position.setDimension(image);
    }
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
    this.drawTemporalBorderImage(); // da rimuovere quando finito il gioco
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
    this.position.setDimension(this.image);
  }

  // da elliminare quando finito il gioco //
  private drawTemporalBorderImage(): void {
    // Salva lo stato corrente del contesto
    this.ctx.save();

    // Imposta lo stile per il bordo rosso
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 1;

    // Calcola le coordinate del rettangolo che rappresenta l'immagine
    let x = this.position.x;
    let y = this.position.y;
    let width = this.position.width;
    let height = this.position.height;

    // Disegna il rettangolo rosso attorno all'immagine
    this.ctx.strokeRect(x, y, width, height);

    // Ripristina lo stato originale del contesto
    this.ctx.restore();
  }
}
