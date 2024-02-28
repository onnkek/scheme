import React from "react";
import Circle from "../Shapes/Circle/Circle";
import Polyline from "../Shapes/Polyline/Polyline";

const Branch = React.memo((props) => {
	console.log("render Branch")
	return (
		<>
			<Polyline points={props.points} stroke="darkred" strokeWidth={6} />
			<Circle center={props.points[0].coordinates} radius={8} fill="white" stroke="black" strokeWidth={2} />
			<Circle center={props.points[props.points.length - 1].coordinates} radius={8} fill="white" stroke="black" strokeWidth={2}/>
		</>
	);
})

export default Branch;