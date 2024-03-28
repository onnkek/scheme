import PolylineComponent from "../../../components/Shapes/PolylineComponent/PolylineComponent";
import { Element } from "../Element";
import icon from "../../../assets/icons/Shapes/polyline.svg";
import { Point } from "../../../utils/Point";

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
    this.icon = icon;
  }
  move(delta) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] = new Point(this.points[i].x + delta.x, this.points[i].y + delta.y);
    }
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
        key={this.id}
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