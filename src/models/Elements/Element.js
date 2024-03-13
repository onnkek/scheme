import { Point } from "../../utils/Point";
import { getRotateTransformPoint } from "../../utils/Transform";

export class Element {
  type;
  id;
  name;
  terminals;
  canResize;


  constructor (name) {
    this.type = "";
    this.name = name;
    this.id = Math.random();
    this.terminals = [];
    this.canResize = false;
  }

  drawComponent() { }

  getFrame() { }

  setTerminalsPosition() {
    for (let i = 0; i < this.terminals.length; i++) {
      if (Math.abs(this.angle) !== Math.abs(this.terminals[i].angle)) {

        this.terminals[i].position = getRotateTransformPoint(this.terminals[i].position,
          this.angle - this.terminals[i].angle, this.position);
        this.terminals[i].angle = this.angle;
      }
    }
  }

  move(delta) {
    this.position = new Point(this.position.x + delta.x, this.position.y + delta.y);

    for (let i = 0; i < this.terminals.length; i++) {
      this.terminals[i].position = new Point(this.terminals[i].position.x + delta.x, this.terminals[i].position.y + delta.y);
    }
  }
  rotate(cursor) {
    let angle = Math.atan2(cursor.y - this.position.y, cursor.x - this.position.x);
    this.angle = Math.round((angle * 180 / Math.PI + 90) / 90) * 90;
    this.setTerminalsPosition();
  }
}