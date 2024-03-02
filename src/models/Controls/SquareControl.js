import Rectangle from "../../components/Shapes/Rectangle/Rectangle";
import config from "../../config.json";
import { Point } from "../Point";
import { Control } from "./Control";

export class SquareControl extends Control {

	drawComponent() {
		return (
			<>
				<Rectangle key={this.id + 0.1} x={this.position.x} y={this.position.y} width={config.editor.controls.squareControl.size3} height={config.editor.controls.squareControl.size3} stroke="white" strokeWidth={0} fill="white" />
				<Rectangle key={this.id + 0.2} x={this.position.x} y={this.position.y} width={config.editor.controls.squareControl.size2} height={config.editor.controls.squareControl.size2} stroke="black" strokeWidth={0} fill="black" />
				<Rectangle key={this.id + 0.3} x={this.position.x} y={this.position.y} width={config.editor.controls.squareControl.size1} height={config.editor.controls.squareControl.size1} stroke="black" strokeWidth={0} fill="white" />
			</>
		);
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