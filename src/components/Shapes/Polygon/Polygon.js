import { getPointsString } from "../../../utils/Point";

function Polygon({ points, stroke, strokeWidth, strokeDasharray, fill = "none" }) {

  return (
    <polygon
      points={getPointsString(points)}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeDasharray={strokeDasharray}
    />
  );
}

export default Polygon;