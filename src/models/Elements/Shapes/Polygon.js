import PolygonComponent from "../../../components/Shapes/PolygonComponent/PolygonComponent";
import { Element } from "../Element";
import icon from "../../../assets/icons/Shapes/polygon.svg";

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
  drawComponent() {
    return (
      <PolygonComponent
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