import Polyline from "../../components/Shapes/Polyline/Polyline";
import { config } from "../../config";
import { getRotateTransformPoints } from "../../utils/Transform";
import { Point } from "../../utils/Point";
import { Control } from "./Control";

export class SizeControl extends Control {

	static Types = { // enum
		RightTop: "RightTop",
		RightBottom: "RightBottom",
		LeftTop: "LeftTop",
		LeftBottom: "LeftBottom"
	}

	angleRelativePosition;
	angleRelativePoint;
	point;
	type;

	constructor(angleRelativePosition, angleRelativePoint, point, position, type) {
		super(position);
		this.angleRelativePosition = angleRelativePosition;
		this.angleRelativePoint = angleRelativePoint;
		this.type = type;
		this.point = point;
	}

	getPoints() {
		let startPoints = [
			new Point(this.position.x - config.editor.selectControlPadding + config.editor.selectControlLength, this.position.y - config.editor.selectControlPadding),
			new Point(this.position.x - config.editor.selectControlPadding, this.position.y - config.editor.selectControlPadding),
			new Point(this.position.x - config.editor.selectControlPadding, this.position.y - config.editor.selectControlPadding + config.editor.selectControlLength)
		];
		let rotateRelativePosition = getRotateTransformPoints(startPoints, this.angleRelativePosition, this.position);
		return getRotateTransformPoints(rotateRelativePosition, this.angleRelativePoint, this.point);
	}

	drawComponent() {
		return (
			<Polyline
				key={this.id}
				points={this.getPoints()}
				stroke="DodgerBlue"
				strokeWidth={4}
			/>

		);
	}

	getFrame() {
		return this.getPoints();
	}
}