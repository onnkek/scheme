import { Point } from "../utils/Point";
import { RotateControl } from "./Controls/RotateControl";
import { SizeControl } from "./Controls/SizeControl";

export class SelectBox {
	controls = [];
	frame;
	position;
	width;
	height;
	angle;

	constructor(frame, angle) {
		this.frame = frame;
		this.angle = angle;
		this.initSelectBox();
		this.addControls();

	}

	initSelectBox() {
		this.position = new Point(this.frame[0].x + (this.frame[1].x - this.frame[0].x) / 2, this.frame[1].y + (this.frame[2].y - this.frame[1].y) / 2);
		this.width = this.frame[1].x - this.frame[0].x + 5;
		this.height = this.frame[2].y - this.frame[1].y + 5;
	}

	addControls() {
		this.controls.push(new SizeControl(0, this.angle, this.position, this.frame[0], SizeControl.Types.LeftTop));
		this.controls.push(new SizeControl(90, this.angle, this.position, this.frame[1], SizeControl.Types.RightTop));
		this.controls.push(new SizeControl(180, this.angle, this.position, this.frame[2], SizeControl.Types.RightBottom));
		this.controls.push(new SizeControl(270, this.angle, this.position, this.frame[3], SizeControl.Types.LeftBottom));
		this.controls.push(new RotateControl(this.position, this.angle));
	}

}