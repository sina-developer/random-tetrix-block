let cubes;
let col = 50;
let blockWidth = width / col;
let blockHeight = blockWidth;
let row = parseInt(height / blockHeight) + 1;
let shapes = {};
// let blockHeight = height / row;
cubes = [...Array(row)].map((k, i) => {
  return [...Array(col)].map((cell, j) => {
    return;
  });
});
let colors = [
  "#1285E6",
  "#FD3B00",
  "#E58020",
  "#D22E61",
  "#AB45C2",
  "#FFEA02",
  "#17B0D0",
  "#fefefe",
];

const getColor = () => {
  return colors[random(0, colors.length)];
};

function setup() {
  for (let i = 0; i < cubes.length; i++) {
    const row = cubes[i];
    for (let j = 0; j < row.length; j++) {
      let block = new Block(
        j * blockWidth,
        i * blockHeight,
        blockWidth,
        blockHeight,
        getColor(),
        cubes,
        i,
        j
      );
      block.setup();
      row[j] = block;
    }
  }

  fixRelations();
  setupBlockId();
  fetchShapes();
  setShapeColor();
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (const key in shapes) {
    if (Object.hasOwnProperty.call(shapes, key)) {
      const shape = shapes[key];
      checkIntersects(
        shape,
        () => {
          for (let i = 0; i < shape.length; i++) {
            const block = shape[i];
            block.intersected();
          }
        },
        () => {
          for (let i = 0; i < shape.length; i++) {
            const block = shape[i];
            block.resetColor();
          }
        }
      );
      for (let i = 0; i < shape.length; i++) {
        const block = shape[i];
        block.drawShape();
        block.drawSkeleton();
      }
    }
  }
  // drawCircle(mouse_radius, mouseX, mouseY);
}
