import "./style.css";
import { Game } from "./game";

export type Mouse = {
  x: number;
  y: number;
  click: boolean;
};

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  if (!ctx) return;
  const CANVAS_WIDTH = (canvas.width = 800);
  const CANVAS_HEIGHT = (canvas.height = 500);

  ctx.font = "50px Georgia";

  // Mouse interactivity
  let canvasPosition = canvas.getBoundingClientRect();
  const mouse: Mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false,
  };

  const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT, mouse);

  canvas.addEventListener("mousemove", function (e) {
    mouse.click = true;
    mouse.x = (e.offsetX * CANVAS_WIDTH) / canvasPosition.width;
    mouse.y = (e.offsetY * CANVAS_HEIGHT) / canvasPosition.height;
  });
  window.addEventListener("mouseup", function () {
    mouse.click = false;
  });
  window.addEventListener("resize", function () {
    canvasPosition = canvas.getBoundingClientRect();
    mouse.x = canvas.width / 2;
    mouse.y = canvas.height / 2;
  });

  // Bubbles
  // game.init(ctx);

  let lastTime = 0;

  function animate(timeStamp: number = 0) {
    if (!ctx) return;
    const deltaTimeInMilliseconds = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    game.update(ctx, deltaTimeInMilliseconds);
    game.draw(ctx);
    ctx.fillStyle = "rgba(34,147,214,1)";
    ctx.font = "20px Georgia";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText("score: " + game.score, 141, 336);
    ctx.fillStyle = "rgba(34,147,214,1)";
    ctx.fillText("score: " + game.score, 140, 335);
    requestAnimationFrame(animate);
  }
  animate();
});
