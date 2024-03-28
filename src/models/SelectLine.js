import SelectLineComponent from "../components/Selections/SelectLineComponent/SelectLineComponent";
import { PointControl } from "./Controls/PointControl";
import { SquareControl } from "./Controls/SquareControl";

export class SelectLine {

	id;
	controls = [];
	frame;
	points;
	width;
	height;
	canConnect;

	constructor (frame, canConnect) {
		this.id = Math.random();
		this.frame = frame;
		this.canConnect = canConnect;
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
		if (this.canConnect) {
			this.controls.push(new PointControl(this.points[0]));
			for (let i = 1; i < this.points.length - 1; i++) {
				this.controls.push(new SquareControl(this.points[i]));
			}
			this.controls.push(new PointControl(this.points[this.points.length - 1]));
		} else {
			for (let i = 0; i < this.points.length; i++) {
				this.controls.push(new SquareControl(this.points[i]));
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