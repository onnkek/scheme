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

  // constructor () {
  //   this.initScheme();
  // }

  createBranch() {
    const newBranch = new Branch("New branch " + Math.random(), [], 500);
    newBranch.canDraw = false;
    newBranch.terminals.push(null);
    newBranch.terminals.push(null);
    this.elements.unshift(newBranch);
    return newBranch;
  }


  changeTerminalPosition(selectTerminal, position) {
    const nodes = this.elements.filter(x => x instanceof Node);
    let nodeIndex = nodes.findIndex(x => x.terminals.find(x => x.id === selectTerminal.id));
    if (nodeIndex !== -1) {
      let terminalIndex = nodes[nodeIndex].terminals.findIndex(x => x.id === selectTerminal.id);

      // Change massive, not change terminal
      nodes[nodeIndex].terminals[terminalIndex].position = position;
      nodes[nodeIndex].terminals = [
        ...nodes[nodeIndex].terminals.slice(0, terminalIndex),
        nodes[nodeIndex].terminals[terminalIndex],
        ...nodes[nodeIndex].terminals.slice(terminalIndex + 1)
      ]
    }

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

    let newBranch = new Branch("12", [

    ], 500);
    newBranch.terminals.push(terminal1_1);
    newBranch.terminals.push(terminal1_2);
    this.elements.push(newBranch);

    newBranch = new Branch("23", [
      new Point(450, 380),
      new Point(660, 380)
    ], 500
    )
    newBranch.terminals.push(terminal2_1);
    newBranch.terminals.push(terminal2_2);
    this.elements.push(newBranch);

    newBranch = new Branch("34", [

    ], 500
    );
    newBranch.terminals.push(terminal3_1);
    newBranch.terminals.push(terminal3_2);
    this.elements.push(newBranch);

    newBranch = new Branch("23_2", [
      new Point(710, 430),
      new Point(500, 430)
    ], 500
    );
    newBranch.terminals.push(terminal4_1);
    newBranch.terminals.push(terminal4_2);
    this.elements.push(newBranch);

    newBranch = new Branch("42", [

    ], 220
    );
    newBranch.terminals.push(terminal5_1);
    newBranch.terminals.push(terminal5_2);
    this.elements.push(newBranch);


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