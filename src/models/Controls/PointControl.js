import config from "../../config.json";
import Circle from "../../components/Shapes/Circle/Circle";
import { Point } from "../Point";
import { Control } from "./Control";


export class PointControl extends Control {

	drawComponent() {
		return (
			<Circle key={this.id} center={this.position} radius={config.editor.controls.pointControl.radius} fill="red" stroke="black" strokeWidth={1} />
		);
	}

	getFrame() {
		return [
			new Point(this.position.x - config.editor.controls.pointControl.radius, this.position.y - config.editor.controls.pointControl.radius),
			new Point(this.position.x + config.editor.controls.pointControl.radius, this.position.y - config.editor.controls.pointControl.radius),
			new Point(this.position.x + config.editor.controls.pointControl.radius, this.position.y + config.editor.controls.pointControl.radius),
			new Point(this.position.x - config.editor.controls.pointControl.radius, this.position.y + config.editor.controls.pointControl.radius)
		]
	}
}