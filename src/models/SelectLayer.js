import { SelectBox } from "./SelectBox";

export class SelectLayer {
	box;
	frame;

	select(element) {
		this.frame = element.getFrame();
		this.addBox();
	}

	addBox() {
		this.box = new SelectBox(this.frame);
	}

}