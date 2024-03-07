import { getPointsString } from "../../../utils/Point";

function Polygon({ points, stroke, strokeWidth, fill = "none" }) {

  return (
    <polygon
      points={getPointsString(points)}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
}

export default Polygon;