import SwitchComponent from "../../components/Equipment/SwitchComponent/SwitchComponent";
import { Element } from "./Element";
import { Point } from "../../utils/Point";
import { Terminal } from "./Terminal";
import { config } from "../../config";

export class Switch extends Element {

	state;
	isShowTerminals;
	voltage;
	angle;
	canRotate;

	constructor (name, state, position, voltage) {
		super(name);
		this.type = "switch"
		this.pole1 = null;
		this.pole2 = null;
		this.position = position;
		this.state = state;
		this.isShowTerminals = false;
		this.canRotate = true;
		this.angle = 0;
		this.voltage = voltage;

	}
	addTerminals() {
		this.terminals.push(new Terminal("Терминал " + Math.random(),
			new Point(this.position.x, this.position.y - config.elements.switch.size / 2), this.angle));
		this.terminals.push(new Terminal("Терминал " + Math.random(),
			new Point(this.position.x, this.position.y + config.elements.switch.size / 2), this.angle));
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
	getFrame() {
		const offset = 2;
		return [
			new Point(this.position.x - config.elements.switch.size / 2 - config.elements.switch.strokeWidth / 2 - offset,
				this.position.y - config.elements.switch.size / 2 - config.elements.switch.strokeWidth / 2 - offset),
			new Point(this.position.x + config.elements.switch.size / 2 + config.elements.switch.strokeWidth / 2 + offset,
				this.position.y - config.elements.switch.size / 2 - config.elements.switch.strokeWidth / 2 - offset),
			new Point(this.position.x + config.elements.switch.size / 2 + config.elements.switch.strokeWidth / 2 + offset,
				this.position.y + config.elements.switch.size / 2 + config.elements.switch.strokeWidth / 2 + offset),
			new Point(this.position.x - config.elements.switch.size / 2 - config.elements.switch.strokeWidth / 2 - offset,
				this.position.y + config.elements.switch.size / 2 + config.elements.switch.strokeWidth / 2 + offset)
		]
	}
}