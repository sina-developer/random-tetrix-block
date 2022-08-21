class Block {
  constructor(x, y, w, h, color, cubes, i, j) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "#131313";
    this.real_color = color;
    this.cubes = cubes;
    this.i = i;
    this.j = j;
    this.id = null;
    this.dirs = {
      left: {
        x: -1,
      },
      right: {
        x: 1,
      },
      top: {
        y: -1,
      },
      bottom: {
        y: 1,
      },
    };
    this.thicness = this.w / 5;
    this.n_top = null;
    this.n_left = null;
    this.n_right = null;
    this.n_bottom = null;
    this.shapeH = this.thicness * 2;
  }

  setup() {
    let keys = ["left", "right", "top", "bottom"];
    let new_dirs = {};
    while (Object.keys(new_dirs).length < 2) {
      // try {
      //   let top = this.cubes[this.i - 1][this.j];
      //   let keys = Object.keys(top.dirs);
      //   if (keys.includes("bottom")) {
      //     new_dirs["top"] = this.dirs["top"];
      //     this.last_top = top;
      //     this.color = top.color;
      //     continue;
      //   }
      // } catch (error) {}
      // try {
      //   let left = this.cubes[this.i][this.j - 1];
      //   let keys = Object.keys(left.dirs);
      //   if (keys.includes("bottom")) {
      //     new_dirs["left"] = this.dirs["left"];
      //     this.last_left = left;
      //     this.color = left.color;
      //     continue;
      //   }
      // } catch (error) {}
      let key = keys[random(0, 4)];
      new_dirs[key] = this.dirs[key];
    }
    this.dirs = new_dirs;
  }


  intersected() {
    this.color = this.real_color;
  }
  resetColor() {
    this.color = "#131313";
  }

  getLastBlockColor() {
    try {
      let top = this.cubes[this.i - 1][this.j];
      let keys = Object.keys(top.dirs);
      if (keys.includes("bottom") && this.dirs.top != undefined) {
        this.color = top.color;
      }
    } catch (error) {}
    try {
      let left = this.cubes[this.i][this.j - 1];
      let keys = Object.keys(left.dirs);
      if (keys.includes("right") && this.dirs.left != undefined) {
        this.color = left.color;
      }
    } catch (error) {}
  }

  drawSkeleton() {
    for (const key in this.dirs) {
      if (Object.hasOwnProperty.call(this.dirs, key)) {
        const dir = this.dirs[key];
        let h = this.h / 4;
        let w = this.w / 4;
        if (dir.x != undefined) {
          drawRect(
            this.x +
              this.w / 2 -
              (dir.x == -1 ? this.w / 2 : 0) -
              (dir.x == 1 ? this.thicness / 2 : 0) +
              dir.x,
            this.y + this.h / 2 - this.thicness / 2,
            // this.w / 2 + w / 2,
            this.w / 2 + this.thicness / 2,
            this.thicness,
            "black"
          );
        } else if (dir.y != undefined) {
          drawRect(
            this.x + this.w / 2 - this.thicness / 2,
            this.y +
              this.h / 2 -
              (dir.y == -1 ? this.h / 2 : 0) -
              (dir.y == 1 ? this.thicness / 2 : 0) +
              dir.y,
            this.thicness,
            this.h / 2 + this.thicness / 2,
            "black"
          );
        }
      }
    }

    this.fixEdges();
  }

  fixEdges() {
    try {
      let right = this.cubes[this.i][this.j + 1];
      let keys = Object.keys(right.dirs);
      if (!keys.includes("left") && this.dirs.right != undefined) {
        drawRect(
          this.x + this.w - this.thicness / 2 + 1,
          this.y + this.shapeH - 1,
          this.thicness / 2,
          this.shapeH / 1.5,
          this.color
        );
      }
    } catch (error) {}
    try {
      let left = this.cubes[this.i][this.j - 1];
      let keys = Object.keys(left.dirs);
      if (!keys.includes("right") && this.dirs.left != undefined) {
        drawRect(
          this.x - 1,
          this.y + this.shapeH - 1,
          this.thicness / 2,
          this.shapeH / 1.5,
          this.color
        );
      }
    } catch (error) {}
    try {
      let top = this.cubes[this.i - 1][this.j];
      let keys = Object.keys(top.dirs);
      if (!keys.includes("bottom") && this.dirs.top != undefined) {
        drawRect(
          this.x + this.shapeH - 1,
          this.y - 1,
          this.shapeH / 1.5,
          this.thicness / 2,
          this.color
        );
      }
    } catch (error) {}
    try {
      let bottom = this.cubes[this.i + 1][this.j];
      let keys = Object.keys(bottom.dirs);
      if (!keys.includes("top") && this.dirs.bottom != undefined) {
        drawRect(
          this.x + this.shapeH - 1,
          this.y + this.h - this.thicness / 2 + 1,
          this.shapeH / 1.5,
          this.thicness / 2,
          this.color
        );
      }
    } catch (error) {}
  }

  drawShape() {
    this.getLastBlockColor();
    // drawRect(
    //   this.x + padding,
    //   this.y + padding,
    //   this.w - padding * 2,
    //   this.h - padding * 2,
    //   "#eeeeee55"
    // );

    drawRect(
      this.x + this.w / 2 - this.shapeH / 2,
      this.y + this.h / 2 - this.shapeH / 2,
      this.shapeH,
      this.shapeH,
      this.color
    );
    if (this.dirs.left != undefined) {
      drawRect(
        this.x - 1,
        this.y + this.h / 2 - this.shapeH / 2,
        this.w / 2,
        this.shapeH,
        this.color
      );
    }
    if (this.dirs.right != undefined) {
      drawRect(
        this.x + this.w / 2,
        this.y + this.h / 2 - this.shapeH / 2,
        this.w / 2 + 1,
        this.shapeH,
        this.color
      );
    }

    if (this.dirs.top != undefined) {
      drawRect(
        this.x + this.w / 2 - this.shapeH / 2,
        this.y - 1,
        this.shapeH,
        this.h / 2,
        this.color
      );
    }
    if (this.dirs.bottom != undefined) {
      drawRect(
        this.x + this.w / 2 - this.shapeH / 2,
        this.y + this.h / 2,
        this.shapeH,
        this.h / 2 + 1,
        this.color
      );
    }
  }
}
