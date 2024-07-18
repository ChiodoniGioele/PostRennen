# Postman 

[To README](./../../../../README.md) 
[To file](./../../../../02_APP/PostRennen/src/app/component/post-rennen-game/models/postman.ts)

The `Postman` class is an extension of the [Draw](./draw.md) class, and it represents the main character of the game.

Once the class is instantiated, it first loads the images for the animation. After the images are loaded, it starts the animation using the `startAnimationLoop()` function.

```Typescript
constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, position: Position) {  
  super(canvas, ctx, position);  
  this.crouchImage.src = 'assets/postman/5.png';  
  this.jumpImage.src = 'assets/postman/4.png';  
  
  this.loadFrames();  
}  
  
private loadFrames(): void {  
  const promises = this.animationFramesSequence.map((frameNumber) => {  
    return new Promise<HTMLImageElement>((resolve) => {  
      const image = new Image();  
      image.src = `assets/postman/${frameNumber}.png`;  
      image.onload = () => resolve(image);  
    });  
  });  
  
  Promise.all(promises).then((images) => {  
    this.frames = images;  
    this.startAnimationLoop();  
  });  
}
```

The `startAnimationLoop()` function updates the frame through the `animationLoop()` function.

```Typescript
private startAnimationLoop(speed: number = 80): void {  
  this.stopAnimationLoop();  
  if (this.animationInterval === null) {  
    this.animationInterval = setInterval(() => {  
      this.animationLoop();  
    }, speed);  
  }  
}  
  
private updateFrameIndex(): void {  
  this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;  
}  
  
private animationLoop(): void {  
  this.updateFrameIndex();  
  if (this._isCrouch) {  
    this.image = this.crouchImage;  
  } else if (this._isJumping) {  
    this.image = this.jumpImage;  
  } else {  
    this.image = this.frames[this.currentFrameIndex];  
  }  
}
```

The `draw()` function is an override of the one already implemented in [Draw](./draw.md). Before calling the `drawImage()` function, it checks that Postman cannot exit the visible `canvas` using the `controlPosition()` function. Meanwhile, the `adaptY()`function ensures that when jumping, the altitude can vary by setting `Altitude` to auto.

```Typescript 
override draw(altitude?: Altitude) {  
  this.adaptY();  
  this.controlPosition();  
  if (!this.ctx) {  
    console.error('Contesto 2D non valido.');  
    return;  
  }  
  if (!this.image?.complete) {  
    return;  
  }  
  this.drawImage(this.isFlipped);  
}  
  
private controlPosition(): void {  
  if (this.position.x < 0) {  
    this.position.x = 0;  
  } else if (this.position.x + this.position.width > this.canvas.width) {  
    this.position.x = this.canvas.width - this.position.width;  
  }  
  if (this.position.y < 0) {  
    this.position.y = 0;  
    this.position.altitude = Altitude.Auto;  
  } else if (this.position.y + this.position.height > this.canvas.height) {  
    this.position.y = this.canvas.height - this.position.height;  
    this.position.altitude = Altitude.Auto;  
  }  
}  
  
adaptY(): void {  
  if (this.isJumping) {  
    this.position.altitude = Altitude.Auto;  
  } else {  
    this.position.altitude = Altitude.Down;  
  }  
}
```

The `Postman` class also implements movement functions: `moveLeft`, `moveRight`, `crouch()`, and `jump()`. These are called by the [Game Controller](./../controllers/game.md).


La funzione di movimento `jump()` è l'unica un po' complessa. 

Questa come prima cosa instanzia una [Parabola](./../function.md) che rappresenterà il percorso del salto. 
Poi ne ricava la distanza totale sul asse $X$ tra i due punti con $y = 0$  e salva la posizione di partenza.

```Typescript 
const parabola = new ParabolaFunction(-1 / 15, 200);  
const distanceX = parabola.getDistanceX();  

const initialPosition: { x: number, y: number } = {  
  x: this.position.x,  
  y: this.position.y,  
};
```

Then it starts a timer where it continues to move along the parabola until the entire distance $X$ is covered. At each interval, the $X$ position will increase by `distanceRun += distanceX / totalStep;` (totalStep is used to adjust the number of frames for a jump).

Based on the distance already covered, it sets the $Y$ position using: `this.position.y = initialPosition.y - deltaY;`.`

```Typescript
jump() {  
  this.stopMove();  
  this.isJumping = true;  
  const parabola = new ParabolaFunction(-1 / 15, 200);  
  const distanceX = parabola.getDistanceX();  
  const totalStep = 20;  
  let distanceRun = 0;  
  
  const initialPosition: { x: number, y: number } = {  
    x: this.position.x,  
    y: this.position.y,  
  };  
  
  this.moveInterval = setInterval(() => {  
    if (distanceRun < distanceX) {  
      distanceRun += distanceX / totalStep;  
      if (this.isFlipped) {  
        this.position.x = initialPosition.x - distanceRun;  
      } else {  
        this.position.x = initialPosition.x + distanceRun;  
      }  
      const deltaY = parabola.getYByX(distanceRun);  
      this.position.y = initialPosition.y - deltaY;  
    } else {  
      this.stopMove();  
      this.isJumping = false;  
      this.position.y = initialPosition.y;  
    }  
  }, 20);  
}
```

[To README](./../../../../README.md) 