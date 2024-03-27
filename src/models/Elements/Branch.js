import BranchComponent from "../../components/Equipment/BranchComponent/BranchComponent";
import { config } from "../../config";
import { Point } from "../../utils/Point";
import { Element } from "./Element";
import { Terminal } from "./Terminal";
import icon from "../../assets/icons/branch.svg";

export class Branch extends Element {

  number1;
  number2;
  points;
  junctions;
  voltage;
  canDraw;

  constructor (name, points, voltage) {
    super(name);
    this.type = "branch"
    this.points = points;
    this.voltage = voltage;
    this.canDraw = true;
    this.junctions = [new Terminal("Пустой терминал " + Math.random(), new Point(0, 0)),
    new Terminal("Пустой терминал " + Math.random(), new Point(0, 0))];
    this.icon = icon;
  }
  addTerminals() { }
  drawComponent() {
    return (
      this.canDraw ? <BranchComponent
        key={this.id}
        name={this.name}
        points={this.getFrame()}
        terminals={this.terminals}
        voltageColor={this.getVoltageColor()}
        opacity={this.opacity}
      /> : "");
  }
  getVoltageColor() {
    switch (this.voltage) {
      case 500:
        return config.colors.voltageLevel[500];
      case 220:
        return config.colors.voltageLevel[220];
      case 110:
        return config.colors.voltageLevel[110];
      default:
        return config.colors.voltageLevel.default
    }
  }
  getFrame() {
    if (this.terminals[0] && this.terminals[1]) {
      return [this.terminals[0].position, ...this.points, this.terminals[1].position];
    }
    else if (!this.terminals[0] && this.terminals[1]) {
      return [this.junctions[0].position, ...this.points, this.terminals[1].position];
    } else if (!this.terminals[1] && this.terminals[0]) {
      return [this.terminals[0].position, ...this.points, this.junctions[1].position];
    } else {
      return [this.junctions[0].position, ...this.points, this.junctions[1].position];
    }

  }


  move(delta) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] = new Point(this.points[i].x + delta.x, this.points[i].y + delta.y);
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

  addPoint(cursor) {
    let cursorGrid = new Point(Math.round(cursor.x / 10) * 10, Math.round(cursor.y / 10) * 10);
    let indexOfPoint = this.getIndexAddPoint(cursorGrid);
    if (indexOfPoint === 1) {
      this.points = [cursorGrid, ...this.points.slice(indexOfPoint - 1)]
    } else if (indexOfPoint === this.getFrame().length - 1) {
      this.points = [...this.points.slice(0, indexOfPoint - 1), cursorGrid]
    } else {
      this.points = [...this.points.slice(0, indexOfPoint - 1),
        cursorGrid, ...this.points.slice(indexOfPoint - 1)]
    }
  }
}