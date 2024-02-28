import React from "react";
import Circle from "../Shapes/Circle/Circle";
import Polyline from "../Shapes/Polyline/Polyline";

const Branch = React.memo((props) => {
	console.log("render Branch")
	return (
		<>
			<Polyline points={props.points} stroke="red" strokeWidth={4} />
			<Circle center={props.points[0].coordinates} radius={8} fill="white" />
			<Circle center={props.points[props.points.length - 1].coordinates} radius={8} fill="white" />
		</>
	);
})

export default Branch;