import './../App.css';

class DamageText {
  x: number;
  y: number;
  damage: number;
  opacity: number;
  lifespan: number;
  timePassed: number;

  constructor(x: number, y: number, damage: number) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.opacity = 1;
    this.lifespan = 1000; // Display time 1 second
    this.timePassed = 0;
  }

  update(deltaTime: number): void {
    this.y -= 0.5; // Moves up slightly
    this.timePassed += deltaTime;
    this.opacity = Math.max(0, 1 - this.timePassed / this.lifespan);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = this.opacity;
    ctx.font = '100px "Handjet", sans-serif'; // Use Handjet font
    ctx.fillStyle = 'red';
    ctx.fillText(this.damage.toString(), this.x, this.y);
    ctx.globalAlpha = 1; // Reset opacity after drawing
  }
}

export default DamageText;
