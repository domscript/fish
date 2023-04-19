import { Game } from "./game";
import { Mouse } from "./main";

export class Player {
  player = document.getElementById(
    "playerLeft0"
  ) as unknown as HTMLImageElement;

  x: number;
  y: number;

  radius = 50;
  scale = 0.8;
  angle = 0;
  frameX = 0;
  frameY = 0;
  frame = 0;
  spriteWidth = 160;
  spriteHeight = 105;

  moving = false;

  constructor(public game: Game, public mouse: Mouse) {
    this.x = this.game.width;
    this.y = this.game.height / 2;
  }
  update() {
    if (this.game.score > 100 && this.game.score <= 200) {
      this.player = document.getElementById(
        "playerLeft1"
      ) as unknown as HTMLImageElement;
    } else if (this.game.score > 200) {
      this.player = document.getElementById(
        "playerLeft2"
      ) as unknown as HTMLImageElement;
    }

    const dx = this.x - this.mouse.x;
    const dy = this.y - this.mouse.y;
    if (this.mouse.x != this.x) {
      this.x -= dx / 20;
      this.moving = true;
    }
    if (this.mouse.y != this.y) {
      this.y -= dy / 20;
      this.moving = true;
    }
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width) this.x = this.game.width;
    if (this.y < 50) this.y = 50;
    if (this.y > this.game.height) this.y = this.game.height;
    let theta = Math.atan2(dy, dx);
    this.angle = theta;
  }
  draw(context: CanvasRenderingContext2D) {
    // if (this.mouse.click) {
    //   context.lineWidth = 0.2;
    //   context.beginPath();
    //   context.moveTo(this.x, this.y);
    //   context.lineTo(this.mouse.x, this.mouse.y);
    //   context.stroke();
    // }
    if (this.game.gameFrame % 10 == 0) {
      this.frame++;
      if (this.frame >= 12) this.frame = 0;
      if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
        this.frameX = 0;
      } else this.frameX++;
      if (this.frame < 3) {
        this.frameY = 0;
      } else if (this.frame < 7) {
        this.frameY = 1;
      } else if (this.frame < 11) {
        this.frameY = 2;
      } else this.frameY = 0;
    }

    context.fillStyle = "black";
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    //context.beginPath();
    //context.arc(0, 0, this.radius, 0, Math.PI * 360);
    //context.fill();
    if (this.x >= this.mouse.x) {
      context.drawImage(
        this.player,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - 60,
        0 - this.spriteHeight / 2,
        this.spriteWidth * this.scale,
        this.spriteHeight * this.scale
      );
    } else {
      context.translate(this.spriteWidth, 0);
      context.scale(1, -1);
      context.drawImage(
        this.player,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - this.spriteWidth * 1.4,
        0 - this.spriteHeight / 2,
        this.spriteWidth * this.scale,
        this.spriteHeight * this.scale
      );
    }
    context.restore();
  }
}
