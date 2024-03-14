import NodeComponent from "../../components/Equipment/NodeComponent/NodeComponent";
import { config } from "../../config";
import { Point } from "../../utils/Point";
import { SizeControl } from "../Controls/SizeControl";
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
  canRotate;

  constructor (name, number, position, widthLeft, widthRight, voltage) {
    super(name);
    this.type = "node"
    this.number = number;
    this.position = position;
    this.widthLeft = widthLeft;
    this.widthRight = widthRight;
    this.isShowTerminals = false;
    this.canRotate = false;
    this.voltage = voltage;
    this.angle = 0;
    this.canResize = true;
  }
  addTerminals() {}
  addTerminal(x) {
    let terminal = new Terminal("Терминал " + Math.random(), new Point(x, this.position.y));
    this.terminals.push(terminal);
    return terminal;
  }
  removeTerminal(terminal) {
    const index = this.terminals.findIndex(x => x.id === terminal.id);
    this.terminals = [
      ...this.terminals.slice(0, index),
      ...this.terminals.slice(index + 1)
    ]
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
      new Point(this.position.x - this.widthLeft - config.editor.selectBoxPadding, this.position.y - config.elements.node.height / 2 - config.editor.selectBoxPadding),
      new Point(this.position.x + this.widthRight + config.editor.selectBoxPadding, this.position.y - config.elements.node.height / 2 - config.editor.selectBoxPadding),
      new Point(this.position.x + this.widthRight + config.editor.selectBoxPadding, this.position.y + config.elements.node.height / 2 + config.editor.selectBoxPadding),
      new Point(this.position.x - this.widthLeft - config.editor.selectBoxPadding, this.position.y + config.elements.node.height / 2 + config.editor.selectBoxPadding)
    ]
  }
  changeSize(type, delta) {
    if (type === SizeControl.Types.RightTop || type === SizeControl.Types.RightBottom) {
      this.widthRight += delta.x;
    }

    if (type === SizeControl.Types.LeftTop || type === SizeControl.Types.LeftBottom) {
      this.widthLeft -= delta.x;
    }
    if (this.widthLeft < 50)
      this.widthLeft = 50;
    if (this.widthRight < 50)
      this.widthRight = 50;
  }
}