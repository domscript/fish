import { Bubble } from "./bubble";
import { Player } from "./player";
import { Mouse } from "./main";
import { Particle } from "./particle";

export class Game {
  // Audio
  bubblePop1 = document.createElement("audio");
  bubblePop2 = document.createElement("audio");

  fontSize = 17;
  player: Player;
  first = 0;
  second = 0;
  text = "Hello!";
  score = 0;
  gameFrame = 0;

  bubblesArray: Bubble[] = [];

  /**** BUBBLE TEXT ***/
  bubbleTextArray: Particle[] = [];
  adjustX = -3;
  adjustY = -3;
  sum = true;

  scoreTime = 0;

  catch = 1;

  constructor(
    public width: number,
    public height: number,
    public mouse: Mouse
  ) {
    this.text = `${this.first}+${this.second}=${this.first + this.second}`;

    this.player = new Player(this, this.mouse);
  }
  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context);
    for (const bubbleText of this.bubbleTextArray) {
      bubbleText.draw(context);
    }
  }
  update(context: CanvasRenderingContext2D) {
    this.gameFrame += 1;

    this.handleBubbles(context);
    this.player.update();
    for (const bubbleText of this.bubbleTextArray) {
      bubbleText.update(this.player);
    }
  }

  handleBubbles(context: CanvasRenderingContext2D): void {
    this.bubblesArray = this.bubblesArray.filter(
      (bubble) => bubble.y <= this.height * 2
    );
    for (const bubble of this.bubblesArray) {
      if (bubble.distance < bubble.radius + this.player.radius) {
        this.popAndRemove(this.bubblesArray.indexOf(bubble), context);
      }
      bubble.update();
      bubble.draw(context);
    }
    if (this.gameFrame % 50 === 0) {
      this.bubblesArray.push(new Bubble(this, this.player));
    }
  }

  popAndRemove(i: number, context: CanvasRenderingContext2D) {
    const { first, second } = this;
    const bubble = this.bubblesArray[i];

    if (bubble) {
      if (!bubble.counted) {
        this.score++;

        Math.random() > 0.5
          ? this.playSound("sound4")
          : this.playSound("sound1");
        if (first <= 9 && second < 9) {
          this.second++;
        } else if (first === 9 && second === 9) {
          this.first = 0;
          this.second = 0;
          this.sum = !this.sum;
        } else {
          this.first++;
          this.second = 0;
        }

        this.composeText();
        this.init(context);
      }

      bubble.counted = true;
      bubble.frameX++;

      if (bubble.frameX > 7) {
        bubble.pop = true;
      }

      if (bubble.pop) {
        this.bubblesArray.splice(i, 1);
      }
    }
  }

  composeText() {
    if (this.sum) {
      this.text = `${this.first}+${this.second}`;
      this.catch = this.first + this.second;
    } else {
      this.text = `${this.first}x${this.second}`;
      this.catch = this.first * this.second;
    }
    this.text += `=${this.catch}`;
  }

  playSound(sound = "sound2") {
    if (sound == "sound1") {
      this.bubblePop1.src = "audio/bubble1.mp3";
      this.bubblePop1.play();
      this.bubblePop1.currentTime = 0;
    } else if ("sound4") {
      this.bubblePop2.src = "audio/bubble4.mp3";
      this.bubblePop2.play();
      this.bubblePop2.currentTime = 0;
    } else {
      this.bubblePop2.src = "audio/bubble2.mp3";
      this.bubblePop2.play();
      this.bubblePop2.currentTime = 0;
    }
  }

  init(context: CanvasRenderingContext2D) {
    const TEXT_WIDTH = 100;
    const TRANSPARENCY_THRESHOLD = 128;
    const PARTICLE_SIZE = 8;

    context.fillStyle = "white";
    context.textAlign = "center";
    context.font = `${this.fontSize}px Avenir`;
    context.fillText(this.text, TEXT_WIDTH / 2, TEXT_WIDTH / 2.5);

    const { data, width, height } = context.getImageData(
      0,
      0,
      TEXT_WIDTH,
      TEXT_WIDTH
    );
    this.bubbleTextArray = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        const isTransparent = alpha < TRANSPARENCY_THRESHOLD;

        if (!isTransparent) {
          const particleX = (x + this.adjustX) * PARTICLE_SIZE;
          const particleY = (y + this.adjustY) * PARTICLE_SIZE;
          this.bubbleTextArray.push(new Particle(particleX, particleY));
        }
      }
    }
  }
}
