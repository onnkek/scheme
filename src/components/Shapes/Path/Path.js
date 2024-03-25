import { Point } from "../../../utils/Point";
import { getRotateTransformPoint } from "../../../utils/Transform";

function Path({ point, path, stroke, strokeWidth, angle, fill = "none", offset, opacity = 1 }) {

  let stringPath = "";
  for (let i = 0; i < path.length; i++) {
    if (path[i].type !== "") {
      const rotatePoint = getRotateTransformPoint(new Point(Number(path[i].x) + offset.x, Number(path[i].y) + offset.y), angle, point);

      stringPath += `${path[i].type} ${rotatePoint.x} ${rotatePoint.y} `;
    } else {
      const rotatePoint = getRotateTransformPoint(new Point(Number(path[i].x) + offset.x, Number(path[i].y) + offset.y), angle, point);
      stringPath += `${rotatePoint.x} ${rotatePoint.y} `;
    }
  }
  return (
    <path
      d={stringPath}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      opacity={opacity}
    />
  );
}

export default Path;