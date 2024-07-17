# Drawable

This interface is used to represent all objects that can be drawn on the `canvas`.

```Typescript
export interface Drawable {  
  
  ctx: CanvasRenderingContext2D;  
  position: Position;  
  image: HTMLImageElement;  
  
  draw(): void;  
}
```

