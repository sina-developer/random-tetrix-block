let canvas = document.getElementById("loading");
let ctx = canvas.getContext("2d");
let mouseX = 0;
let mouseY = 0;
let mouse_radius = 25;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  var ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}

function getSize(size) {
  var dpr = window.devicePixelRatio || 1;
  return size / dpr;
}

function trueSize(size) {
  var dpr = window.devicePixelRatio || 1;
  return size * dpr;
}

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  height = canvas.height;
  width = canvas.width;
}

ctx = setupCanvas(canvas);

var height = getSize(canvas.height);
var width = getSize(canvas.width);
setCanvasSize();
