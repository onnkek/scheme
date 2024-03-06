import { Point } from "../tools/Point";
import { Switch } from "./Elements/Switch";
import { Node } from "./Elements/Node";
import { Branch } from "./Elements/Branch";
import { Terminal } from "./Elements/Terminal";

export class Scheme {
  elements = [];

  constructor () {
    this.initScheme();
  }

  initScheme() {

    let node1 = new Node("1", 1, new Point(350, 110), 150, 150);
    let node2 = new Node("2", 2, new Point(400, 660), 150, 150);
    let node3 = new Node("3", 3, new Point(710, 210), 150, 150);
    let node4 = new Node("4", 4, new Point(860, 660), 150, 150);

    let terminal1_1 = new Terminal("Терм " + Math.random(), new Point(400, 110));
    let terminal1_2 = new Terminal("Терм " + Math.random(), new Point(400, 660));

    node1.terminals.push(terminal1_1);
    node2.terminals.push(terminal1_2);
    let terminal2_1 = new Terminal("Терм " + Math.random(), new Point(450, 660));
    let terminal2_2 = new Terminal("Терм " + Math.random(), new Point(660, 210));

    node2.terminals.push(terminal2_1);
    node3.terminals.push(terminal2_2);
    let terminal3_1 = new Terminal("Терм " + Math.random(), new Point(810, 210));
    let terminal3_2 = new Terminal("Терм " + Math.random(), new Point(810, 660));

    node3.terminals.push(terminal3_1);
    node4.terminals.push(terminal3_2);
    let terminal4_1 = new Terminal("Терм " + Math.random(), new Point(760, 660));
    let terminal4_2 = new Terminal("Терм " + Math.random(), new Point(500, 660));

    node4.terminals.push(terminal4_1);
    node2.terminals.push(terminal4_2);

    this.elements.push(new Branch("12", 1, 2,
      terminal1_1,
      terminal1_2,
      []
    ));
    this.elements.push(new Branch("23", 2, 3,
      terminal2_1,
      terminal2_2,
      [
        new Point(450, 380),
        new Point(660, 380)
      ]
    ));
    this.elements.push(new Branch("34", 3, 4,
      terminal3_1,
      terminal3_2,
      []
    ));
    this.elements.push(new Branch("42", 4, 2,
      terminal4_1,
      terminal4_2,
      [
        new Point(760, 580),
        new Point(500, 580)
      ]
    ));
    this.elements.push(node1);
    this.elements.push(node2);
    this.elements.push(node3);
    this.elements.push(node4);

    this.elements.push(new Switch("S1", true, new Point(300, 300),));
    this.elements.push(new Switch("S2", true, new Point(300, 500),));
  }



}