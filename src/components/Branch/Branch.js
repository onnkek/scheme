import Circle from "../Shapes/Circle/Circle";
import Line from "../Shapes/Line/Line";
import Polyline from "../Shapes/Polyline/Polyline";
import Text from "../Shapes/Text/Text";

function Branch(props) {

	return (
		<>
			<Polyline points={props.points} stroke="red" strokeWidth={4} />
			<Circle center={props.points[0].coordinates} radius={8} fill="white" />
			<Circle center={props.points[props.points.length - 1].coordinates} radius={8} fill="white" />
		</>
	);
}

export default Branch;