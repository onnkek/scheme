import React from "react";
import PolylineComponent from "../../Shapes/PolylineComponent/PolylineComponent";
import { config } from "../../../config";
import "./BranchComponent.css"

const BranchComponent = React.memo(({ points, voltageColor, opacity }) => {
	//console.log(`render Branch - ${name}`)
	return (
		<>
			<PolylineComponent
				points={points}
				stroke={voltageColor}
				strokeWidth={config.elements.branch.strokeWidth}
				opacity={opacity}
			/>
		</>
	);
})

export default BranchComponent;