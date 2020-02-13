let snake;
let food;
const canvasSize = 600;

function setup() {
  createCanvas(canvasSize, canvasSize);

  snake = new Snake();
  food = new Food();
}

function draw() {
  frameRate(10);
  background(255);

  snake.update();

  snake.draw();

  food.draw();

  if (snake.eat(food)) {
    //increase the length of the snake
    food = new Food();
    snake.addToTail();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.move(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.move(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.move(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.move(1, 0);
  }
}

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = canvasSize / 30;
    this.tail = [];
    this.dx = 0;
    this.dy = 0;
  }

  addToTail() {
    const piece = {
      x: this.x,
      y: this.y
    };
    this.tail.push(piece);
  }

  update() {
    //update tail
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i].x = this.tail[i + 1].x;
      this.tail[i].y = this.tail[i + 1].y;
    }

    if (this.tail.length > 0) {
      this.tail[this.tail.length - 1].x = this.x;
      this.tail[this.tail.length - 1].y = this.y;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x > width - this.size) {
      this.x = width - this.size;
    }

    if (this.y < 0) {
      this.y = 0;
    }

    if (this.y > height - this.size) {
      this.y = height - this.size;
    }
  }

  move(x, y) {
    this.dx = this.size * x;
    this.dy = this.size * y;
  }

  draw() {
    fill(100);
    rect(this.x, this.y, this.size, this.size);
    this.tail.forEach(piece => {
      rect(piece.x, piece.y, this.size, this.size);
    });
  }

  eat(food) {
    const d = dist(this.x, this.y, food.x, food.y);
    return d === 0;
  }
}

class Food {
  constructor() {
    this.size = canvasSize / 30;
    this.x = Math.floor(Math.random() * this.size) * this.size;
    this.y = Math.floor(Math.random() * this.size) * this.size;
    console.log(this.x, this.y);
  }

  draw() {
    fill(200, 0, 0);
    ellipseMode(CORNER);
    circle(this.x, this.y, this.size);
  }
}
