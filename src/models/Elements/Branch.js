import BranchComponent from "../../components/Equipment/BranchComponent/BranchComponent";
import { Point } from "../Point";
import { Element } from "./Element";
import { Terminal } from "./Terminal";

export class Branch extends Element {

  number1;
  number2;
  points;
  terminal1;
  terminal2;
  emptyTerminal1;
  emptyTerminal2;

  constructor (name, number1, number2, terminal1, terminal2, points) {
    super(name);
    this.number1 = number1;
    this.number2 = number2;
    this.terminal1 = terminal1;
    this.terminal2 = terminal2;
    this.emptyTerminal1 = new Terminal("Пустой терминал " + Math.random(), new Point(0, 0));
    this.emptyTerminal2 = new Terminal("Пустой терминал " + Math.random(), new Point(0, 0));
    this.points = points;
  }

  drawComponent() {
    return (<BranchComponent
      key={this.id}
      name={this.name}
      points={this.getFrame()}
      terminals={this.terminals}
    />);
  }

  getFrame() {
    if (this.terminal1 && this.terminal2) {
      return [this.terminal1.position, ...this.points, this.terminal2.position];
    }
    else if (!this.terminal1) {
      return [this.emptyTerminal1.position, ...this.points, this.terminal2.position];
    } else if (!this.terminal2) {
      return [this.terminal1.position, ...this.points, this.emptyTerminal2.position];
    } else {
      return [this.emptyTerminal1.position, ...this.points, this.emptyTerminal2.position];
    }

  }

  getIndexAddPoint(cursor) {
    let distance = [];
    let points = this.getFrame();
    for (let i = 0; i < points.length - 1; i++) {
      let x1 = points[i].x;
      let y1 = points[i].y;
      let x2 = points[i + 1].x;
      let y2 = points[i + 1].y;

      let len = Math.abs((y2 - y1) * cursor.x - (x2 - x1) * cursor.y + x2 * y1 - y2 * x1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));

      let da = Math.sqrt(Math.pow(x1 - cursor.x, 2) + Math.pow(y1 - cursor.y, 2));
      let db = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      let dc = Math.sqrt(Math.pow(x2 - cursor.x, 2) + Math.pow(y2 - cursor.y, 2));
      let cos = Math.pow(da, 2) + Math.pow(db, 2) - Math.pow(dc, 2);
      if (cos <= 0) {
        len = da;
      }

      cos = Math.pow(dc, 2) + Math.pow(db, 2) - Math.pow(da, 2);
      if (cos <= 0) {
        len = dc;
      }

      distance.push({ d: len, index: i });
    }

    distance = distance.sort((x1, x2) => x1["d"] - x2["d"]);

    return distance[0].index + 1;
  }
}