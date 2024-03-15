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
	
	constructor() {
		this.box = [];
	}
	selectMany(elements) {
		
		for(let i = 0; i < elements.length; i++) {
			this.select(elements[i])
		}
		
		// this.frame = element.getFrame();
		// if (element instanceof Branch) {
		// 	this.box = new SelectLine(this.frame);
		// } else {
		// 	this.box = new SelectBox(this.frame, element.angle, element.canRotate, element.canResize);
		// }

	}

	select(element) {
		this.frame = element.getFrame();
		if (element instanceof Branch) {
			this.box.push(new SelectLine(this.frame));
		} else {
			this.box.push(new SelectBox(this.frame, element.angle, element.canRotate, element.canResize));
		}

	}

	getSelectControl(cursor) {
		let control = null;
		for (let i = 0; i < this.box.controls.length; i++) {
			if (hitTestFrame(this.box.controls[i].getFrame(), cursor, 5)) {
				control = this.box.controls[i];
			}
		}
		return control;
	}
}