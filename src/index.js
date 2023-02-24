class Game {
  constructor() {
    this.score = 0;
    this.obstacles = [];
    this.player = null;
    this.playing = false;
    this.intervalId = null;
    this.frames = 0;
    this.soundHit = new Audio();
    this.soundHit.src = "./sons/efeitos_hit.wav";
    this.soundHit.volume = 0.2;
    this.soundPoint = new Audio();
    this.soundPoint.src = "./sons/efeitos_ponto.wav";
    this.soundPoint.volume = 0.2;
    this.soundWin = new Audio();
    this.soundWin.src = "./sons/efeitos__win.wav";
  }
  start = () => {
    this.player = new Player();
    this.playing = true;
    this.intervalId = setInterval(this.updateObstacles, 20);
  };

  startCountDown() {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    let countDown = [3, 2, 1, "GO!", ""];
    let i = 0;
    const count = document.querySelector("#countdown");
    let intervalCountDown = setInterval(() => {
      count.innerHTML = countDown[i];
      i++;
      if (i === countDown.length) {
        clearInterval(intervalCountDown);
        this.start();
      }
    }, 1000);
  }

  updateObstacles = () => {
    this.frames += 1;

    if (this.frames % 120 === 0) {
      this.createRandomObstacle();
    }

    for (let i = 0; i < this.obstacles.length; i += 1) {
      this.obstacles[i].moveLeft();
      const crash = this.player.crashesWith(this.obstacles[i]);
      if (crash) {
        clearInterval(this.intervalId);
        this.playing = false;
        this.soundHit.play();
        this.showGameOver();
      }
      if (this.obstacles[i].x <= 0) {
        this.obstacles[i].hide();
        this.soundPoint.play();
        this.obstacles.shift();
        this.countScore();
      }

      if (this.player.x + this.player.width >= gameScreen.offsetWidth) {
        clearInterval(this.intervalId);
        this.playing = false;
        this.player.hide();
        this.soundWin.play();
        this.showWinTheGame();
      }
    }
  };
  createRandomObstacle = () => {
    const y = Math.floor(Math.random() * gameScreen.offsetHeight);
    const obstacle = new Obstacle(y);
    this.obstacles.push(obstacle);
  };
  countScore = () => {
    this.score += 1;
    document.querySelector("#score").innerHTML = this.score;
  };
  showGameOver = () => {
    document.querySelector("#game-over span").innerHTML = this.score;
    document.querySelector("#game-over").classList.remove("hidden");
  };
  showWinTheGame = () => {
    document.querySelector("#win-the-game span").innerHTML = this.score;
    document.querySelector("#win-the-game").classList.remove("hidden");
  };
}

class Player {
  constructor() {
    this.width = 100;
    this.height = 100;
    this.x = 100;
    this.y = 100;
    this.speed = 50;
    this.element = null;
    this.createElement();
    this.show();
  }
  createElement() {
    const airplane = document.createElement("img");
    airplane.setAttribute("id", "player");
    airplane.src = "../gifs/Airplane-unscreen.gif";
    airplane.style.width = `${this.width}px`;
    airplane.style.height = `${this.height}px`;
    airplane.style.position = "absolute";
    airplane.style.top = `${this.y}px`;
    airplane.style.left = `${this.x}px`;
    this.element = airplane;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
  hide() {
    gameScreen.removeChild(this.element);
  }

  moveLeft() {
    if (this.x <= 0) return;
    this.x -= this.speed;
    this.element.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + this.width >= gameScreen.offsetWidth) return;
    this.x += this.speed;
    this.element.style.left = `${this.x}px`;
  }

  moveUp() {
    if (this.y <= 0) return;
    this.y -= this.speed;
    this.element.style.top = `${this.y}px`;
  }

  moveDown() {
    if (this.y + this.height >= gameScreen.offsetHeight) return;
    this.y += this.speed;
    this.element.style.top = `${this.y}px`;
  }
  crashesWith(obstacle) {
    const top = this.y;
    const bottom = this.y + this.height;
    const left = this.x;
    const right = this.x + this.width;
    const obsTop = obstacle.y;
    const obsBottom = obstacle.y + obstacle.height;
    const obsLeft = obstacle.x;
    const obsRight = obstacle.x + obstacle.width;
    const out =
      bottom < obsTop || top > obsBottom || left > obsRight || right < obsLeft;
    return !out;
  }
}

class Obstacle {
  constructor(y) {
    this.x = gameScreen.offsetWidth - 100;
    this.y = y;
    this.speed = 6;
    this.width = 50;
    this.height = 50;
    this.color = "red";
    this.element = null;
    this.createElement();
    this.show();
  }

  createElement() {
    const bird = document.createElement("img");
    bird.classList.add("obstacle");
    bird.src = "../gifs/bird.gif";
    bird.style.width = `${this.width}px`;
    bird.style.height = `${this.height}px`;
    bird.style.position = "absolute";
    bird.style.top = `${this.y}px`;
    bird.style.left = `${this.x}px`;
    this.element = bird;
  }
  show() {
    gameScreen.appendChild(this.element);
  }
  hide() {
    gameScreen.removeChild(this.element);
  }
  moveLeft() {
    if (this.x <= 0) return;
    this.x -= this.speed;
    this.element.style.left = `${this.x}px`;
  }
}
