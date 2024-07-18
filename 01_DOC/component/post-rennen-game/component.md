# PostRennenComponent

[To README](./../../../README.md) 

[To file](./../../../02_APP/PostRennen/src/app/component/post-rennen-game/post-rennen-game.component.ts)

**PostRennenComponent View** contains only the `canvas`. Once the View is initialized, I create the controller and start the [Game](./controllers/game.md).

```typescript
this.game = new Game(this.canvasRef.nativeElement);  
this.game.start();
```

[To file](./../../../02_APP/PostRennen/src/app/component/post-rennen-game/post-rennen-game.component.ts)

[To README](./../../../README.md) 