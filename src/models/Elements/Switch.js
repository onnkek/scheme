import SwitchComponent from "../../components/Equipment/SwitchComponent/SwitchComponent";
import { Element } from "./Element";
import { Point } from "../../utils/Point";
import { Terminal } from "./Terminal";
import { config } from "../../config";
import { getRotateTransformPoint } from "../../utils/Transform";

export class Switch extends Element {

	state;
	isShowTerminals;
	voltage;
	angle;

	constructor(name, state, position, voltage) {
		super(name);
		this.pole1 = null;
		this.pole2 = null;
		this.position = position;
		this.state = state;
		this.isShowTerminals = false;
		this.angle = 0;
		this.terminals.push(new Terminal("Терминал " + Math.random(),
			new Point(this.position.x, this.position.y - config.elements.switchSize / 2 - 2), this.angle));
		this.terminals.push(new Terminal("Терминал " + Math.random(),
			new Point(this.position.x, this.position.y + config.elements.switchSize / 2 + 2), this.angle));
		this.voltage = voltage;
 
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
				voltageColor={this.getVoltageColor()}
				angle={this.angle}
			/>
		);
	}
	getVoltageColor() {
		switch (this.voltage) {
			case 500:
				return config.colors.voltageLevel[500];
			case 220:
				return config.colors.voltageLevel[220];
			case 110:
				return config.colors.voltageLevel[110];
			default:
				return config.colors.voltageLevel.default
		}
	}
	// copy() {
	// 	let newSwitch = new Switch(this.name, this.state, this.position);
	// 	newSwitch.id = this.getId();
	// 	return newSwitch;
	// }
	getFrame() {
		return [
			new Point(this.position.x - config.elements.switchSize / 2 - config.elements.switchStrokeWidth / 2, this.position.y - config.elements.switchSize / 2 - config.elements.switchStrokeWidth / 2),
			new Point(this.position.x + config.elements.switchSize / 2 + config.elements.switchStrokeWidth / 2, this.position.y - config.elements.switchSize / 2 - config.elements.switchStrokeWidth / 2),
			new Point(this.position.x + config.elements.switchSize / 2 + config.elements.switchStrokeWidth / 2, this.position.y + config.elements.switchSize / 2 + config.elements.switchStrokeWidth / 2),
			new Point(this.position.x - config.elements.switchSize / 2 - config.elements.switchStrokeWidth / 2, this.position.y + config.elements.switchSize / 2 + config.elements.switchStrokeWidth / 2)
		]
	}
}