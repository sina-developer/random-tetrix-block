function drawRect(x, y, w, h, color = "red") {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(r, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#fff";
  ctx.stroke();
}

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function fixRelations() {
  for (let i = cubes.length - 1; i >= 0; i--) {
    const row = cubes[i];
    for (let j = row.length - 1; j >= 0; j--) {
      let block = row[j];
      try {
        let top = cubes[i - 1][j];
        let keys = Object.keys(top.dirs);
        if (keys.includes("bottom") && block.dirs.top != undefined) {
          block.n_top = top;
        }
      } catch (error) {}
      try {
        let bottom = cubes[i + 1][j];
        let keys = Object.keys(bottom.dirs);
        if (keys.includes("top") && block.dirs.bottom != undefined) {
          block.n_bottom = bottom;
        }
      } catch (error) {}
      try {
        let left = cubes[i][j - 1];
        let keys = Object.keys(left.dirs);
        if (keys.includes("right") && block.dirs.left != undefined) {
          block.n_left = left;
        }
      } catch (error) {}
      try {
        let right = cubes[i][j + 1];
        let keys = Object.keys(right.dirs);
        if (keys.includes("left") && block.dirs.right != undefined) {
          block.n_right = right;
        }
      } catch (error) {}
    }
  }
}

function setupBlockId() {
  for (let i = cubes.length - 1; i >= 0; i--) {
    const row = cubes[i];
    for (let j = row.length - 1; j >= 0; j--) {
      let block = row[j];
      if (block.id) continue;
      let id = "id_" + random(0, 99999999);
      block.id = id;
      recursiveBlockIdSetter(block, id);
    }
  }
}

function fetchShapes() {
  shapes = {};
  for (let i = cubes.length - 1; i >= 0; i--) {
    const row = cubes[i];
    for (let j = row.length - 1; j >= 0; j--) {
      let block = row[j];
      if (!shapes[block.id]) {
        shapes[block.id] = [];
      }
      shapes[block.id].push(block);
    }
  }
}

function recursiveBlockIdSetter(block, id) {
  let n_block = [
    block.n_left,
    block.n_top,
    block.n_right,
    block.n_bottom,
  ].filter((k) => k != null);

  for (let i = 0; i < n_block.length; i++) {
    const _block = n_block[i];
    if (_block.id) continue;
    _block.id = id;
    recursiveBlockIdSetter(_block, id);
  }
}

function setShapeColor() {
  for (const key in shapes) {
    if (Object.hasOwnProperty.call(shapes, key)) {
      const shape = shapes[key];
      let color = getColor();
      for (let i = 0; i < shape.length; i++) {
        const block = shape[i];
        block.real_color = color;
      }
    }
  }
}

const hasIntersection = (x, y, width, height) => {
  let cx = mouseX;
  let cy = mouseY;
  let cr = mouse_radius;
  const distX = Math.abs(cx - x - width / 2);
  const distY = Math.abs(cy - y - height / 2);

  if (distX > width / 2 + cr) {
    return false;
  }
  if (distY > height / 2 + cr) {
    return false;
  }

  if (distX <= width / 2) {
    return true;
  }
  if (distY <= height / 2) {
    return true;
  }

  const Δx = distX - width / 2;
  const Δy = distY - height / 2;
  return Δx * Δx + Δy * Δy <= cr * cr;
};

function checkIntersects(
  shape,
  onIntersects = () => {},
  onNotIntersects = () => {}
) {
  let count = 0;
  for (let i = 0; i < shape.length; i++) {
    const block = shape[i];
    if (hasIntersection(block.x, block.y, block.w, block.h)) {
      count++;
    }
    // if (
    //   mouseX > block.x &&
    //   mouseX < block.x + block.w &&
    //   mouseY > block.y &&
    //   mouseY < block.y + block.h
    // ) {
    //   count++;
    // }
  }

  if (count) {
    onIntersects();
  } else {
    onNotIntersects();
  }
}
