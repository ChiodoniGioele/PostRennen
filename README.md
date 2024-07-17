# PostRennen

Game version 1.0.0.
Angular CLI version 17.3.8.


## Project Objectives
The objective is to develop a web game similar to the Google Chrome game "Dino", but with the style of Swiss Post and some additional features.
The game must be suitable for all age groups and accessible from any platform.


## Structure
``` 
src /
	|-- app /
		|-- component /
		|	|-- post-rennen-game /
		|	|	|-- controllers /
		|	|	|-- interfaces /
		|	|	|-- models /
		|	|	|-- utils /
		|	|
		|	|-- service /
		|
		|-- assets/
		|	|-- obstacle /
		|	|	|-- up /
		|	|	|-- down /
		|	|	|-- middle /
		|	|
		|	|-- postman /

```

## Logic

### Controllers:
The `game.ts` controller deals with calling the components and telling them when they need to be rendered. From this controller, it's possible to manage frames through canvas updates. Additionally, it handles keyboard input.

### Models and Interfaces:
In the Models folder, there are all the models that handle representing objects. `Drawable` is the interface that represents all *models that can be drawn*. This interface is implemented by `Draw`, which in turn is **extended** by the models of the objects.

The `DrawRepository` class **manages** all objects that are **currently drawn**. It allows the `game` controller to have an `array` of `Draw` objects, enabling it to call the `draw()` method for each one to draw it on the canvas.

The `ObstacleGenerator` class (instantiated in DrawRepository) **manages** all `obstacles` on the canvas. It handles generating them and removing them when they exit the canvas.

### Utils
In the `utils` folder, I have all the classes that help me represent the models.

## Documentation
- PostRennenComponent
  - [Component](./doc/component/post-rennen-game/component.md)
  - Controller
    - [Game Controller](./doc/component/post-rennen-game/controllers/game.md)
  - Model
    - [Postman](./doc/component/post-rennen-game/models/postman.md)
    - [Obstacle](./doc/component/post-rennen-game/models/obstacle.md)
    - [Draw](./doc/component/post-rennen-game/models/draw.md)
    - [DrawRepository](./doc/component/post-rennen-game/models/drawRepository.md)
    - [ObstacleGenerator](./doc/component/post-rennen-game/models/obstacleGenerator.md)
  - Util
    - [Function](./doc/component/post-rennen-game/utils/function.md)
    - [Position](./doc/component/post-rennen-game/utils/position.md)

  

## Command
- **Port**: 4200

- **Run**: `ng serve` | `nam start`

- **Generate**: `ng generate directive|pipe|service|class|guard|interface|enum|module`
  - `—no-standalone`

- **Build**: `ng build`  -> `/dist`

- **test**: ng test

- **end-to-end test**: `ng e2e`
