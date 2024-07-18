# Draw

[To README](./../../../../README.md) 

[To file](./../../../../02_APP/PostRennen/src/app/component/post-rennen-game/models/draw.ts)

The `Draw` class is an abstract class that extends [Drawable](./../interfaces/drawable.md), the interface that represents all objects that can be drawn.

This class contains the `drawImage()` method, which is used to draw images. It accepts an optional parameter, `isFlipped`, which defaults to false. This parameter is used to draw images in a mirrored manner.

```Typescript
protected drawImage(flipped: boolean = false): void {  
  let y = this.position.y;  
  let x = this.position.x;  
  if (flipped) {  
    x += this.position.width;  
    this.ctx.save();  
    this.ctx.scale(-1, 1);  
    this.ctx.drawImage(  
      this.image, -x, y, this.position.width, this.position.height  
    );  
    this.ctx.restore();  
  } else {  
    this.ctx.drawImage(
	    this.image, x, y, this.position.width, this.position.height
    );  
  }  
}
```

Additionally, it contains the `isOverlapping()` method, which takes a [Position](./../utils/position.md) as input and returns a boolean. This function is used to determine if the passed position is at least partially overlapping with the object in question.

```Typescript
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
```

[To README](./../../../../README.md) 