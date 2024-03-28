import { Point } from "../utils/Point";
import { Switch } from "./Elements/Switch";
import { Node } from "./Elements/Node";
import { Branch } from "./Elements/Branch";
import { Terminal } from "./Elements/Terminal";
import { Transformer } from "./Elements/Transformer";
import { Generation } from "./Elements/Generation";
import { Load } from "./Elements/Load";
import { TextBlock } from "./Elements/TextBlock";
import { Polyline } from "./Elements/Shapes/Polyline";
import { Polygon } from "./Elements/Shapes/Polygon";
import { Line } from "./Elements/Shapes/Line";
import { pathParse } from "../utils/Transform";
import { Path } from "./Elements/Shapes/Path";
import { Ellipse } from "./Elements/Shapes/Ellipse";

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


  removeElement(element) {
    const indexElement = this.elements.findIndex(x => x === element);
    this.elements = [...this.elements.slice(0, indexElement), ...this.elements.slice(indexElement + 1)];
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




    let elem = new Switch("S1", 0, new Point(300, 300), 500);
    elem.addTerminals();
    this.elements.push(elem);

    elem = new Switch("S2", 1, new Point(300, 500), 500);
    elem.addTerminals();
    this.elements.push(elem);

    elem = new Switch("S3", 1, new Point(300, 350), 500);
    elem.addTerminals();
    this.elements.push(elem);

    elem = new Generation("G1", new Point(800, 800), 110);
    elem.addTerminals();
    this.elements.push(elem);

    elem = new Load("G1", new Point(600, 800), 110);
    elem.addTerminals();
    this.elements.push(elem);

    let transformer = new Transformer("T1", new Point(810, 440), 500, 220);
    transformer.terminals[0] = terminal5_2;
    transformer.terminals[1] = terminal3_2;
    this.elements.push(transformer);

    elem = new TextBlock("New Text Block 1", new Point(1100, 200));
    elem.color = "#DC5CFF";
    elem.fontSize = 16;
    this.elements.push(elem);

    elem = new TextBlock("New Text Block 2", new Point(1100, 250));
    elem.color = "#FF00DD";
    elem.fontSize = 20;
    this.elements.push(elem);

    elem = new TextBlock("New Text Block 3", new Point(1100, 300));
    elem.color = "#00FFD5";
    elem.fontSize = 24;
    this.elements.push(elem);

    elem = new Polyline("Test Polyline", "#FF00FF", 3, "#6ac8ff70")
    elem.points.push(new Point(50, 20));
    elem.points.push(new Point(75, 100));
    elem.points.push(new Point(100, 50));
    elem.points.push(new Point(125, 100));
    elem.points.push(new Point(150, 20));
    this.elements.unshift(elem)

    elem = new Polygon("Test Polygon", "#FFFF00", 3, "#6ac8ff70")
    elem.points.push(new Point(50, 120));
    elem.points.push(new Point(75, 200));
    elem.points.push(new Point(100, 150));
    elem.points.push(new Point(125, 200));
    elem.points.push(new Point(150, 120));
    this.elements.unshift(elem)

    elem = new Line("Test Line", "#00FFFF", 3, "#ffffff0")
    elem.points.push(new Point(50, 250));
    elem.points.push(new Point(150, 250));
    this.elements.unshift(elem)


    // const startPoint = new Point(100, 400);

    // const p1 = new Point(10, 10);
    // const p2 = new Point(50, 50);
    // const control = new Point(100, -100);


    // elem = new Path("Test Path", startPoint, `M ${p1.x} ${p1.y} Q ${control.x} ${control.y} ${p2.x} ${p2.y}`, "#FFFFFF", 3, 0, "#FFFFFF");
    // elem.offset = startPoint;
    // this.elements.unshift(elem)


    // elem = new Ellipse("", new Point(startPoint.x + p1.x - 2, startPoint.y + p1.y - 2), new Point(4, 4), "blue", 3, "blue")
    // this.elements.unshift(elem)
    // elem = new Ellipse("", new Point(startPoint.x + p2.x - 2, startPoint.y + p2.y - 2), new Point(4, 4), "blue", 3, "blue")
    // this.elements.unshift(elem)
    // elem = new Ellipse("", new Point(startPoint.x + control.x - 2, startPoint.y + control.y - 2), new Point(4, 4), "red", 3, "red")
    // this.elements.unshift(elem)


  }



}