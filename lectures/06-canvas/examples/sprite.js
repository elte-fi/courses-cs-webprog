class Sprite {
  currentFrame = 0;
  timeSinceLastFrame = 0;

  constructor({
    image,
    width,
    height,
    spritesPerRow,
    rowCount,
    frameDuration = 30
  }) {
    this.image = new Image();
    this.image.src = image;
    this.width = width;
    this.height = height;
    this.spritesPerRow = spritesPerRow;
    this.rowCount = rowCount;
    this.frameDuration = frameDuration;
  }

  get spriteCount() {
    return this.spritesPerRow * this.rowCount;
  }

  update(dt) {
    this.timeSinceLastFrame += dt;

    if (this.timeSinceLastFrame > this.frameDuration) {
      this.currentFrame = (this.currentFrame + 1) % this.spriteCount;
      this.timeSinceLastFrame = 0;
    }
  }

  render(context, targetX, targetY, width, height) {
    const sourceX = (this.currentFrame % this.spritesPerRow) * this.width;
    const sourceY =
      Math.trunc(this.currentFrame / this.spritesPerRow) * this.height;

    context.drawImage(
      this.image,
      sourceX,
      sourceY,
      this.width,
      this.height,
      targetX,
      targetY,
      width || this.width,
      height || this.height
    );
  }
}
