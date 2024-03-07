import React from "react";
import Polyline from "../../Shapes/Polyline/Polyline";
import Circle from "../../Shapes/Circle/Circle";
import { config } from "../../../config";

const BranchComponent = React.memo(({ points, name, terminals, voltageColor }) => {
	//console.log(`render Branch - ${name}`)
	return (
		<>
			<Polyline
				points={points}
				stroke={voltageColor}
				strokeWidth={config.elements.branchStrokeWidth}
			/>

			{/* {terminals.length === 0 ?
				<>
					<Circle
						center={points[0]}
						radius={6}
						fill="red"
						stroke="black"
						strokeWidth={1}
					/>
					<Circle
						center={points[points.length - 1]}
						radius={6}
						fill="red"
						stroke="black"
						strokeWidth={1}
					/>
				</>
				: <></>}

			{terminals.length === 1 ?
				<>
					<Circle
						center={points[0]}
						radius={8}
						fill="white"
						stroke="black"
						strokeWidth={2}
					/>
					<Circle
						center={points[0]}
						radius={4}
						fill="red"
						stroke="black"
						strokeWidth={2}
					/>
				</>
				: <></>}

			{terminals.length === 2 ?
				<Circle
					center={points[points.length - 1]}
					radius={8}
					fill="white"
					stroke="black"
					strokeWidth={2}
				/> : <></>} */}
		</>
	);
})

export default BranchComponent;