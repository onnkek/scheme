import { Element } from "./Element";
import { Point } from "../../tools/Point";
import config from "../../config.json";
import { Terminal } from "./Terminal";
import TransformerComponent from "../../components/Equipment/TransformerComponent/TransformerComponent";

export class Transformer extends Element {

  isShowTerminals;

  constructor(name, position) {
    super(name);
    this.position = position;
    this.isShowTerminals = false;
    this.terminals.push(new Terminal("Терминал " + Math.random(),
      new Point(this.position.x, this.position.y - config.elements.transformer.radius - config.elements.transformer.offset)));
    this.terminals.push(new Terminal("Терминал " + Math.random(),
      new Point(this.position.x, this.position.y + config.elements.transformer.radius + config.elements.transformer.offset)));
  }

  drawComponent() {
    return (
      <TransformerComponent
        key={this.id}
        x={this.position.x}
        y={this.position.y}
        isShowTerminals={this.isShowTerminals}
        terminals={this.terminals}
      />
    );
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