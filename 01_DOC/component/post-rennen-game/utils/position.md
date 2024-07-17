# Position

[To README](./../../../../README.md) 

With the `Position` class, I represent everything related to the position of objects on the canvas, as well as their size.

This class must have an x-coordinate. The y-coordinate can be set manually or through the default heights set in `Altitude`.

```Typescript

constructor(
	x: number, altitude: Altitude = Altitude.Auto, y: number = 0,
	width: number = 0, height: number = 0
) {  
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

```

The main peculiarity lies in the y-coordinate, which will return different coordinates based on the set `Altitude`.

This ensures that when objects have an `Altitude` of `Down` or `Middle`, their lowest point is at the same height.

```Typescript
get y(): number {  
  let posY = 0;  
  if (this._altitude == Altitude.Auto) {  
    posY = this._y;  
  } else {  
    posY = this._altitude;  
  }  
  if (this._altitude == Altitude.Up) {  
    return posY;  
  } else {  
    posY -= this._height;  
  }  
  return posY;  
}
```

To set the size and width, you need to pass it the image that will represent it.

```Typescript
setDimension(image: HTMLImageElement) {  
  this._width = image.width;  
  this._height = image.height;  
}
```


[To README](./../../../../README.md) 