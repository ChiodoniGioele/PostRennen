# Draw

The `Draw` class is an abstract class that extends [Drawable](./../interfaces/drawable.md), the interface that represents all objects that can be drawn.

This class contains the `drawImage()` method, which is used to draw images. It accepts an optional parameter, `isFlipped`, which defaults to false. This parameter is used to draw images in a mirrored manner.

Additionally, it contains the `isOverlapping()` method, which takes a [Position](./../utils/position.md) as input and returns a boolean. This function is used to determine if the passed position is at least partially overlapping with the object in question.