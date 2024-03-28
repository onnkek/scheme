import CircleComponent from "../../components/Shapes/CircleComponent/CircleComponent";
import { config } from "../../config";
import { Point } from "../../utils/Point";
import { Control } from "./Control";


export class PointControl extends Control {

	drawComponent() {
		return (
			<CircleComponent
				key={this.id}
				center={this.position}
				radius={config.editor.controls.pointControl.radius}
				fill="red"
				stroke="black"
				strokeWidth={config.editor.controls.pointControl.strokeWidth}
			/>
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