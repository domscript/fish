import { Game } from "./game";
import { Mouse } from "./main";
import { SpritesMap } from "./spritesMap";

export class Player {
  player = document.getElementById("playerLeft") as unknown as HTMLImageElement;

  x: number;
  y: number;

  collisionRadius = 50;
  scale = 0.8;
  angle = 0;
  frameTimer = 0;
  frameInterval = 1000 / 20; // 20 fps
  sprites = SpritesMap;
  frameMax: number = SpritesMap.state0.loc.length - 1;
  frame = 0;
  spriteWidth: number;
  spriteHeight: number;
  fish = "state0" as keyof typeof SpritesMap;
  change = 500;

  moving = false;

  constructor(public game: Game, public mouse: Mouse) {
    this.x = this.game.width;
    this.y = this.game.height / 2;
    this.spriteWidth = this.sprites[this.fish].sizeX;
    this.spriteHeight = this.sprites[this.fish].sizeY;
  }
  update(deltaTimeInMilliseconds: number) {
    this.spriteAnimation(deltaTimeInMilliseconds);

    if (this.game.score > this.change && this.game.score <= this.change * 2) {
      this.fish = "state1";
    } else if (
      this.game.score > this.change * 2 &&
      this.game.score <= this.change * 3
    ) {
      this.fish = "state2";
    } else if (this.game.score > this.change * 3) {
      this.fish = "state3";
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
    context.fillStyle = "black";
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    // context.beginPath();
    // context.arc(0, 0, this.collisionRadius, 0, Math.PI * 360);
    // context.fill();

    if (this.x >= this.mouse.x) {
      context.drawImage(
        this.player,
        this.sprites[this.fish].loc[this.frame].x,
        this.sprites[this.fish].loc[this.frame].y,
        this.sprites[this.fish].sizeX,
        this.sprites[this.fish].sizeY,
        //   this.params.x - (this.width * this.scale) / 2,
        //   this.params.y + (this.height / 2) * (1 - this.scale),
        0 - 60,
        0 - this.spriteHeight / 2,
        this.spriteWidth * this.scale,
        this.spriteHeight * this.scale
      );
    } else {
      // context.translate(this.spriteWidth / 2, 0);
      context.translate(this.spriteWidth, 0);
      context.scale(1, -1);
      context.drawImage(
        this.player,
        this.sprites[this.fish].loc[this.frame].x,
        this.sprites[this.fish].loc[this.frame].y,
        this.sprites[this.fish].sizeX,
        this.sprites[this.fish].sizeY,
        // -this.x - (this.spriteWidth / 2) * (-1 + this.scale),
        //   this.y + (this.spriteHeight / 2) * (1 - this.scale),
        0 - this.spriteWidth * 1.4,
        0 - this.spriteHeight / 2,
        this.spriteWidth * this.scale,
        this.spriteHeight * this.scale
      );
    }
    context.restore();
  }

  spriteAnimation(deltaTimeInMilliseconds: number): void {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frame < this.frameMax) {
        this.frame++;
      } else this.frame = 0;
    } else {
      this.frameTimer += deltaTimeInMilliseconds;
    }
  }
}
