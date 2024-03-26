import CircleComponent from "../../../components/Shapes/CircleComponent/CircleComponent";
import { Point } from "../../../utils/Point";
import { Element } from "../Element";

export class Circle extends Element {

  position;
  angle;
  canRotate;
  radius;
  fill;
  stroke;
  strokeWidth;
  constructor (name, position, radius, stroke, strokeWidth, fill) {
    super(name);
    this.position = position;
    this.type = "circle"
    this.canRotate = true;
    this.angle = 0;
    this.radius = radius;
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
      <CircleComponent
        center={this.position}
        radius={this.radius}
        fill={this.fill}
        stroke={this.stroke}
        strokeWidth={this.strokeWidth}
        opacity={this.opacity}
      />
    );
  }
  addTerminals() { }
  getFrame() {
    return [
      new Point(this.position.x - this.radius, this.position.y - this.radius),
      new Point(this.position.x + this.radius, this.position.y - this.radius),
      new Point(this.position.x + this.radius, this.position.y + this.radius),
      new Point(this.position.x - this.radius, this.position.y + this.radius)
    ]
  }
}