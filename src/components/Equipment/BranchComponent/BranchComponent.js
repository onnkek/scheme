import React from "react";
import Polyline from "../../Shapes/Polyline/Polyline";
import Circle from "../../Shapes/Circle/Circle";

const BranchComponent = React.memo(({ points, name }) => {
	console.log(`render Branch - ${name}`)
	return (
		<>
			<Polyline points={points} stroke="darkred" strokeWidth={6} />
			<Circle center={points[0]} radius={8} fill="white" stroke="black" strokeWidth={2} />
			<Circle center={points[points.length - 1]} radius={8} fill="white" stroke="black" strokeWidth={2} />
		</>
	);
})

export default BranchComponent;