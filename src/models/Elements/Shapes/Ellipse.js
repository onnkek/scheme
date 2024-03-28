import { Point } from "../../../utils/Point";
import { Element } from "../Element";
import icon from "../../../assets/icons/Shapes/circle.svg";
import EllipseComponent from "../../../components/Shapes/EllipseComponent/EllipseComponent";

export class Ellipse extends Element {

  position;
  startPosition;
  angle;
  canRotate;
  radius;
  fill;
  stroke;
  strokeWidth;
  constructor (name, position, radius, stroke, strokeWidth, fill) {
    super(name);
    this.position = position;
    this.startPosition = new Point(position.x, position.y);
    this.type = "circle"
    this.canRotate = true;
    this.angle = 0;
    this.radius = radius;
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
      <EllipseComponent
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
      new Point(this.position.x - this.radius.x / 2, this.position.y - this.radius.y / 2),
      new Point(this.position.x + this.radius.x + this.radius.x / 2, this.position.y - this.radius.y / 2),
      new Point(this.position.x + this.radius.x + this.radius.x / 2, this.position.y + this.radius.y + this.radius.y / 2),
      new Point(this.position.x - this.radius.x / 2, this.position.y + this.radius.y + this.radius.y / 2)
    ]
  }
}