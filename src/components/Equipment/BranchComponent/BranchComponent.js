import React from "react";
import Polyline from "../../Shapes/Polyline/Polyline";
import Circle from "../../Shapes/Circle/Circle";
import config from "../../../config.json";

const BranchComponent = React.memo(({ points, name }) => {
	console.log(`render Branch - ${name}`)
	return (
		<>
			<Polyline points={points} stroke="darkred" strokeWidth={config.elements.branchStrokeWidth} />
			<Circle center={points[0]} radius={8} fill="white" stroke="black" strokeWidth={2} />
			<Circle center={points[points.length - 1]} radius={8} fill="white" stroke="black" strokeWidth={2} />
		</>
	);
})

export default BranchComponent;