import { getPointsString } from "../../../utils/Point";

function Polyline({ points, stroke, strokeWidth }) {

  return (
    <polyline
      points={getPointsString(points)}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
    />
  );
}

export default Polyline;