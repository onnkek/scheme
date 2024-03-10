import React from "react";
import Polyline from "../../Shapes/Polyline/Polyline";
import { config } from "../../../config";
import "./BranchComponent.css"

const BranchComponent = React.memo(({ points, voltageColor }) => {
	//console.log(`render Branch - ${name}`)
	return (
		<>
			<Polyline
				points={points}
				stroke={voltageColor}
				strokeWidth={config.elements.branch.strokeWidth}
			/>
		</>
	);
})

export default BranchComponent;