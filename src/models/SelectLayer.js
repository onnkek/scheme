import { Branch } from "./Elements/Branch";
import { SelectBox } from "./SelectBox";
import { SelectLine } from "./SelectLine";

export class SelectLayer {
	box;
	frame;

	select(element) {
		this.frame = element.getFrame();
		console.log(this.frame)
		if (element instanceof Branch) {
			this.box = new SelectLine(this.frame);
		} else {
			this.box = new SelectBox(this.frame);
		}

	}
}