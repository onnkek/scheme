import Line from "../components/Shapes/LineComponent/LineComponent";

export class Grid {
  stepX;
  stepY;
  backgroundColor;
  strokeWidth;
  editorWidth;
  editorHeight;

  constructor (width, height) {
    this.stepX = 10;
    this.stepY = 10;
    this.backgroundColor = "rgba(255,255,255,0.3)";
    this.strokeWidth = 0.7;
    this.editorWidth = width;
    this.editorHeight = height;
  }

  draw() {
    let grid = [];
    for (let i = 1; i < this.editorWidth / this.stepX + 1; i++) {
      grid.push(<Line
        key={Math.random()}
        p1={{ x: i * this.stepX, y: 0 }}
        p2={{ x: i * this.stepX, y: this.editorHeight }}
        stroke={this.backgroundColor}
        strokeWidth={this.strokeWidth}
        opacity={1}
      />);
    }
    for (let i = 1; i < this.editorHeight / this.stepY + 1; i++) {
      grid.push(<Line
        key={Math.random()}
        p1={{ x: 0, y: i * this.stepY }}
        p2={{ x: this.editorWidth, y: i * this.stepY }}
        stroke={this.backgroundColor}
        strokeWidth={this.strokeWidth}
        opacity={1}
      />);
    }
    return grid;
  }
}