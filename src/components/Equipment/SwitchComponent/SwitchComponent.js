import React from "react";
import { config } from "../../../config";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";
import Polygon from "../../Shapes/Polygon/Polygon";
import { Point } from "../../../utils/Point";
import { getRotateTransformPoints } from "../../../utils/Transform";

const SwitchComponent = React.memo(({ state, x, y, isShowTerminals, terminals, voltageColor, angle, opacity }) => {

	console.log(`render switch`)
	// if(state === "null" || state === "false" || state ===)
	let fill = state ? voltageColor : "none";

	const polygon = [
		new Point(x - config.elements.switch.size / 2, y - config.elements.switch.size / 2),
		new Point(x + config.elements.switch.size / 2, y - config.elements.switch.size / 2),
		new Point(x + config.elements.switch.size / 2, y + config.elements.switch.size / 2),
		new Point(x - config.elements.switch.size / 2, y + config.elements.switch.size / 2)
	]
	return (
		<>
			<Polygon
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