import Polyline from "../components/Shapes/Polyline/Polyline";
import { Point } from "./Point";
import config from "../config.json";
import { getRotateTransform } from "../tools/Transform";

export class SizeControl {

	angle;
	position;

	constructor(angle, position) {
		this.angle = angle;
		this.position = position;
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
			<Polyline key={Math.random()} points={getRotateTransform(this.getPoints(), this.angle, this.position)} stroke="DodgerBlue" strokeWidth={4} />
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