import LineComponent from "../../../components/Shapes/LineComponent/LineComponent";
import { Element } from "../Element";

export class Line extends Element {

  angle;
  canRotate;
  stroke;
  strokeWidth;
  points;
  constructor (name, stroke, strokeWidth) {
    super(name);
    this.type = "polyline"
    this.canRotate = false;
    this.angle = 0;
    this.points = [];
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
  }
  addTerminals() { }
  getObjectProperties() {
    return [
      "name"
    ]
  }
  drawComponent() {
    return (
      <LineComponent
        p1={this.points[0]}
        p2={this.points[1]}
        stroke={this.stroke}
        strokeWidth={this.strokeWidth}
        opacity={this.opacity}
        strokeDasharray="none"
      />
    );
  }
  getFrame() {
    return this.points;
  }
}