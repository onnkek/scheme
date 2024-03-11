import { Point } from "../utils/Point";
import { Switch } from "./Elements/Switch";
import { Node } from "./Elements/Node";
import { Branch } from "./Elements/Branch";
import { Terminal } from "./Elements/Terminal";
import { Transformer } from "./Elements/Transformer";
import { Generation } from "./Elements/Generation";
import { Load } from "./Elements/Load";

export class Scheme {
  elements = [];

  constructor () {
    this.initScheme();
  }

  createBranch() {
    const newBranch = new Branch("New branch " + Math.random(), 1, 2, null, null, [], 500)
    newBranch.emptyTerminal1 = new Terminal("New terminal " + Math.random(), new Point(0, 0), 0);
    newBranch.emptyTerminal2 = new Terminal("New terminal " + Math.random(), new Point(0, 0), 0);
    newBranch.canDraw = false;
    this.elements.unshift(newBranch);
    return newBranch;
  }

  changeTerminalPosition(selectElementTerminal, position) {
    let nodeIndex = this.elements.findIndex(x => x.terminals.find(x => x.id === selectElementTerminal.id));
    let terminalIndex = this.elements[nodeIndex].terminals.findIndex(x => x.id === selectElementTerminal.id);

    // Change massive, not change terminal
    this.elements[nodeIndex].terminals[terminalIndex].position = position;
    this.elements[nodeIndex].terminals = [
      ...this.elements[nodeIndex].terminals.slice(0, terminalIndex),
      this.elements[nodeIndex].terminals[terminalIndex],
      ...this.elements[nodeIndex].terminals.slice(terminalIndex + 1)
    ]
  }
  disconnectBranch(selectElement, type, cursor) {
    if (type === 1) {
      let nodeIndex = this.elements.findIndex(x => x.terminals.find(x => x.id === selectElement.terminal1.id));
      this.elements[nodeIndex].removeTerminal(selectElement.terminal1);

      const branchIndex = this.elements.findIndex(x => x.id === selectElement.id);
      this.elements[branchIndex].emptyTerminal1 = new Terminal("Терминал " + Math.random(), cursor);
      this.elements[branchIndex].terminal1 = null;
    } else {
      let nodeIndex = this.elements.findIndex(x => x.terminals.find(x => x.id === selectElement.terminal2.id));
      this.elements[nodeIndex].removeTerminal(selectElement.terminal2);

      const branchIndex = this.elements.findIndex(x => x.id === selectElement.id);
      this.elements[branchIndex].emptyTerminal2 = new Terminal("Терминал " + Math.random(), cursor);
      this.elements[branchIndex].terminal2 = null;
    }

    // console.log(this)
  }

  initScheme() {

    let node1 = new Node("1", 1, new Point(350, 110), 150, 150, 500);
    let node2 = new Node("2", 2, new Point(400, 660), 150, 150, 500);
    let node3 = new Node("3", 3, new Point(710, 210), 150, 150, 500);
    let node4 = new Node("4", 4, new Point(860, 660), 150, 150, 220);

    let terminal1_1 = new Terminal("Терм " + Math.random(), new Point(400, 110), 0);
    let terminal1_2 = new Terminal("Терм " + Math.random(), new Point(400, 660), 0);

    node1.terminals.push(terminal1_1);
    node2.terminals.push(terminal1_2);
    let terminal2_1 = new Terminal("Терм " + Math.random(), new Point(450, 660), 0);
    let terminal2_2 = new Terminal("Терм " + Math.random(), new Point(660, 210), 0);

    node2.terminals.push(terminal2_1);
    node3.terminals.push(terminal2_2);
    let terminal3_1 = new Terminal("Терм " + Math.random(), new Point(810, 210), 0);
    let terminal3_2 = new Terminal("Терм " + Math.random(), new Point(810, 390), 0);

    node3.terminals.push(terminal3_1);
    //node4.terminals.push(terminal3_2);
    let terminal4_1 = new Terminal("Терм " + Math.random(), new Point(710, 210), 0);
    let terminal4_2 = new Terminal("Терм " + Math.random(), new Point(500, 660), 0);

    node3.terminals.push(terminal4_1);
    node2.terminals.push(terminal4_2);

    let terminal5_1 = new Terminal("Терм " + Math.random(), new Point(810, 660), 0);
    let terminal5_2 = new Terminal("Терм " + Math.random(), new Point(810, 490), 0);
    node4.terminals.push(terminal5_1);

    this.elements.push(new Branch("12", 1, 2,
      terminal1_1,
      terminal1_2,
      [], 500
    ));
    this.elements.push(new Branch("23", 2, 3,
      terminal2_1,
      terminal2_2,
      [
        new Point(450, 380),
        new Point(660, 380)
      ], 500
    ));
    this.elements.push(new Branch("34", 3, 4,
      terminal3_1,
      terminal3_2,
      [], 500
    ));
    this.elements.push(new Branch("23_2", 2, 3,
      terminal4_1,
      terminal4_2,
      [
        new Point(710, 430),
        new Point(500, 430)
      ], 500
    ));
    this.elements.push(new Branch("42", 4, 2,
      terminal5_1,
      terminal5_2,
      [], 220
    ));
    this.elements.push(node1);
    this.elements.push(node2);
    this.elements.push(node3);
    this.elements.push(node4);





    this.elements.push(new Switch("S1", false, new Point(300, 300), 500));
    this.elements.push(new Switch("S2", true, new Point(300, 500), 500));

    this.elements.push(new Generation("G1", new Point(800, 800), 110));
    this.elements.push(new Load("G1", new Point(600, 800), 110));

    let transformer = new Transformer("T1", new Point(810, 440), 500, 220);
    transformer.terminals[0] = terminal5_2;
    transformer.terminals[1] = terminal3_2;
    this.elements.push(transformer);




  }



}