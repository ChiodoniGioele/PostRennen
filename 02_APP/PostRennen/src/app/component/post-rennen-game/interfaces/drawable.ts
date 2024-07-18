import {Position} from "../utils/position";

export interface Drawable {

    ctx: CanvasRenderingContext2D;
    position: Position;
    image: HTMLImageElement;

    draw(): void;
}
