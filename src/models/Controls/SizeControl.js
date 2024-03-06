import Polyline from "../../components/Shapes/Polyline/Polyline";
import config from "../../config.json";
import { getRotateTransform } from "../../tools/Transform";
import { Point } from "../../tools/Point";
import { Control } from "./Control";

export class SizeControl extends Control {

	static Types = { // enum
		Right: "Right",
		Left: "Left"
	}

	angle;
	type;

	constructor(angle, position, type) {
		super(position);
		this.angle = angle;
		this.type = type;
	}

	getPoints() {
		return [
			new Point(this.position.x - config.editor.selectControlPadding + config.editor.selectControlLength, this.position.y - config.editor.selectControlPadding),
			new Point(this.position.x - config.editor.selectControlPadding, this.position.y - config.editor.selectControlPadding),
			new Point(this.position.x - config.editor.selectControlPadding, this.position.y - config.editor.selectControlPadding + config.editor.selectControlLength)
		]
	}

	drawComponent() {
		return (
			<Polyline key={this.id} points={getRotateTransform(this.getPoints(), this.angle, this.position)} stroke="DodgerBlue" strokeWidth={4} />
		);
	}

	getFrame() {
		return [
			new Point(this.position.x - config.editor.selectControlPadding, this.position.y - config.editor.selectControlPadding),
			new Point(this.position.x - config.editor.selectControlPadding + config.editor.selectControlLength, this.position.y - config.editor.selectControlPadding),
			new Point(this.position.x - config.editor.selectControlPadding + config.editor.selectControlLength, this.position.y - config.editor.selectControlPadding + config.editor.selectControlLength),
			new Point(this.position.x - config.editor.selectControlPadding, this.position.y - config.editor.selectControlPadding + config.editor.selectControlLength)
		]
	}
}