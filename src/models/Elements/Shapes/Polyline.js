import PolylineComponent from "../../../components/Shapes/PolylineComponent/PolylineComponent";
import { Element } from "../Element";

export class Polyline extends Element {

  angle;
  canRotate;
  fill;
  stroke;
  strokeWidth;
  points;
  constructor (name, stroke, strokeWidth, fill) {
    super(name);
    this.type = "polyline"
    this.canRotate = false;
    this.angle = 0;
    this.points = [];
    this.fill = fill;
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
      <PolylineComponent
        points={this.points}
        stroke={this.stroke}
        strokeWidth={this.strokeWidth}
        opacity={this.opacity}
        fill={this.fill}
      />
    );
  }
  getFrame() {
    return this.points;
  }
}