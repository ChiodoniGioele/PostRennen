# ObstacleGenerator

[To README](./../../../../README.md) 

[To file](./../../../../02_APP/PostRennen/src/app/component/post-rennen-game/models/obstacleGenerator.ts)

This class is used to generate obstacles automatically. The constructor only needs the canvas to know where to position the obstacle generation point.

Once the `start()` function is called, it will begin creating obstacle objects and placing them in the `obstacles[]` array.

```Typescript
startGenerate() {  
  this.generationInterval = setInterval(() => {  
    const altitude = this.getRandomAltitude();  
    const image = this.getImageForAltitude(altitude);  
    this.obstacles.push(this.generate(altitude, image));  
  }, 2000);  
}
```

By using `removeObstacle(obstacle: Obstacle)`, passing the obstacle as a parameter, it is possible to remove it from the array. This ensures that the number of obstacles to be drawn is always kept to a minimum.

```Typescript
removeObstacle(obstacle: Obstacle) {  
  const index = this._obstacles.indexOf(obstacle);  
  if (index > -1) {  
    this._obstacles.splice(index, 1);  
  }  
}
```

[To file](./../../../../02_APP/PostRennen/src/app/component/post-rennen-game/models/obstacleGenerator.ts)

[To README](./../../../../README.md) 