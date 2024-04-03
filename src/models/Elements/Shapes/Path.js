import { Point } from "../../../utils/Point";
import { Element } from "../Element";
import icon from "../../../assets/icons/Shapes/circle.svg";
import PathComponent from "../../../components/Shapes/PathComponent/PathComponent";
import { pathParse } from "../../../utils/Transform";
import PolylineComponent from "../../../components/Shapes/PolylineComponent/PolylineComponent";

export class Path extends Element {

  position;
  angle;
  canRotate;
  offset;
  path;
  fill;
  stroke;
  strokeWidth;
  points;
  // approx;
  constructor (name, position, path, stroke, strokeWidth, fill) {
    super(name);
    this.position = position;
    this.path = path;
    this.type = "circle"
    this.canRotate = true;
    this.angle = 0;
    this.offset = new Point(0, 0);
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.icon = icon;
    this.points = [];
    // this.approx = [];
  }
  getObjectProperties() {
    return [
      "name"
    ]
  }
  drawComponent() {
    return (
      // <g key={this.id}>
      <PathComponent
        key={this.id}
        id={this.id}
        point={this.position}
        path={pathParse(this.path)}
        fill={this.fill}
        stroke={this.stroke}
        strokeWidth={this.strokeWidth}
        angle={this.angle}
        offset={this.offset}
        opacity={this.opacity}
      />
      //   <PolylineComponent

      //     points={this.approx}
      //     stroke="red"
      //     strokeWidth={1}
      //     opacity={1}
      //     fill="none"
      //   />
      // </g>

    );
  }
  move(delta) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] = new Point(this.points[i].x + delta.x, this.points[i].y + delta.y);
    }
  }
  static getSpline(points) {
    let string = "";
    for (let i = 0; i < points.length; i++) {
      if (i === 0) {
        string += `M ${points[i].x} ${points[i].y} `;
      }
      if (i === 1) {
        string += `C ${points[i].x} ${points[i].y} `;
      }
      if (i > 3 && i % 2 === 0) {
        string += `S ${points[i].x} ${points[i].y} `;
      }
      if ((i > 1 && i % 2 !== 0) || i === 2) {
        string += `${points[i].x} ${points[i].y} `;
      }
    }
    string = string.trim();
    return string;
  }
  addTerminals() { }
  getFrame() {
    return this.points;
  }
}