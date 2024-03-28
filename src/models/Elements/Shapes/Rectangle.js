import RectangleComponent from "../../../components/Shapes/RectangleComponent/RectangleComponent";
import { Point } from "../../../utils/Point";
import { Element } from "../Element";
import icon from "../../../assets/icons/Shapes/rectangle.svg";

export class Rectangle extends Element {

  position;
  startPosition;
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
    this.startPosition = new Point(position.x, position.y);
    this.type = "rectangle"
    this.canRotate = false;
    this.angle = 0;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.icon = icon;
  }
  getObjectProperties() {
    return [
      "name"
    ]
  }
  drawComponent() {
    return (
      <RectangleComponent
        x={this.position.x}
        y={this.position.y}
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
    console.log([
      new Point(this.position.x, this.position.y),
      new Point(this.position.x + this.width, this.position.y),
      new Point(this.position.x + this.width, this.position.y + this.height),
      new Point(this.position.x, this.position.y + this.height)
    ])
    return [
      new Point(this.position.x, this.position.y),
      new Point(this.position.x + this.width, this.position.y),
      new Point(this.position.x + this.width, this.position.y + this.height),
      new Point(this.position.x, this.position.y + this.height)
    ]
  }
}