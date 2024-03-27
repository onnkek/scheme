import { getPointsString } from "../../../utils/Point";

function PolylineComponent({ points, stroke, strokeWidth, opacity = 1, fill = "none" }) {

  return (
    <polyline
      points={getPointsString(points)}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      opacity={opacity}
    />
  );
}

export default PolylineComponent;