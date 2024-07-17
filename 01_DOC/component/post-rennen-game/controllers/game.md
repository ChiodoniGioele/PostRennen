# Game Controller

[To README](./../../../../README.md) 

The `GameController` handles all interactions between objects on the canvas.

Once started using the `start()` function, it enters the `gameLoop()`.

The `gameLoop()` function is responsible for clearing the canvas and redrawing all new objects.

```Typescript 
gameLoop() {  
  this.clearCanvas();  
  this.drawFrame();  
}  
  
drawFrame(): void {  
  this.drawTemporalHeightLine();  
  for (let draw of this.drawRepository.getDraw()) {  
    this.obstaclePassed(draw);  
    draw.draw();  
    this.obstacleTouch(draw);  
  }  
}
```

The `obstaclePassed()` function handles the removal of obstacles that have exited the canvas (`x < 0 - image.width`). It does this through the [DrawRepository](./../models/drawRepository.md), which calls the `removeObstacle()` function of the [ObstacleGenerator](./../models/obstacleGenerator.md).

``` Typescript
private obstaclePassed(draw: Draw): void {  
  if ((draw.position.x < 0 - draw.image.width) && !(draw instanceof Postman)) {  
    this.drawRepository.removeObstacle(draw as Obstacle);  
  }  
}
```

Meanwhile, `obstacleTouch()` is responsible for checking if that `draw` is an [Obstacle](./../models/obstacle.md) and if it is touching [Postman](./../models/postman.md).

```Typescript
private obstacleTouch(draw: Draw): void {  
  if (
	!(draw instanceof Postman) && 
	draw.isOverlapping(this.drawRepository.postman.position)
  ) {  
    this.drawRepository.removeObstacle(draw as Obstacle);  
  }  
}
```

In that case, if they touch, the player will have lost.

Additionally, the Game Controller is responsible for capturing all keyboard inputs and invoking the model with the corresponding action. This is done through the `handleKeyDown` and `handleKeyUp` functions.

[To README](./../../../../README.md) 