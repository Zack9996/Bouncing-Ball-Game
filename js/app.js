const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 80;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 100;
let ground_y = 500;
let ground_height = 5;
let ground_width = 200;
let birckArray = [];

c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});

function getRandomArbitrary(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 20;
    birckArray.push(this);
  }

  drawBirck() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchingBall(circleX, circleY) {
    return (
      circleX >= this.x - radius &&
      circleX <= this.x + this.width + radius &&
      circleY >= this.y - radius &&
      circleY <= this.y + this.height + radius
    );
  }
}

for (let i = 0; i < 10; i++) {
  new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}

function drawCircle() {
  // 確認求是否有打到磚塊
  birckArray.forEach((birck, index) => {
    if (birck.touchingBall(circle_x, circle_y)) {
      // 改變，y方向速度，並且將brick從brickArray中移除
      if (circle_x >= birck.x + birck.width || circle_x <= birck.x - radius) {
        xSpeed *= -1;
      } else if (
        circle_y >= birck.y - radius ||
        circle_y <= birck.y + birck.height
      ) {
        ySpeed *= -1;
      }
      birckArray.splice(index, 1);
      if (birckArray == 0) {
        alert("遊戲結束");
        clearInterval(game);
      }
    }
  });

  // 確認求是否打到地板
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + ground_width + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + ground_height + radius
  ) {
    if (circle_y >= ground_y) {
      circle_y += 40;
    } else if (circle_y <= ground_y) {
      circle_y -= 40;
    }
    ySpeed *= -1;
  }

  // 建立園的右邊屏障
  if (circle_x >= canvasWidth - radius) {
    xSpeed *= -1;
  }
  // 建立園的左邊屏障
  if (circle_x <= radius) {
    xSpeed *= -1;
  }
  // 建立園的下邊屏障
  if (circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }
  // 建立園的上邊屏障
  if (circle_y <= radius) {
    ySpeed *= -1;
  }

  // 更動圓的座標
  circle_x += xSpeed;
  circle_y += ySpeed;

  // 畫出黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 畫出所有的birck
  birckArray.forEach((birck) => {
    birck.drawBirck();
  });

  // 畫出可以控制的地板
  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, ground_width, ground_height);

  // 畫出圓球
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
