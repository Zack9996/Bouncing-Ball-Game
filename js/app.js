const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.Width;
const ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 80;
let redius = 20;

function drawCircle() {
  // 畫出黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 畫出圓球
  // x,y
  ctx.arc(circle_x, circle_y, redius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
