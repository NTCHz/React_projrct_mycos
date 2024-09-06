import fireballImageSrc from './../asset/boss/projectile.png';

class Fireball {
  position: { x: number; y: number };
  speed: { x: number; y: number };
  radius: number;
  image: HTMLImageElement;
  width: number;
  height: number;
  isActive: boolean;

  constructor(x: number, y: number, speedX: number, speedY: number) {
    this.position = { x, y };
    this.speed = { x: speedX, y: speedY };
    this.radius = 100; // Size of the fireball

    // Load fireball image
    this.image = new Image();
    this.image.src = fireballImageSrc;
    
    // Adjust the size of the fireball to match the image
    this.width = 200;  // Width of the fireball image
    this.height = 200; // Height of the fireball image

    // Initialize the active state
    this.isActive = true;
  }

  update(deltaTime: number): void {
    this.position.x -= this.speed.x * deltaTime;
    this.position.y -= this.speed.y * deltaTime;

    // Check if the fireball is out of bounds
    if (this.position.x < 130) {
      this.isActive = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isActive) {
      ctx.drawImage(
        this.image,
        this.position.x - this.width / 2, // Adjust x position to center the image
        this.position.y - this.height / 6, // Adjust y position to center the image
        this.width, 
        this.height
      );
    }
  }
}

export default Fireball;
