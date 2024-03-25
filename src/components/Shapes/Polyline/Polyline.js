import { getPointsString } from "../../../utils/Point";

function Polyline({ points, stroke, strokeWidth, opacity = 1 }) {

  return (
    <polyline
      points={getPointsString(points)}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      opacity={opacity}
    />
  );
}

export default Polyline;