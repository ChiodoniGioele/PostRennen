import { Drawable } from "../interfaces/drawable";
import { Position } from "../utils/position";
import { Altitude } from "../utils/altitude";

export class Counter implements Drawable {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    image: HTMLImageElement = new Image();
    position: Position;
    private _count: number;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.position = new Position(canvas.width - 150, Altitude.Auto, 150);
        this._count = 0;

        this.draw();
    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Pulisce il canvas prima di disegnare
        this.ctx.font = "48px PixelifySans";
        this.ctx.strokeText(String(this._count), this.position.x, this.position.y);
    }

    increment(): void {
        this._count++;
        this.draw(); // Ridisegna dopo l'incremento
    }

    get count(): number {
        return this._count;
    }
}
