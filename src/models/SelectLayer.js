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

	constructor () {
		this.selected = [];
		this.box = [];
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
			this.select();
		})
	}
	clear() {
		this.selected = [];
		this.box = [];
	}

	select() {
		this.box = [];
		for (let i = 0; i < this.selected.length; i++) {
			if (this.selected[i] instanceof Branch) {
				this.box.push(new SelectLine(this.selected[i].getFrame()));
			} else {
				this.box.push(new SelectBox(this.selected[i].getFrame(), this.selected[i].angle, this.selected[i].canRotate, this.selected[i].canResize));
			}
		}
	}

	getSelectControl(cursor) {
		let control = null;
		for (let i = 0; i < this.box[0].controls.length; i++) {
			if (hitTestFrame(this.box[0].controls[i].getFrame(), cursor, 5)) {
				control = this.box[0].controls[i];
			}
		}
		return control;
	}
}