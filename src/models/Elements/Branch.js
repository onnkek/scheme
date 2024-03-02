import BranchComponent from "../../components/Equipment/BranchComponent/BranchComponent";
import { Point } from "../Point";
import { Element } from "./Element";

export class Branch extends Element {

  number1;
  number2;
  points;

  constructor (name, number1, number2, points) {
    super(name);
    this.number1 = number1;
    this.number2 = number2;
    this.points = points;
  }

  drawComponent() {
    return (<BranchComponent key={this.id} name={this.name} points={this.points} />);
  }

  getFrame() {
    return this.points;
    // [
    //   new Point(this.points[0].x, this.points[0].y),
    //   new Point(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y)
    // ]
  }
}