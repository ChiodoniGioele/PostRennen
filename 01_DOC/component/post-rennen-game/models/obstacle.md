# Obstacle

[To README](./../../../../README.md) 

`Obstacle` is a class that extends [Draw](./draw.md). It is responsible for representing obstacles. Obstacles are generated automatically by [ObstacleGenerator](./obstacleGenerator.md).

Unlike [Draw](./draw.md), obstacles necessarily require an image.

They are initialized and started using the `start()` method.

```Typescript
start() {  
  this.moveInterval = setInterval(() => {  
    this.position.x -= 5;  
  }, 30);  
}
```

[To README](./../../../../README.md) 