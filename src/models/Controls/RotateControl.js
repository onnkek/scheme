import { config } from "../../config";
import { Point } from "../../utils/Point";
import { Control } from "./Control";
import { getRotateTransformPoint, getRotateTransformPoints, pathParse } from "../../utils/Transform";
import Path from "../../components/Shapes/Path/Path";
import Line from "../../components/Shapes/Line/Line";

export class RotateControl extends Control {

  heightFrame;

  constructor(position, heightFrame, angle) {
    super(position);
    this.heightFrame = heightFrame;
    this.angle = angle;
  }



  drawComponent() {
    const linePoint1 = getRotateTransformPoint(new Point(this.position.x, this.position.y - this.heightFrame / 2 - config.editor.controls.rotateControl.offset), this.angle, this.position);
    const linePoint2 = getRotateTransformPoint(new Point(this.position.x, this.position.y - this.heightFrame / 2), this.angle, this.position);
    return (
      <g key={this.id}>
        <Path
          point={this.position}
          path={pathParse(config.editor.controls.rotateControl.path)}
          stroke="#919191"
          fill="white"
          strokeWidth={1}
          angle={this.angle}
          offset={new Point(this.position.x, this.position.y - this.heightFrame / 2 - config.editor.controls.rotateControl.offset - 8)}
        />
        <Line
          p1={linePoint1}
          p2={linePoint2}
          stroke="magenta"
          strokeWidth={1}
        />
      </g>
    );
  }

  getFrame() {
    const points = [
      new Point(this.position.x - 10, this.position.y - this.heightFrame / 2 - config.editor.controls.rotateControl.offset - 8 - 10),
      new Point(this.position.x + 10, this.position.y - this.heightFrame / 2 - config.editor.controls.rotateControl.offset - 8 - 10),
      new Point(this.position.x + 10, this.position.y - this.heightFrame / 2 - config.editor.controls.rotateControl.offset - 8 + 10),
      new Point(this.position.x - 10, this.position.y - this.heightFrame / 2 - config.editor.controls.rotateControl.offset - 8 + 10)
    ]
    const rotatePoints = getRotateTransformPoints(points, this.angle, this.position)
    return rotatePoints
  }
}