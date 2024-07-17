# Function

The `Function` class represents the movement of the jump. It requires two values: width and height.

- Width represents the length of the jump (note: the value passed does not correspond to pixels).
- Height represents the height of the jump (this represents the value in pixels).

These values are used to represent the function through this equation:

**$y = width * x^2 + height$**

The class contains the following 2 public methods used to draw [Postman](./../models/postman.md) when jumping:

- `getYByX()`
    - This returns the Y coordinate based on the X position.
- `getDistanceX()`
    - This returns the distance between the two points of intersection with the X-axis (y = 0).

```Typescript 
getYByX(distanceRun: number): number {  
  const y = this.width * Math.pow(this.getIntersezioneXNegativo() + distanceRun, 2) + this.height;  
  return y > 0 ? y : 0;  
}  
  
getDistanceX(): number {  
  return Math.sqrt(Math.abs(this.height) / Math.abs(this.width)) * 2;  
}  
  
private getIntersezioneXNegativo(): number {  
  return -Math.sqrt(Math.abs(this.height) / Math.abs(this.width));  
}
```