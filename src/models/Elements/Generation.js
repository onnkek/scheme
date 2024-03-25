import { Element } from "./Element";
import { Point } from "../../utils/Point";
import { Terminal } from "./Terminal";
import { config } from "../../config";
import GenerationComponent from "../../components/Equipment/GenerationComponent/GenerationComponent";

export class Generation extends Element {

  isShowTerminals;
  voltage;
  angle;
  canRotate;

  constructor (name, position, voltage) {
    super(name);
    this.type = "generation"
    this.pole1 = null;
    this.pole2 = null;
    this.position = position;
    this.isShowTerminals = false;
    this.canRotate = true;
    this.angle = 0;
    this.voltage = voltage;
  }
  addTerminals() {
    this.terminals.push(new Terminal("Терминал " + Math.random(), new Point(this.position.x, this.position.y - config.elements.generation.radius), this.angle));
  }
  drawComponent() {
    return (
      <GenerationComponent
        key={this.id}
        state={this.state}
        x={this.position.x}
        y={this.position.y}
        isShowTerminals={this.isShowTerminals}
        terminals={this.terminals}
        voltageColor={this.getVoltageColor()}
        angle={this.angle}
        opacity={this.opacity}
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
      new Point(this.position.x - config.elements.generation.radius - offset, this.position.y - config.elements.generation.radius - offset),
      new Point(this.position.x + config.elements.generation.radius + offset, this.position.y - config.elements.generation.radius - offset),
      new Point(this.position.x + config.elements.generation.radius + offset, this.position.y + config.elements.generation.radius + offset),
      new Point(this.position.x - config.elements.generation.radius - offset, this.position.y + config.elements.generation.radius + offset)
    ]
  }
}