import CircleComponent from "../../components/Shapes/CircleComponent/CircleComponent";
import LineComponent from "../../components/Shapes/LineComponent/LineComponent";
import { config } from "../../config";
import { Point } from "../../utils/Point";
import { Control } from "./Control";


export class SplineControl extends Control {

  basePoint;
  constructor (position, basePoint) {
    super(position);
    this.basePoint = basePoint;
  }

  drawComponent() {
    return (
      <>
        <CircleComponent
          key={this.id}
          center={this.position}
          radius={config.editor.controls.pointControl.radius}
          fill="red"
          stroke="black"
          strokeWidth={config.editor.controls.pointControl.strokeWidth}
        />
        <LineComponent
          p1={this.basePoint}
          p2={this.position}
          stroke="magenta"
          strokeWidth={1}
          opacity={1}
        />
      </>

    );
  }

  getFrame() {
    const offset = 10;
    return [
      new Point(this.position.x - config.editor.controls.pointControl.radius - offset, this.position.y - config.editor.controls.pointControl.radius - offset),
      new Point(this.position.x + config.editor.controls.pointControl.radius + offset, this.position.y - config.editor.controls.pointControl.radius - offset),
      new Point(this.position.x + config.editor.controls.pointControl.radius + offset, this.position.y + config.editor.controls.pointControl.radius + offset),
      new Point(this.position.x - config.editor.controls.pointControl.radius - offset, this.position.y + config.editor.controls.pointControl.radius + offset)
    ]
  }
}