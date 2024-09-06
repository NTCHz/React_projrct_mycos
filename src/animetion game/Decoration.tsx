class Decoration {
  position: { x: number; y: number };
  image: HTMLImageElement;
  width: number;
  height: number;

  constructor(x: number, y: number, imageSrc: string, width: number = 50, height: number = 50) {
    this.position = { x, y };
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export default Decoration;
