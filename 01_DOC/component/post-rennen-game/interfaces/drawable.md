# Drawable

[To README](./../../../../README.md) 
[To file](./../../../../02_APP/PostRennen/src/app/component/post-rennen-game/interfaces/drawable.ts)

This interface is used to represent all objects that can be drawn on the `canvas`.

```Typescript
export interface Drawable {  
  
  ctx: CanvasRenderingContext2D;  
  position: Position;  
  image: HTMLImageElement;  
  
  draw(): void;  
}
```

[To README](./../../../../README.md) 