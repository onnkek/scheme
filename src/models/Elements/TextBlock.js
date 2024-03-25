import { Element } from "./Element";
import { Point } from "../../utils/Point";
import { config } from "../../config";
import TextBlockComponent from "../../components/Equipment/TextBlockComponent/TextBlockComponent";
import { getRotateTransformPoints } from "../../utils/Transform";

export class TextBlock extends Element {

  text;
  angle;
  canRotate;
  fontSize;
  color;
  _coefFontSize = 0.6;
  constructor (text, position) {
    super("TextBlock");
    this.type = "textBlock"
    this.position = position;
    this.canRotate = true;
    this.angle = 0;
    this.fontSize = 20;
    this.color = "#FFFFFF";
    this.text = text;
  }
  getObjectProperties() {
    return [
      "name"
    ]
  }
  drawComponent() {
    return (
      <TextBlockComponent
        key={this.id}
        text={this.text}
        x={this.position.x - this.text.length * this._coefFontSize * this.fontSize / 2}
        y={this.position.y + this.fontSize / 2}
        angle={this.angle}
        opacity={this.opacity}
        color={this.color}
        fontSize={this.fontSize}
        rotatePoint={new Point(this.position.x, this.position.y)}
      />
    );
  }
  addTerminals() { }
  getFrame() {
    const offset = 3;
    return [
      new Point(this.position.x - this.text.length * this._coefFontSize * this.fontSize / 2 - offset, this.position.y - this.fontSize / 2 - offset),
      new Point(this.position.x + this.text.length * this._coefFontSize * this.fontSize / 2 + offset, this.position.y - this.fontSize / 2 - offset),
      new Point(this.position.x + this.text.length * this._coefFontSize * this.fontSize / 2 + offset, this.position.y + this.fontSize / 2 + offset),
      new Point(this.position.x - this.text.length * this._coefFontSize * this.fontSize / 2 - offset, this.position.y + this.fontSize / 2 + offset)
    ]
  }
}