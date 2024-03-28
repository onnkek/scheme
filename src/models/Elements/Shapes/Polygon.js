import PolygonComponent from "../../../components/Shapes/PolygonComponent/PolygonComponent";
import { Element } from "../Element";
import icon from "../../../assets/icons/Shapes/polygon.svg";
import { Point } from "../../../utils/Point";

export class Polygon extends Element {

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
  addTerminals() { }
  getObjectProperties() {
    return [
      "name"
    ]
  }
  move(delta) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] = new Point(this.points[i].x + delta.x, this.points[i].y + delta.y);
    }
  }
  drawComponent() {
    return (
      <PolygonComponent
        key={this.id}
        points={this.points}
        stroke={this.stroke}
        strokeWidth={this.strokeWidth}
        opacity={this.opacity}
        fill={this.fill}
        strokeDasharray="none"
      />
    );
  }
  getFrame() {
    return this.points;
  }
}