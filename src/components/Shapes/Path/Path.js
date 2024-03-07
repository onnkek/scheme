import { Point } from "../../../utils/Point";
import { getRotateTransformPoint } from "../../../utils/Transform";

function Path({ point, path, stroke, strokeWidth, angle }) {

  let stringPath = "";
  for (let i = 0; i < path.length; i++) {
    if (path[i].type !== "") {
      const rotatePoint = getRotateTransformPoint(new Point(Number(path[i].x) + point.x, Number(path[i].y) + point.y), angle, point);

      stringPath += `${path[i].type} ${rotatePoint.x} ${rotatePoint.y} `;
    } else {
      const rotatePoint = getRotateTransformPoint(new Point(Number(path[i].x) + point.x, Number(path[i].y) + point.y), angle, point);
      stringPath += `${rotatePoint.x} ${rotatePoint.y} `;
    }
  }
  return (
    <path
      d={stringPath}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
    />
  );
}

export default Path;