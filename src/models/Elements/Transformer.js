import { Element } from "./Element";
import { Point } from "../../utils/Point";
import { Terminal } from "./Terminal";
import TransformerComponent from "../../components/Equipment/TransformerComponent/TransformerComponent";
import { config } from "../../config";

export class Transformer extends Element {

  isShowTerminals;
  voltage1;
  voltage2;
  angle;
  canRotate;

  constructor (name, position, voltage1, voltage2) {
    super(name);
    this.type = "transformer"
    this.position = position;
    this.isShowTerminals = false;
    this.canRotate = true;
    this.terminals.push(new Terminal("Терминал " + Math.random(),
      new Point(this.position.x, this.position.y - config.elements.transformer.radius - config.elements.transformer.offset), this.angle));
    this.terminals.push(new Terminal("Терминал " + Math.random(),
      new Point(this.position.x, this.position.y + config.elements.transformer.radius + config.elements.transformer.offset), this.angle));
    this.voltage1 = voltage1;
    this.voltage2 = voltage2;
    this.angle = 0;
  }

  drawComponent() {
    return (
      <TransformerComponent
        key={this.id}
        x={this.position.x}
        y={this.position.y}
        isShowTerminals={this.isShowTerminals}
        terminals={this.terminals}
        voltageColor1={this.getVoltageColor(this.voltage1)}
        voltageColor2={this.getVoltageColor(this.voltage2)}
        angle={this.angle}
      />
    );
  }
  getVoltageColor(voltage) {
    switch (voltage) {
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
    const offset = 3;
    return [
      new Point(this.position.x - config.elements.transformer.radius - offset,
        this.position.y - config.elements.transformer.offset - config.elements.transformer.radius - offset),
      new Point(this.position.x + config.elements.transformer.radius + offset,
        this.position.y - config.elements.transformer.offset - config.elements.transformer.radius - offset),
      new Point(this.position.x + config.elements.transformer.radius + offset,
        this.position.y + config.elements.transformer.offset + config.elements.transformer.radius + offset),
      new Point(this.position.x - config.elements.transformer.radius - offset,
        this.position.y + config.elements.transformer.offset + config.elements.transformer.radius + offset)
    ]
  }
}