import { Point } from "../tools/Point";
import { SizeControl } from "./Controls/SizeControl";

export class SelectBox {
	controls = [];
	frame;
	position;
	width;
	height;

	constructor(frame) {
		this.frame = frame;
		this.initSelectBox();
		this.addControls();
	}

	initSelectBox() {
		this.position = new Point(this.frame[0].x + (this.frame[1].x - this.frame[0].x) / 2, this.frame[1].y + (this.frame[2].y - this.frame[1].y) / 2);
		this.width = this.frame[1].x - this.frame[0].x + 5;
		this.height = this.frame[2].y - this.frame[1].y + 5;
	}

	addControls() {
		this.controls.push(new SizeControl(0, this.frame[0], SizeControl.Types.Left));
		this.controls.push(new SizeControl(90, this.frame[1], SizeControl.Types.Right));
		this.controls.push(new SizeControl(180, this.frame[2], SizeControl.Types.Right));
		this.controls.push(new SizeControl(270, this.frame[3], SizeControl.Types.Left));
	}

}