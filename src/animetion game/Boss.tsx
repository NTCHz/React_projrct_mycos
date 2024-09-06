import bossIdle from './../asset/boss/without_outline/IDLE.png';

class Boss {
  position: { x: number; y: number };
  imageIdle: HTMLImageElement;
  frameWidthIdle: number;
  frameHeightIdle: number;
  frameCountIdle: number;
  currentFrame: number;
  frameTime: number;
  frameDuration: number;

  constructor(x: number, y: number) {
    this.position = { x, y };

    // Load image for idle animation
    this.imageIdle = new Image();
    this.imageIdle.src = bossIdle;

    // Idle animation settings
    this.frameWidthIdle = 79;
    this.frameHeightIdle = 69;
    this.frameCountIdle = 4;

    this.currentFrame = 0;
    this.frameTime = 0;
    this.frameDuration = 100; // Adjust as needed
  }

  // Update the boss's idle animation
  update(deltaTime: number): void {
    this.frameTime += deltaTime;

    if (this.frameTime >= this.frameDuration) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCountIdle;
      this.frameTime = 0;
    }
  }

  // Draw the boss on the canvas
  draw(ctx: CanvasRenderingContext2D): void {
    const frameX = this.currentFrame * this.frameWidthIdle;
    const frameWidth = this.frameWidthIdle;
    const frameHeight = this.frameHeightIdle;

    ctx.drawImage(
      this.imageIdle,
      frameX, 0,
      frameWidth, frameHeight,
      this.position.x, this.position.y,
      40, 60
    );
  }
}

export default Boss;
