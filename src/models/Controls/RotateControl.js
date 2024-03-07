import { config } from "../../config";
import Circle from "../../components/Shapes/Circle/Circle";
import { Point } from "../../utils/Point";
import { Control } from "./Control";
import { getRotateTransformPoint, getRotateTransformPoints } from "../../utils/Transform";


export class RotateControl extends Control {

  constructor(position, angle) {
    super(position);
    this.angle = angle;
  }

  drawComponent() {
    return (
      <Circle
        key={this.id}
        center={getRotateTransformPoint(new Point(this.position.x, this.position.y - 60 - 5), this.angle, this.position)}
        radius={5}
        fill="magenta"
        stroke="magenta"
        strokeWidth={1}
      />
    );
  }

  getFrame() {
    return [
      new Point(getRotateTransformPoint(new Point(this.position.x, this.position.y - 60 - 5), this.angle, this.position).x - 5, getRotateTransformPoint(new Point(this.position.x, this.position.y - 60 - 5), this.angle, this.position).y - 5),
      new Point(getRotateTransformPoint(new Point(this.position.x, this.position.y - 60 - 5), this.angle, this.position).x + 5, getRotateTransformPoint(new Point(this.position.x, this.position.y - 60 - 5), this.angle, this.position).y - 5),
      new Point(getRotateTransformPoint(new Point(this.position.x, this.position.y - 60 - 5), this.angle, this.position).x + 5, getRotateTransformPoint(new Point(this.position.x, this.position.y - 60 - 5), this.angle, this.position).y + 5),
      new Point(getRotateTransformPoint(new Point(this.position.x, this.position.y - 60 - 5), this.angle, this.position).x - 5, getRotateTransformPoint(new Point(this.position.x, this.position.y - 60 - 5), this.angle, this.position).y + 5)
    ]
  }
}