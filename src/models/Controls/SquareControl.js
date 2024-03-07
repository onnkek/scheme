import SquareControlComponent from "../../components/Controls/SquareControlComponent/SquareControlComponent";
import { config } from "../../config";
import { Point } from "../../utils/Point";
import { Control } from "./Control";

export class SquareControl extends Control {

	drawComponent() {
		return (<SquareControlComponent key={this.id} position={this.position} />);
	}

	getFrame() {
		return [
			new Point(this.position.x - config.editor.controls.squareControl.size3, this.position.y - config.editor.controls.squareControl.size3),
			new Point(this.position.x + config.editor.controls.squareControl.size3, this.position.y - config.editor.controls.squareControl.size3),
			new Point(this.position.x + config.editor.controls.squareControl.size3, this.position.y + config.editor.controls.squareControl.size3),
			new Point(this.position.x - config.editor.controls.squareControl.size3, this.position.y + config.editor.controls.squareControl.size3)
		]
	}
}