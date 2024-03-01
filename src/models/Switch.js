import Rectangle from "../components/Shapes/Rectangle/Rectangle";
import { Element } from "./Element";
import { Point } from "./Point";

export class Switch extends Element {
	state;
	size = 40;
	constructor(name, state, position) {
		super(name);
		this.pole1 = null;
		this.pole2 = null;
		this.position = position;
		this.state = state;
	}
	
	drawComponent() {
		let fill = this.state ? "darkred" : "none";
		return (<Rectangle x={this.position.x} y={this.position.y} width={this.size} height={this.size} stroke="darkred" strokeWidth={4} fill={fill} />);
	}

	getFrame() {
		return [
			new Point(this.position.x - this.size / 2, this.position.y - this.size / 2),
			new Point(this.position.x + this.size / 2, this.position.y - this.size / 2),
			new Point(this.position.x + this.size / 2, this.position.y + this.size / 2),
			new Point(this.position.x - this.size / 2, this.position.y + this.size / 2)
		]
	}
}