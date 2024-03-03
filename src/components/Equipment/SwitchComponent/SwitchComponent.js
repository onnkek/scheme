import React from "react";
import Rectangle from "../../Shapes/Rectangle/Rectangle";
import config from "../../../config.json";

const SwitchComponent = React.memo(({ state, x, y }) => {


	console.log(`render switch`)
	let fill = state ? "darkred" : "none";
	return (
		<Rectangle x={x} y={y} width={config.elements.switchSize}
			height={config.elements.switchSize} stroke="darkred" strokeWidth={config.elements.switchStrokeWidth} fill={fill} />
	);
})

export default SwitchComponent;