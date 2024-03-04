import { Element } from "./Element";

export class Terminal extends Element {

  position;

  constructor (name, position) {
    super(name);
    this.position = position;
  }
  drawComponent() { }

}