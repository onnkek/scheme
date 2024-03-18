import { Point } from "../utils/Point";
import { getRotateTransformPoint, getRotateTransformPoints } from "../utils/Transform";
import { hitTestFrame } from "../utils/hitTest";
import { Branch } from "./Elements/Branch";
import { SelectBox } from "./SelectBox";
import { SelectLine } from "./SelectLine";
import { SelectionFrameBox } from "./SelectionFrame";

export class SelectLayer {
	box;
	frame;
	manyBox;
	selectionMany;
	selectionFrame;
	startPointSelect;
	selected;
	angle;
	lastAngle;
	rotatePoint;

	constructor () {
		this.selected = [];
		this.box = [];
		this.angle = 0;
		this.lastAngle = 0;
	}


	rotate(cursor) {

		const minX = this.box[0].frame[0].x
		const maxX = this.box[0].frame[1].x
		const minY = this.box[0].frame[0].y
		const maxY = this.box[0].frame[2].y
		let x = 0;
		let y = 0;
		if (maxX === minX) {
			x = maxX;
			y = (maxY + minY) / 2;
		}
		if (maxY === minY) {
			x = (maxX + minX) / 2;
			y = minY;
		}
		if (maxX === minX && maxY === minY) {
			x = minX;
			y = minY;
		}
		if (maxX !== minX && maxY !== minY) {
			x = (maxX + minX) / 2;
			y = (maxY + minY) / 2;
		}
		const newPoint = new Point(x, y);



		let lastAngle = Math.atan2(cursor.y - newPoint.y, cursor.x - newPoint.x);
		lastAngle = Math.round((lastAngle * 180 / Math.PI + 90) / 90) * 90;

		for (let i = 0; i < this.selected.length; i++) {
			if (this.selected[i].canRotate) {
				this.selected[i].position = getRotateTransformPoint(this.selected[i].position, -this.selected[i].angle + lastAngle, newPoint)
				this.selected[i].angle = lastAngle
				for (let j = 0; j < this.selected[i].terminals.length; j++) {
					this.selected[i].terminals[j].position =
						getRotateTransformPoint(this.selected[i].terminals[j].position, -this.selected[i].terminals[j].angle + lastAngle, newPoint);
					this.selected[i].terminals[j].angle = lastAngle;
				}
			}
		}

		this.angle = lastAngle;
		//this.rotatePoint = newPoint;

		console.log(this.box[0])


		this.lastAngle = lastAngle;
	}





	selectElement(element) {
		this.selected = [];
		this.selected.push(element);
		this.select();
	}
	selectElements(elements) {
		this.selected = [];
		elements.forEach((element) => {
			this.selected.push(element);

		})
		this.select();


	}
	clear() {
		this.selected = [];
		this.box = [];
	}
	getRotatePoint() {
		const frame = this.getFrame();
		const minX = frame[0].x
		const maxX = frame[1].x
		const minY = frame[0].y
		const maxY = frame[2].y
		let x = 0;
		let y = 0;
		if (maxX === minX) {
			x = maxX;
			y = (maxY + minY) / 2;
		}
		if (maxY === minY) {
			x = (maxX + minX) / 2;
			y = minY;
		}
		if (maxX === minX && maxY === minY) {
			x = minX;
			y = minY;
		}
		if (maxX !== minX && maxY !== minY) {
			x = (maxX + minX) / 2;
			y = (maxY + minY) / 2;
		}
		return new Point(x, y);
	}

	getFrame() {
		let points = [];

		for (let i = 0; i < this.selected.length; i++) {
			if (!(this.selected[i] instanceof Branch)) {
				points.push(this.selected[i].position);
				points.push(...this.selected[i].getFrame())
			}
			if (this.selected[i] instanceof Branch) {
				for (let j = 0; j < this.selected[i].points.length; j++) {
					points.push(this.selected[i].points[j]);
				}

			}

			for (let j = 0; j < this.selected[i].terminals.length; j++) {
				if (this.selected[i].terminals[j]) {
					points.push(this.selected[i].terminals[j].position);
				} else {
					points.push(this.selected[i].junctions[j].position);
				}
			}

		}
		console.log(points)
		const minX = Math.min(...points.map(x => x.x)) - 10
		const maxX = Math.max(...points.map(x => x.x)) + 10
		const minY = Math.min(...points.map(x => x.y)) - 10
		const maxY = Math.max(...points.map(x => x.y)) + 10
		return [
			new Point(minX, minY),
			new Point(maxX, minY),
			new Point(maxX, maxY),
			new Point(minX, maxY)
		]
	}

	select() {
		this.box = [];
		for (let i = 0; i < this.selected.length; i++) {
			if (this.selected[i] instanceof Branch) {
				this.box.push(new SelectLine(this.selected[i].getFrame()));
			} else {
				let canRotate = this.selected.length === 1 ? this.selected[i].canRotate : false;
				this.box.push(new SelectBox(this.selected[i].getFrame(), this.selected[i].angle, canRotate, this.selected[i].canResize));
			}
		}
		if (this.selected.length !== 1) {
			let frame = this.getFrame();
			let selectBox = new SelectBox(frame, this.angle, true, false);
			selectBox.color = "lightblue";
			selectBox.strokeDasharray = "5"
			console.log(this.angle)
			console.log(this.angle)
			console.log(this.angle)
			console.log(this.angle)
			console.log(this.angle)
			console.log(this.angle)
			if (Math.abs(this.angle) === 90 || Math.abs(this.angle) === 270) { // TODO NEED REFACTORING
				selectBox.controls[0].heightFrame = frame[1].x - frame[0].x;
			} else {
				selectBox.controls[0].heightFrame = frame[2].y - frame[1].y;
			}


			selectBox.angle = 0;
			this.box.unshift(selectBox);
		}
	}

	getSelectControl(cursor) {
		let control = null;
		for (let i = 0; i < this.box.length; i++) {
			for (let j = 0; j < this.box[i].controls.length; j++) {
				if (hitTestFrame(this.box[i].controls[j].getFrame(), cursor, 5)) {
					control = this.box[i].controls[j];
				}
			}
		}

		return control;
	}
}