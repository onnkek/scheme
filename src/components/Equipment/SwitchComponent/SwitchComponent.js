import React from "react";
import Rectangle from "../../Shapes/Rectangle/Rectangle";
import config from "../../../config.json";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";

const SwitchComponent = React.memo(({ state, x, y, isShowTerminals, terminals }) => {


	//console.log(`render switch`)
	let fill = state ? "darkred" : "none";
	return (
		<>
			<Rectangle
				x={x}
				y={y}
				width={config.elements.switchSize}
				height={config.elements.switchSize}
				stroke="darkred"
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