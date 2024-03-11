import { Point } from "../utils/Point";
import { hitTestFrame, hitTestLine, hitTestPoint } from "../utils/hitTest";
import { PointControl } from "./Controls/PointControl";
import { Branch } from "./Elements/Branch";
import { Node } from "./Elements/Node";
import { Terminal } from "./Elements/Terminal";
import { Scheme } from "./Scheme";
import { SelectLayer } from "./SelectLayer";

export class Editor {
	static Modes = { // enum
		Default: "Default",
		Select: "Select",
		Move: "Move",
		Edit: "Edit",
		EditBranch: "EditBranch",
		ContextMenu: "ContextMenu",
		Connect: "Connect"
	}
	mode;
	lastCursor;
	select;
	selectControl;
	connectNode;
	connectTerminal;
	newElement;
	button; // rework in future
	scheme;
	selectLayer;

	constructor() {
		this.mode = Editor.Modes.Default;
		this.lastCursor = new Point(0, 0);
		this.selectLayer = new SelectLayer();
		this.scheme = new Scheme();
	}



	connect(cursor, delta) {
		let elems = this.scheme.elements.filter(x => !(x instanceof Branch));
		//console.log(editor.connectTerminal)
		for (let i = 0; i < elems.length; i++) {
			if (hitTestFrame(elems[i].getFrame(), cursor, 50)) {
				elems[i].isShowTerminals = true;

				if (elems[i] instanceof Node) {
					if (hitTestLine(
						new Point(elems[i].position.x - elems[i].widthLeft, elems[i].position.y),
						new Point(elems[i].position.x + elems[i].widthRight, elems[i].position.y),
						cursor, 20)) {
						this.connectNode = elems[i];

					} else {
						this.connectNode = null;
					}
					this.connectToNode(cursor, delta);

				} else { // not node element

					let terminal = null;
					for (let j = 0; j < elems[i].terminals.length; j++) {
						let findTerminal = hitTestPoint(elems[i].terminals[j].position, cursor, 10);
						if (findTerminal) {
							terminal = elems[i].terminals[j];
						}
					}

					const pointControls = this.selectLayer.box.controls.filter(x => x instanceof PointControl);
					for (let i = 0; i < pointControls.length; i++) {

						if (this.selectControl === pointControls[i]) {
							if (terminal) {
								if (terminal.canConnect) {
									this.select.terminals[i] = terminal;
									terminal.canConnect = false;
								}
							} else {

								if (this.select.terminals[i]) {
									let element = this.scheme.elements.find(x => x.terminals.find(x => x === this.select.terminals[i]));
									if (element) {
										let terminal = element.terminals.find(x => x === this.select.terminals[i]);
										terminal.canConnect = true;
									}
									this.select.junctions[i] = new Terminal("Терминал " + Math.random(), cursor);
									this.select.terminals[i] = null;
								}
							}
						}
					}
				}
			}
			else {
				elems[i].isShowTerminals = false;
			}

		}
		if (this.select && this.selectControl) {
			let indexOfPoint = this.selectLayer.box.controls.findIndex(x => x === this.selectControl);

			if (indexOfPoint === 0) {
				this.select.junctions[0].position = cursor;
			} else if (indexOfPoint === this.selectLayer.box.controls.length - 1) {
				this.select.junctions[1].position = cursor;
			} else {
				this.select.points = [...this.select.points.slice(0, indexOfPoint - 1),
					cursor, ...this.select.points.slice(indexOfPoint)]
			}
		}
		if (!this.button || this.selectLayer.box.controls[1] === this.selectControl) {
			this.selectLayer.box.frame = this.select.getFrame();
			this.selectLayer.box.initSelectLine();
			this.selectLayer.box.updateControls();
		}
	}

	connectToNode(cursor, delta) {
		const pointControls = this.selectLayer.box.controls.filter(x => x instanceof PointControl);
		console.log(this.connectNode)
		if (this.connectNode) {
			let indexOfPoint = this.selectLayer.box.controls.findIndex(x => x === this.selectControl);

			let indexOfBranch = this.scheme.elements.findIndex(x => x === this.select);
			let newPoint = new Point(this.scheme.elements[indexOfBranch].getFrame()[indexOfPoint].x + delta.x, //points
				this.connectNode.position.y);

			for (let i = 0; i < pointControls.length; i++) {
				if (this.selectControl === pointControls[i]) {
					if (this.select.terminals[i]) {
						this.scheme.changeTerminalPosition(this.select.terminals[i], newPoint)
					} else {
						let terminal = this.connectNode.addTerminal(cursor.x);
						this.select.terminals[i] = terminal;
					}
				}
			}

		} else { // remove terminal at node
			console.log("REMOVE TERMINAL NODE")
			console.log(this.connectNode)
			for (let i = 0; i < pointControls.length; i++) {
				if (this.select.terminals[i] && this.selectControl === pointControls[i]) {
					const nodes = this.scheme.elements.filter(x => x instanceof Node);
					let nodeIndex = nodes.findIndex(x => x.terminals.find(x => x.id === this.select.terminals[i].id));

					const index = nodes[nodeIndex].terminals.findIndex(x => x.id === this.select.terminals[i].id);

					nodes[nodeIndex].terminals = [
						...nodes[nodeIndex].terminals.slice(0, index),
						...nodes[nodeIndex].terminals.slice(index + 1)
					]
					this.select.junctions[i] = new Terminal("Терминал " + Math.random(), cursor);
					this.select.terminals[i] = null;
				}
			}
		}
	}
}