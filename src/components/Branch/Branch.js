import React from "react";
import Circle from "../Shapes/Circle/Circle";
import Polyline from "../Shapes/Polyline/Polyline";

const Branch = React.memo(({ points, name }) => {
	console.log(`render Branch - ${name}`)
	return (
		<>
			<Polyline points={points} stroke="darkred" strokeWidth={6} />
			<Circle center={points[0].coordinates} radius={8} fill="white" stroke="black" strokeWidth={2} />
			<Circle center={points[points.length - 1].coordinates} radius={8} fill="white" stroke="black" strokeWidth={2} />
		</>
	);
})

export default Branch;