import herowalk from './../assets/monster/redhood.png'

class Redhood {
  position: { x: number; y: number };
  imageIdle: HTMLImageElement;
  frameWidthIdle: number;
  frameHeightIdle: number;
  frameCountIdle: number;
  currentFrame: number;
  frameTime: number;
  frameDurationIdle: number;
  isMoving: boolean;

  constructor(x: number, y: number) {
    this.position = { x, y };

    // Load image for idle animation
    this.imageIdle = new Image();
    this.imageIdle.src = herowalk;

    // Idle animation settings
    this.frameWidthIdle = 32;
    this.frameHeightIdle = 34;
    this.frameCountIdle = 8;

    this.currentFrame = 0;
    this.frameTime = 0;
    this.frameDurationIdle = 200; // Adjust as needed
    this.isMoving = false;
  }

  // Update the hero's idle animation
  update(deltaTime: number): void {
    this.frameTime += deltaTime;

    if (this.frameTime >= this.frameDurationIdle) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCountIdle;
      this.frameTime = 0;
    }
  }

  // Move the hero (currently not used, but kept for potential future use)
  move(direction: string, step = 10): void {
    switch (direction) {
      case 'left':
        this.position.x -= step;
        break;
      case 'right':
        this.position.x += step;
        break;
      case 'up':
        this.position.y -= step;
        break;
      case 'down':
        this.position.y += step;
        break;
      default:
        break;
    }
    this.isMoving = true;
  }

  stop(): void {
    this.isMoving = false;
    this.currentFrame = 0;
  }

  // Draw the hero on the canvas
  draw(ctx: CanvasRenderingContext2D): void {
    const frameX = this.currentFrame * this.frameWidthIdle;
    const frameWidth = this.frameWidthIdle;
    const frameHeight = this.frameHeightIdle;

    ctx.drawImage(
      this.imageIdle,
      frameX, 0,
      frameWidth, frameHeight,
      this.position.x, this.position.y,
      50, 94
    );
  }
}

export default Redhood;
