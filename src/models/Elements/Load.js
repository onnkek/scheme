import { Element } from "./Element";
import { Point } from "../../utils/Point";
import { Terminal } from "./Terminal";
import { config } from "../../config";
import LoadComponent from "../../components/Equipment/LoadComponent/LoadComponent";
import { getRotateTransformPoint } from "../../utils/Transform";

export class Load extends Element {

  isShowTerminals;
  voltage;
  angle;
  canRotate;

  constructor(name, position, voltage) {
    super(name);
    this.pole1 = null;
    this.pole2 = null;
    this.position = position;
    this.isShowTerminals = false;
    this.canRotate = true;
    this.angle = 0;
    this.terminals.push(new Terminal("Терминал " + Math.random(),
      new Point(this.position.x, this.position.y - config.elements.load.height / 2), this.angle));
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
    return [
      new Point(this.position.x - config.elements.load.widthArrow / 2, this.position.y - config.elements.load.height / 2),
      new Point(this.position.x + config.elements.load.widthArrow / 2, this.position.y - config.elements.load.height / 2),
      new Point(this.position.x + config.elements.load.widthArrow / 2, this.position.y + config.elements.load.height / 2),
      new Point(this.position.x - config.elements.load.widthArrow / 2, this.position.y + config.elements.load.height / 2)
    ]
  }
}