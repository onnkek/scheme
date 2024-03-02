import { Point } from "./Point";

export class Editor {
	static Modes = { // enum
		Default: "Default",
		Select: "Select",
		Move: "Move",
		Edit: "Edit",
		EditBranch: "EditBranch"
	}
	mode;
	lastCursor;
	select;
	selectControl;


	constructor() {
		this.mode = Editor.Modes.Default;
		this.lastCursor = new Point(0, 0);
	}


}