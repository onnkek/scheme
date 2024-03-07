import { Element } from "./Element";
import { Point } from "../../tools/Point";
import { Terminal } from "./Terminal";
import { config } from "../../config";
import LoadComponent from "../../components/Equipment/LoadComponent/LoadComponent";

export class Load extends Element {

  isShowTerminals;
  voltage;

  constructor (name, position, voltage) {
    super(name);
    this.pole1 = null;
    this.pole2 = null;
    this.position = position;
    this.isShowTerminals = false;
    this.terminals.push(new Terminal("Терминал " + Math.random(), new Point(this.position.x, this.position.y - config.elements.load.height)));
    this.voltage = voltage;
  }

  drawComponent() {
    return (
      <LoadComponent
        key={this.id}
        state={this.state}
        x={this.position.x}
        y={this.position.y}
        isShowTerminals={this.isShowTerminals}
        terminals={this.terminals}
        voltageColor={this.getVoltageColor()}
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
    return [
      new Point(this.position.x - config.elements.load.widthArrow / 2, this.position.y - config.elements.load.height),
      new Point(this.position.x + config.elements.load.widthArrow / 2, this.position.y - config.elements.load.height),
      new Point(this.position.x + config.elements.load.widthArrow / 2, this.position.y),
      new Point(this.position.x - config.elements.load.widthArrow / 2, this.position.y)
    ]
  }
}