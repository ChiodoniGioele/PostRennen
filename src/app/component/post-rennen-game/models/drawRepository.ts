import {Postman} from "./postman";
import {Obstacle} from "./obstacle";
import {Draw} from "./draw";

export class DrawRepository {
  private _postman: Postman;
  private _obstacles: Obstacle[];

  constructor(postman: Postman, obstacles: Obstacle[] = []) {
    this._postman = postman;
    this._obstacles = obstacles;
  }

  getDraw(): Draw[] {
    return [...this._obstacles, this._postman];
  }

  get postman(): Postman {
    return this._postman;
  }

  set postman(value: Postman) {
    this._postman = value;
  }

  get obstacles(): Obstacle[] {
    return this._obstacles;
  }

  set obstacles(value: Obstacle[]) {
    this._obstacles = value;
  }
}
