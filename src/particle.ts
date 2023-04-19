import { Player } from "./player";

export class Particle {
  baseX: number;
  baseY: number;
  size = 7;
  density = Math.random() * 15 + 1;
  distance: number;

  constructor(public x: number, public y: number) {
    this.baseX = x;
    this.baseY = y;

    this.distance = 0;
  }
  draw(context: CanvasRenderingContext2D) {
    context.lineWidth = 3;
    context.strokeStyle = "rgba(34,147,214,1)";
    context.fillStyle = "rgba(255,255,255,1)";
    context.beginPath();
    if (this.distance < 50) {
      this.size = 14;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(this.x + 4, this.y - 4, this.size / 3, 0, Math.PI * 2);
      context.arc(this.x - 6, this.y - 6, this.size / 5, 0, Math.PI * 2);
    } else if (this.distance <= 80) {
      this.size = 8;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(this.x + 3, this.y - 3, this.size / 2.5, 0, Math.PI * 2);
      context.arc(this.x - 4, this.y - 4, this.size / 4.5, 0, Math.PI * 2);
    } else {
      this.size = 5;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.arc(this.x + 1, this.y - 1, this.size / 3, 0, Math.PI * 2);
    }
    context.closePath();
    context.fill();
  }
  update(player: Player) {
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    this.distance = distance;
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = 100;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < 100) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 20;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 20;
      }
    }
  }
}
