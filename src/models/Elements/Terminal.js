import { Point } from "../../utils/Point";
import { Element } from "./Element";

export class Terminal extends Element {

  position;
  canConnect;
  angle;
  point;

  constructor(name, position, angle) {
    super(name);
    this.type = "terminal"
    this.position = position;
    this.canConnect = true;
    this.angle = angle;
  }
  drawComponent() { }

  getFrame() {
    return [
      new Point(this.position.x - 10, this.position.y - 10),
      new Point(this.position.x + 10, this.position.y - 10),
      new Point(this.position.x + 10, this.position.y + 10),
      new Point(this.position.x - 10, this.position.y + 10)
    ]
  }

}