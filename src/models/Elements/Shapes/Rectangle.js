import RectangleComponent from "../../../components/Shapes/RectangleComponent/RectangleComponent";
import { Point } from "../../../utils/Point";
import { Element } from "../Element";

export class Rectangle extends Element {

  position;
  angle;
  canRotate;
  width;
  height;
  fill;
  stroke;
  strokeWidth;
  constructor (name, position, width, height, stroke, strokeWidth, fill) {
    super(name);
    this.position = position;
    this.type = "circle"
    this.canRotate = false;
    this.angle = 0;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
  }
  getObjectProperties() {
    return [
      "name"
    ]
  }
  drawComponent() {
    return (
      <RectangleComponent
        x={this.position.x - this.width / 2}
        y={this.position.y - this.height / 2}
        width={this.width}
        height={this.height}
        stroke={this.stroke}
        strokeWidth={this.strokeWidth}
        fill={this.fill}
        opacity={this.opacity}
      />
    );
  }
  addTerminals() { }
  getFrame() {
    return [
      new Point(this.position.x - this.width / 2, this.position.y - this.height / 2),
      new Point(this.position.x + this.width / 2, this.position.y - this.height / 2),
      new Point(this.position.x + this.width / 2, this.position.y + this.height / 2),
      new Point(this.position.x - this.width / 2, this.position.y + this.height / 2)
    ]
  }
}