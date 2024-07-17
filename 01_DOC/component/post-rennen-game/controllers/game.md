# Game Controller

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

Additionally, the Game Controller is responsible for capturing all keyboard inputs and invoking the model with the corresponding action. This is done through the `handleKeyDown` and `handleKeyUp` functions.