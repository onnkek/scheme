import { Point } from "../../tools/Point";
import { Element } from "./Element";

export class Terminal extends Element {

  position;
  canConnect;

  constructor (name, position) {
    super(name);
    this.position = position;
    this.canConnect = true;
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