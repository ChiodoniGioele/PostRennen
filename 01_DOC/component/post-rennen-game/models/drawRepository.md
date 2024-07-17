# DrawRepository

The `DrawRepository` class is used to save all the objects drawn on the canvas. It has an [ObstacleGenerator](./obstacleGenerator.md) to be able to get all the present obstacles. Additionally, it holds an instance of [Postman](./postman.md).

Once instantiated, it starts the generation of obstacles.

```Typescript
constructor(canvas: HTMLCanvasElement, postman: Postman) {  
  this._postman = postman;  
  this.obstacleGenerator = new ObstacleGenerator(canvas);  
  this.obstacleGenerator.startGenerate();  
}
```

Through `getDraw()`, the [Game Controller](./../controllers/game.md) retrieves all the drawings and draws them on the `canvas`.

```Typescript
getDraw(): Draw[] {  
  return [...this.obstacleGenerator.obstacles, this._postman];  
}
```

Additionally, this class has the `removeObstacle()` function, which always calls `removeObstacle()` of the [ObstacleGenerator](./obstacleGenerator.md) class, allowing obstacles to be removed without directly interacting with ObstacleGenerator.