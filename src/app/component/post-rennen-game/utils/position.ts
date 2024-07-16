import {Altitude} from "./altitude";

export class Position {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  private _altitude: Altitude;

  constructor(x: number, altitude: Altitude = Altitude.Auto, y: number = 0, width: number = 0, height: number = 0) {
    this._x = x;
    this._altitude = altitude;
    if (altitude == Altitude.Auto) {
      this._y = y;
    } else {
      this._y = altitude;
    }
    this._width = width;
    this._height = height;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    if (this._altitude == Altitude.Auto) {
      return this._y;
    } else {
      return this._altitude;
    }
  }

  set y(value: number) {
    this.altitude = Altitude.Auto;
    this._y = value;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  setDimension(image: HTMLImageElement) {
    this._width = image.width;
    this._height = image.height;
  }


  get altitude(): Altitude {
    return this._altitude;
  }

  set altitude(value: Altitude) {
    this._altitude = value;
    if (value != Altitude.Auto) {
      this._y = value;
    }
  }
}
