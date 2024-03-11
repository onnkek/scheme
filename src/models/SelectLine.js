import { PointControl } from "./Controls/PointControl";
import { SquareControl } from "./Controls/SquareControl";

export class SelectLine {
	controls = [];
	frame;
	points;
	width;
	height;

	constructor(frame) {
		this.frame = frame;
		this.initSelectLine();
		this.addControls();
	}

	initSelectLine() {
		this.points = this.frame;
		// console.log(this.points)
	}

	addControls() {
		this.controls.push(new PointControl(this.points[0]));
		for (let i = 1; i < this.points.length - 1; i++) {
			this.controls.push(new SquareControl(this.points[i]));
		}
		this.controls.push(new PointControl(this.points[this.points.length - 1]));
	}

	updateControls() {
		this.controls[0].position = this.points[0];
		for (let i = 1; i < this.points.length - 1; i++) {
			this.controls[i].position = this.points[i];
		}
		this.controls[this.points.length - 1].position = this.points[this.points.length - 1];
	}

}