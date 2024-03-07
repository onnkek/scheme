import React from "react";
import Rectangle from "../../Shapes/Rectangle/Rectangle";
import { config } from "../../../config";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";
import Polygon from "../../Shapes/Polygon/Polygon";
import { Point, getPointsString } from "../../../utils/Point";
import { getRotateTransformPoints } from "../../../utils/Transform";

const SwitchComponent = React.memo(({ state, x, y, isShowTerminals, terminals, voltageColor, angle }) => {


	//console.log(`render switch`)
	let fill = state ? voltageColor : "none";

	const polygon = [
		new Point(x - config.elements.switchSize / 2, y - config.elements.switchSize / 2),
		new Point(x + config.elements.switchSize / 2, y - config.elements.switchSize / 2),
		new Point(x + config.elements.switchSize / 2, y + config.elements.switchSize / 2),
		new Point(x - config.elements.switchSize / 2, y + config.elements.switchSize / 2)
	]
	return (
		<> 
			<Polygon
				points={getRotateTransformPoints(polygon, angle, new Point(x, y))}
				stroke={voltageColor}
				strokeWidth={config.elements.switchStrokeWidth}
				fill={fill}
			/>
			{isShowTerminals ? terminals.map((terminal) =>
				<TerminalComponent
					canConnect={terminal.canConnect}
					position={terminal.position}
					key={terminal.id}
				/>) : <></>}
		</>

	);
})

export default SwitchComponent;