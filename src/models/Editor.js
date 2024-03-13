import { Point } from "../utils/Point";
import { hitTestFrame, hitTestLine, hitTestPoint } from "../utils/hitTest";
import { PointControl } from "./Controls/PointControl";
import { SquareControl } from "./Controls/SquareControl";
import { Branch } from "./Elements/Branch";
import { Generation } from "./Elements/Generation";
import { Load } from "./Elements/Load";
import { Node } from "./Elements/Node";
import { Switch } from "./Elements/Switch";
import { Terminal } from "./Elements/Terminal";
import { Transformer } from "./Elements/Transformer";
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
		Connect: "Connect",
		AddBranch: "AddBranch",
		AddElement: "AddElement"
	}
	static AddModes = {
		Node: "Node",
		Switch: "Switch",
		Transformer: "Transformer",
		Load: "Load",
		Generation: "Generation"
	}
	mode;
	addMode;
	lastCursor;
	select;
	selectControl;
	connectNode;
	connectTerminal;
	connectElement;
	newElement;
	button; // rework in future
	scheme;
	selectLayer;

	constructor () {
		this.mode = Editor.Modes.Default;
		this.lastCursor = new Point(0, 0);
		this.selectLayer = new SelectLayer();
		this.scheme = new Scheme();
	}

	addElement(addMode, cursor) {
		let newElement = null;
		let cursorGrid = new Point(Math.round(cursor.x / 10) * 10, Math.round(cursor.y / 10) * 10);
		switch (addMode) {
			case Editor.AddModes.Node:
				newElement = new Node("1", 1, cursorGrid, 100, 100, 500);
				break;
			case Editor.AddModes.Switch:
				newElement = new Switch("S1", false, cursorGrid, 500);
				break;
			case Editor.AddModes.Transformer:
				newElement = new Transformer("T1", cursorGrid, 500, 220);
				break;
			case Editor.AddModes.Load:
				newElement = new Load("G1", cursorGrid, 110);
				break;
			case Editor.AddModes.Generation:
				newElement = new Generation("G1", cursorGrid, 110);
				break;
			default:

				break;
		}
		this.scheme.elements.push(newElement);
		this.select = newElement;
		this.mode = Editor.Modes.AddElement;
		this.addMode = addMode;
	}

	hideTerminals() {
		for (let i = 0; i < this.scheme.elements.length; i++) {
			this.scheme.elements[i].isShowTerminals = false;
		}
	}

	connect(cursor, delta) {
		let elems = this.scheme.elements.filter(x => !(x instanceof Branch));

		for (let i = 0; i < elems.length; i++) {
			if (hitTestFrame(elems[i].getFrame(), cursor, 50)) {
				elems[i].isShowTerminals = true;
			} else {
				elems[i].isShowTerminals = false;
			}
		}

		for (let i = 0; i < elems.length; i++) {
			if (elems[i] instanceof Node) {
				if (hitTestLine(
					new Point(elems[i].position.x - elems[i].widthLeft, elems[i].position.y),
					new Point(elems[i].position.x + elems[i].widthRight, elems[i].position.y),
					cursor, 10)) {
					this.connectNode = elems[i];
					break;

				} else {
					this.connectNode = null;
				}
			} else {

			}
		}
		this.connectToNode(cursor, delta);

		if (!this.connectNode) {
			let elements = elems.filter(x => !(x instanceof Node));
			let newTerminal = null;
			let newElement = null;
			for (let i = 0; i < elements.length; i++) {
				let isBreak = 0;
				for (let j = 0; j < elements[i].terminals.length; j++) {
					if (hitTestPoint(elements[i].terminals[j].position, cursor, 10)) {
						newElement = elements[i];
						newTerminal = elements[i].terminals[j];
						isBreak = 1;
						break;
					} else {
						newElement = null;
						newTerminal = null;
					}
				}
				if (isBreak) {
					break;
				}
			}
			const controlIndex = this.selectLayer.box.controls.filter(x => x instanceof PointControl).findIndex(x => x === this.selectControl);
			if (this.connectTerminal) {
				if (this.connectTerminal.canConnect) {
					this.select.terminals[controlIndex] = this.connectTerminal;
					this.connectTerminal.canConnect = false;
				}
				this.connectElement.terminals = [...this.connectElement.terminals];
			}
			if (this.connectTerminal !== newTerminal || this.connectElement !== newElement) {
				let element = elems.find(x => x.terminals.find(x => x === this.connectTerminal));
				if (element) {
					let terminal = element.terminals.find(x => x === this.connectTerminal);
					terminal.canConnect = true;
				}
				this.select.junctions[controlIndex] = new Terminal("Терминал " + Math.random(), cursor);
				this.select.terminals[controlIndex] = null;
				this.connectTerminal = newTerminal;
				this.connectElement = newElement;
			}
		}




		if (this.select && this.selectControl) {
			let indexOfPoint = this.selectLayer.box.controls.findIndex(x => x === this.selectControl);

			if (indexOfPoint === 0) {
				this.select.junctions[0].position = new Point(Math.round(cursor.x / 10) * 10, Math.round(cursor.y / 10) * 10)
			} else if (indexOfPoint === this.selectLayer.box.controls.length - 1) {
				this.select.junctions[1].position = new Point(Math.round(cursor.x / 10) * 10, Math.round(cursor.y / 10) * 10)
			} else {
				this.select.points = [...this.select.points.slice(0, indexOfPoint - 1),
				new Point(Math.round(cursor.x / 10) * 10, Math.round(cursor.y / 10) * 10), ...this.select.points.slice(indexOfPoint)]
			}
		}
		if (this.mode === Editor.Modes.Connect) {
			this.selectLayer.box.frame = this.select.getFrame();
			this.selectLayer.box.initSelectLine();
			this.selectLayer.box.updateControls();
		}

	}


	connectToNode(cursor, delta) {
		const pointControls = this.selectLayer.box.controls.filter(x => x instanceof PointControl);
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
						let terminal = this.connectNode.addTerminal(Math.round(cursor.x / 10) * 10);
						this.select.terminals[i] = terminal;
					}
				}
			}

		} else { // remove terminal at node
			for (let i = 0; i < pointControls.length; i++) {
				if (this.select.terminals[i] && this.selectControl === pointControls[i]) {
					const nodes = this.scheme.elements.filter(x => x instanceof Node);
					let nodeIndex = nodes.findIndex(x => x.terminals.find(x => x.id === this.select.terminals[i].id));
					if (nodeIndex !== -1) {
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
	removeNodeTerminals() {
		for (let i = 0; i < this.select.terminals.length; i++) {
			if (this.select.terminals[i]) {
				const elements = this.scheme.elements.filter(x => !(x instanceof Branch));
				const elementIndex = elements.findIndex(x => x.terminals.find(x => x.id === this.select.terminals[i].id));
				if (elements[elementIndex] instanceof Node) {
					elements[elementIndex].removeTerminal(this.select.terminals[i]);
				} else {
					this.select.terminals[i].canConnect = true;
				}
			}
		}
	}
	removeElement() {
		const index = this.scheme.elements.findIndex(x => x.id === this.select.id);
		if (this.select instanceof Branch) {
			this.removeNodeTerminals();
		} else {

			for (let i = 0; i < this.scheme.elements[index].terminals.length; i++) {
				const branches = this.scheme.elements.filter(x => x instanceof Branch);
				const branch = branches.find(x => x.terminals.find(x => x === this.scheme.elements[index].terminals[i]));
				if (branch) {
					const terminalIndex = branch.terminals.findIndex(x => x === this.scheme.elements[index].terminals[i]);

					branch.junctions[terminalIndex].position = branch.terminals[terminalIndex].position;
					branch.terminals[terminalIndex] = null;
				}

			}
		}

		this.scheme.elements = [...this.scheme.elements.slice(0, index), ...this.scheme.elements.slice(index + 1)];
		this.mode = Editor.Modes.Default;
		this.select = null;
		this.selectLayer = new SelectLayer();
	}
	removeBranchPoint() {
		let indexOfPoint = this.selectLayer.box.controls.filter(x => x instanceof SquareControl).findIndex(x => x === this.selectControl);
		this.select.points = [...this.select.points.slice(0, indexOfPoint),
		...this.select.points.slice(indexOfPoint + 1)]
		this.mode = Editor.Modes.Select;
		this.selectLayer.select(this.select);
	}
	onAddBranchMode() {
		this.mode = Editor.Modes.AddBranch;
		const newBranch = this.scheme.createBranch();
		this.selectLayer.select(newBranch);
		this.select = newBranch;
		this.selectControl = this.selectLayer.box.controls[0];
	}
}