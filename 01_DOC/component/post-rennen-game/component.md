# PostRennenComponent

[To README](./../../../README.md) 

**PostRennenComponent View** contains only the `canvas`. Once the View is initialized, I create the controller and start the [Game](./controllers/game.md).

```typescript
this.game = new Game(this.canvasRef.nativeElement);  
this.game.start();
```


[To README](./../../../README.md) 