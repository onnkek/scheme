import BranchComponent from "../../components/Equipment/BranchComponent/BranchComponent";
import { Element } from "./Element";

export class Branch extends Element {

  number1;
  number2;
  points;
  terminal1;
  terminal2;

  constructor(name, number1, number2, points) {
    super(name);
    this.number1 = number1;
    this.number2 = number2;
    this.points = points;
  }

  drawComponent() {
    return (<BranchComponent
      key={this.id}
      name={this.name}
      points={this.points}
      terminals={this.terminals}
    />);
  }

  getFrame() {
    return this.points;
  }

  getIndexAddPoint(cursor) {
    let distance = [];
    for (let i = 0; i < this.points.length - 1; i++) {
      let x1 = this.points[i].x;
      let y1 = this.points[i].y;
      let x2 = this.points[i + 1].x;
      let y2 = this.points[i + 1].y;

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