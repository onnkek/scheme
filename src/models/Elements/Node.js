import NodeComponent from "../../components/Equipment/NodeComponent/NodeComponent";
import { Point } from "../Point";
import config from "../../config.json";
import { Element } from "./Element";
import { Terminal } from "./Terminal";
import TerminalNodeComponent from "../../components/TerminalNodeComponent/TerminalNodeComponent";

export class Node extends Element {

  number;
  position;
  widthLeft;
  widthRight;

  constructor (name, number, position, widthLeft, widthRight) {
    super(name);
    this.number = number;
    this.position = position;
    this.widthLeft = widthLeft;
    this.widthRight = widthRight;
    this.terminals.push(new Terminal("Терминал " + Math.random(), this.position));
  }

  drawComponent() {
    return (
      <>
        <NodeComponent key={this.id} number={this.number} x={this.position.x} y={this.position.y} widthLeft={this.widthLeft} widthRight={this.widthRight} />
        <TerminalNodeComponent position={this.terminals[0].position} id={this.id} widthLeft={this.widthLeft} widthRight={this.widthRight} />
      </>

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