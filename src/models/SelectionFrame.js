import { Point } from "../utils/Point";

export class SelectionFrame {

  static Modes = {
    Contain: "Contain",
    Intersect: "Intersect"
  }
  mode;
  startPoint;
  position;
  cursor;
  width;
  height;

  constructor (startPoint, cursor) {
    this.startPoint = startPoint;
    this.position = new Point(startPoint.x, startPoint.y);
    this.cursor = cursor;
    this.width = Math.abs(startPoint.x - cursor.x);
    this.height = Math.abs(startPoint.y - cursor.y);
  }

  initSelectBox() {
  }

  addControls() {
  }
}