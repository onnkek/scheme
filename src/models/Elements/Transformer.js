import { Element } from "./Element";
import { Point } from "../../tools/Point";
import { Terminal } from "./Terminal";
import TransformerComponent from "../../components/Equipment/TransformerComponent/TransformerComponent";
import { config } from "../../config";

export class Transformer extends Element {

  isShowTerminals;
  voltage1;
  voltage2;

  constructor (name, position, voltage1, voltage2) {
    super(name);
    this.position = position;
    this.isShowTerminals = false;
    this.terminals.push(new Terminal("Терминал " + Math.random(),
      new Point(this.position.x, this.position.y - config.elements.transformer.radius - config.elements.transformer.offset)));
    this.terminals.push(new Terminal("Терминал " + Math.random(),
      new Point(this.position.x, this.position.y + config.elements.transformer.radius + config.elements.transformer.offset)));
    this.voltage1 = voltage1;
    this.voltage2 = voltage2;
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
    return [
      new Point(this.position.x - config.elements.transformer.radius, this.position.y - config.elements.transformer.offset - config.elements.transformer.radius),
      new Point(this.position.x + config.elements.transformer.radius, this.position.y - config.elements.transformer.offset - config.elements.transformer.radius),
      new Point(this.position.x + config.elements.transformer.radius, this.position.y + config.elements.transformer.offset + config.elements.transformer.radius),
      new Point(this.position.x - config.elements.transformer.radius, this.position.y + config.elements.transformer.offset + config.elements.transformer.radius)
    ]
  }
}