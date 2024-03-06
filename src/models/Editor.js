import { Point } from "../tools/Point";

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


	constructor() {
		this.mode = Editor.Modes.Default;
		this.lastCursor = new Point(0, 0);
	}


}