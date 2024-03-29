import React from "react";
import { config } from "../../../config";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";
import PolygonComponent from "../../Shapes/PolygonComponent/PolygonComponent";
import { Point } from "../../../utils/Point";
import { getRotateTransformPoints } from "../../../utils/Transform";

const SwitchComponent = React.memo(({ state, x, y, isShowTerminals, terminals, voltageColor, angle, opacity }) => {

	//console.log(`render switch`)
	let fill = state ? voltageColor : "none";

	const polygon = [
		new Point(x - config.elements.switch.size / 2, y - config.elements.switch.size / 2),
		new Point(x + config.elements.switch.size / 2, y - config.elements.switch.size / 2),
		new Point(x + config.elements.switch.size / 2, y + config.elements.switch.size / 2),
		new Point(x - config.elements.switch.size / 2, y + config.elements.switch.size / 2)
	]
	return (
		<>
			<PolygonComponent
				points={getRotateTransformPoints(polygon, angle, new Point(x, y))}
				stroke={voltageColor}
				strokeWidth={config.elements.switch.strokeWidth}
				fill={fill}
				opacity={opacity}
			/>
			{isShowTerminals ? terminals.map((terminal) =>
				<TerminalComponent
					canConnect={terminal.canConnect}
					position={terminal.position}
					key={terminal.id}
					opacity={opacity}
				/>) : <></>}
		</>

	);
})

export default SwitchComponent;