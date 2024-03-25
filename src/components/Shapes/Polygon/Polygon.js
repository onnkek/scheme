import { getPointsString } from "../../../utils/Point";

function Polygon({ points, stroke, strokeWidth, strokeDasharray, fill = "none", opacity = 1 }) {

  return (
    <polygon
      points={getPointsString(points)}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeDasharray={strokeDasharray}
      opacity={opacity}
    />
  );
}

export default Polygon;