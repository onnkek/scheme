import SwitchComponent from "../components/Equipment/SwitchComponent/SwitchComponent";
import { Element } from "./Element";
import { Point } from "./Point";
import config from "../config.json";

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
		return (<SwitchComponent key={this.id} state={this.state} x={this.position.x} y={this.position.y} />);
	}
	copy() {
		let newSwitch = new Switch(this.name, this.state, this.position);
		newSwitch.id = this.getId();
		return newSwitch;
	}
	getFrame() {
		return [
			new Point(this.position.x - this.size / 2 - config.elements.switchStrokeWidth / 2, this.position.y - this.size / 2 - config.elements.switchStrokeWidth / 2),
			new Point(this.position.x + this.size / 2 + config.elements.switchStrokeWidth / 2, this.position.y - this.size / 2 - config.elements.switchStrokeWidth / 2),
			new Point(this.position.x + this.size / 2 + config.elements.switchStrokeWidth / 2, this.position.y + this.size / 2 + config.elements.switchStrokeWidth / 2),
			new Point(this.position.x - this.size / 2 - config.elements.switchStrokeWidth / 2, this.position.y + this.size / 2 + config.elements.switchStrokeWidth / 2)
		]
	}
}