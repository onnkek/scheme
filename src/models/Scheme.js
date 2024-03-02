import { Branch } from "./Elements/Branch";
import { Node } from "./Elements/Node";
import { Point } from "./Point";
import { Switch } from "./Elements/Switch";

export class Scheme {
  elements = [];

  constructor() {
    this.initScheme();
  }

  initScheme() {
    this.elements.push(new Node("1", 1, new Point(350, 110), 150, 150));
    this.elements.push(new Node("2", 2, new Point(400, 660), 150, 150));
    this.elements.push(new Node("3", 3, new Point(710, 210), 150, 150));
    this.elements.push(new Node("4", 4, new Point(860, 660), 150, 150));

    this.elements.push(new Branch("12", 1, 2, [
      new Point(400, 110), new Point(400, 660)
    ]));
    this.elements.push(new Branch("23", 2, 3, [
      new Point(450, 660), new Point(450, 380), new Point(660, 380), new Point(660, 210)
    ]));
    this.elements.push(new Branch("34", 3, 4, [
      new Point(810, 210), new Point(810, 660)
    ]));
    this.elements.push(new Branch("41", 4, 1, [
      new Point(760, 660), new Point(760, 580), new Point(500, 580), new Point(500, 660)
    ]));

    this.elements.push(new Switch("S1", true, new Point(300, 300), ));
  }

  

}