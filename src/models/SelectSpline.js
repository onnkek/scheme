import SelectLineComponent from "../components/Selections/SelectLineComponent/SelectLineComponent";
import SelectSplineComponent from "../components/Selections/SelectSplineComponent/SelectSplineComponent";
import { PointControl } from "./Controls/PointControl";
import { SplineControl } from "./Controls/SplineControl";
import { SquareControl } from "./Controls/SquareControl";
import { Path } from "./Elements/Shapes/Path";

export class SelectSpline {

  id;
  controls = [];
  frame;
  points;
  width;
  height;
  path;

  constructor (frame, path) {
    this.id = Math.random();
    this.frame = frame;
    this.initSelectLine();
    this.addControls();
    this.path = path;
  }

  initSelectLine() {
    this.points = this.frame;
    this.path = Path.getSpline(this.points);
    // console.log(this.points)
  }
  draw() {
    return (
      <SelectSplineComponent key={this.id} box={this} />
    )
  }
  addControls() {
    for (let i = 0; i < this.points.length; i++) {
      if (i === 0 || (i > 1 && i % 2 !== 0)) {
        this.controls.push(new SquareControl(this.points[i]));
      }
      if (i === 1) {
        this.controls.push(new SplineControl(this.points[i], this.points[i - 1]));
      }
      if (i > 1 && i % 2 === 0) {
        this.controls.push(new SplineControl(this.points[i], this.points[i + 1]));
      }
    }
  }

  updateControls() {
    this.controls[0].position = this.points[0];
    for (let i = 1; i < this.points.length - 1; i++) {
      if (this.controls[i] instanceof SplineControl) {
        if (i === 1) {
          this.controls[i].position = this.points[i];
          this.controls[i].basePoint = this.points[i - 1];
        }
        if (i > 1 && i % 2 === 0) {
          this.controls[i].position = this.points[i];
          this.controls[i].basePoint = this.points[i + 1];
        }
      } else {
        this.controls[i].position = this.points[i];
      }

    }
    this.controls[this.points.length - 1].position = this.points[this.points.length - 1];
  }

}