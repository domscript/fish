import { Game } from "./game";
import { Player } from "./player";

export class Bubble {
  bubble = document.getElementById("bubble") as unknown as HTMLImageElement;

  x: number;
  y: number;
  radius = 50;
  speedY = Math.random() * -5 + -1;
  speedX = 3;

  distance: number = Infinity;
  counted = false;
  frameX = 0;
  spriteWidth = 91.43;
  spriteHeight = 91;
  pop = false;

  scale = 1.5;

  constructor(public game: Game, public player: Player) {
    this.x = Math.random() * this.game.width;
    this.y =
      this.game.height + this.radius + (Math.random() * this.game.height) / 2;
  }
  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.speedX * 9);
    const dx = this.x - this.player.x;
    const dy = this.y - this.player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.bubble,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.game.player.spriteHeight / this.scale,
      this.y - this.game.player.spriteHeight / this.scale,
      this.spriteWidth * this.scale,
      this.spriteHeight * this.scale
    );
  }
}
