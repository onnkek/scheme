import { Point } from "../Point";
import { Element } from "./Element";

export class TerminalNode extends Element {

  position;
  canConnect;
  widthLeft;
  widthRight;

  constructor(name, position, widthLeft, widthRight) {
    super(name);
    this.position = position;
    this.widthLeft = widthLeft;
    this.widthRight = widthRight;
    this.canConnect = false;
  }
  drawComponent() { }

  getFrame() {
    return [
      new Point(this.position.x - this.widthLeft, this.position.y - 20),
      new Point(this.position.x + this.widthRight, this.position.y - 20),
      new Point(this.position.x + this.widthRight, this.position.y + 20),
      new Point(this.position.x - this.widthLeft, this.position.y + 20)
    ]
  }

}