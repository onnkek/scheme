import NodeComponent from "../../components/Equipment/NodeComponent/NodeComponent";
import { config } from "../../config";
import { Point } from "../../utils/Point";
import { Element } from "./Element";
import { Terminal } from "./Terminal";

export class Node extends Element {

  number;
  position;
  widthLeft;
  widthRight;
  isShowTerminals;
  voltage;
  angle;

  constructor(name, number, position, widthLeft, widthRight, voltage) {
    super(name);
    this.number = number;
    this.position = position;
    this.widthLeft = widthLeft;
    this.widthRight = widthRight;
    this.isShowTerminals = false;
    this.voltage = voltage;
    this.angle = 0;
  }

  addTerminal(x) {
    let terminal = new Terminal("Терминал " + Math.random(), new Point(x, this.position.y));
    this.terminals.push(terminal);
    return terminal;
  }

  drawComponent() {
    return (
      <NodeComponent
        id={this.id}
        key={this.id}
        number={this.number}
        x={this.position.x}
        y={this.position.y}
        widthLeft={this.widthLeft}
        widthRight={this.widthRight}
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
  copy() {
    let newNode = new Node(this.name, this.number, this.position, this.widthLeft, this.widthRight);
    newNode.id = this.getId();
    return newNode;
  }

  getFrame() {
    return [
      new Point(this.position.x - this.widthLeft, this.position.y - config.elements.nodeHeight / 2),
      new Point(this.position.x + this.widthRight, this.position.y - config.elements.nodeHeight / 2),
      new Point(this.position.x + this.widthRight, this.position.y + config.elements.nodeHeight / 2),
      new Point(this.position.x - this.widthLeft, this.position.y + config.elements.nodeHeight / 2)
    ]
  }
}