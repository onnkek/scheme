import { Point } from "../../../utils/Point";
import { Element } from "../Element";
import icon from "../../../assets/icons/Shapes/circle.svg";
import PathComponent from "../../../components/Shapes/PathComponent/PathComponent";
import { pathParse } from "../../../utils/Transform";

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
  }
  getObjectProperties() {
    return [
      "name"
    ]
  }
  drawComponent() {
    return (
      <PathComponent
        point={this.position}
        path={pathParse(this.path)}
        fill={this.fill}
        stroke={this.stroke}
        strokeWidth={this.strokeWidth}
        angle={this.angle}
        offset={this.offset}
        opacity={this.opacity}
      />
    );
  }
  getSpline() {
    console.log(this.points)
    let string = "M ";
    for (let i = 0; i < this.points.length; i++) {
      if (i === 0 || i % 2 === 0) {
        string += `${this.points[i].x} ${this.points[i].y} `;
      } else {
        string += `Q ${this.points[i].x} ${this.points[i].y} `;
      }
    }
    string = string.trim();
    console.log(string)
    console.log(pathParse(string))
    this.path = string;
  }
  addTerminals() { }
  getFrame() {
    return this.points;
  }
}