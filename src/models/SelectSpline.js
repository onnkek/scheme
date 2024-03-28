import SelectLineComponent from "../components/Selections/SelectLineComponent/SelectLineComponent";
import { PointControl } from "./Controls/PointControl";
import { SquareControl } from "./Controls/SquareControl";

export class SelectSpline {

  id;
  controls = [];
  frame;
  points;
  width;
  height;

  constructor (frame) {
    this.id = Math.random();
    this.frame = frame;
    this.initSelectLine();
    this.addControls();
  }

  initSelectLine() {
    this.points = this.frame;
    // console.log(this.points)
  }
  draw() {
    return (
      <SelectLineComponent key={this.id} box={this} />
    )
  }
  addControls() {
    for (let i = 0; i < this.points.length; i++) {
      if (i === 0 || i % 2 === 0) {
        this.controls.push(new SquareControl(this.points[i]));
      } else {
        this.controls.push(new PointControl(this.points[i]));
      }
    }
  }

  updateControls() {
    this.controls[0].position = this.points[0];
    for (let i = 1; i < this.points.length - 1; i++) {
      this.controls[i].position = this.points[i];
    }
    this.controls[this.points.length - 1].position = this.points[this.points.length - 1];
  }

}