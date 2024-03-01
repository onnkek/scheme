import NodeComponent from "../components/NodeComponent/NodeComponent";
import { Element } from "./Element";

export class Node extends Element {

  number;
  image;

  constructor (name, number, position, widthLeft, widthRight) {
    super(name);
    this.number = number;
    this.position = position;
    this.widthLeft = widthLeft;
    this.widthRight = widthRight;
  }

  drawComponent() {
    return (<NodeComponent key={this.id} number={this.number} x={this.position.x} y={this.position.y} widthLeft={this.widthLeft} widthRight={this.widthRight} />);
  }
  copy() {
    let newNode = new Node(this.name, this.number, this.position, this.widthLeft, this.widthRight);
    newNode.id = this.getId();
    return newNode;
  }
}