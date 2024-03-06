import NodeComponent from "../../components/Equipment/NodeComponent/NodeComponent";
import { Point } from "../../tools/Point";
import config from "../../config.json";
import { Element } from "./Element";
import { Terminal } from "./Terminal";

export class Node extends Element {

  number;
  position;
  widthLeft;
  widthRight;
  isShowTerminals;

  constructor(name, number, position, widthLeft, widthRight) {
    super(name);
    this.number = number;
    this.position = position;
    this.widthLeft = widthLeft;
    this.widthRight = widthRight;
    this.isShowTerminals = false;
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
      />
    );
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