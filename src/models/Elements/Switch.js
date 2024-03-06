import SwitchComponent from "../../components/Equipment/SwitchComponent/SwitchComponent";
import { Element } from "./Element";
import { Point } from "../../tools/Point";
import config from "../../config.json";
import { Terminal } from "./Terminal";

export class Switch extends Element {

	state;
	isShowTerminals;

	constructor(name, state, position) {
		super(name);
		this.pole1 = null;
		this.pole2 = null;
		this.position = position;
		this.state = state;
		this.isShowTerminals = false;
		this.terminals.push(new Terminal("Терминал " + Math.random(), new Point(this.position.x, this.position.y - config.elements.switchSize / 2 - 2)));
		this.terminals.push(new Terminal("Терминал " + Math.random(), new Point(this.position.x, this.position.y + config.elements.switchSize / 2 + 2)));
	}

	drawComponent() {
		return (
			<SwitchComponent
				key={this.id}
				state={this.state}
				x={this.position.x}
				y={this.position.y}
				isShowTerminals={this.isShowTerminals}
				terminals={this.terminals}
			/>
		);
	}
	copy() {
		let newSwitch = new Switch(this.name, this.state, this.position);
		newSwitch.id = this.getId();
		return newSwitch;
	}
	getFrame() {
		return [
			new Point(this.position.x - config.elements.switchSize / 2 - config.elements.switchStrokeWidth / 2, this.position.y - config.elements.switchSize / 2 - config.elements.switchStrokeWidth / 2),
			new Point(this.position.x + config.elements.switchSize / 2 + config.elements.switchStrokeWidth / 2, this.position.y - config.elements.switchSize / 2 - config.elements.switchStrokeWidth / 2),
			new Point(this.position.x + config.elements.switchSize / 2 + config.elements.switchStrokeWidth / 2, this.position.y + config.elements.switchSize / 2 + config.elements.switchStrokeWidth / 2),
			new Point(this.position.x - config.elements.switchSize / 2 - config.elements.switchStrokeWidth / 2, this.position.y + config.elements.switchSize / 2 + config.elements.switchStrokeWidth / 2)
		]
	}
}