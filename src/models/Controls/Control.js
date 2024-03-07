export class Control {

	position;
	id;
	angle;
	constructor(position) {
		this.position = position;
		this.id = Math.random();
		this.angle = 0;
	}

	drawComponent() { }

	getFrame() { }

}