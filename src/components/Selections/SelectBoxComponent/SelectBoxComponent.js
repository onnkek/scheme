import { Point } from "../../../utils/Point";
import { getRotateTransformPoint, getRotateTransformPoints } from "../../../utils/Transform";
import Circle from "../../Shapes/Circle/Circle";
import Polygon from "../../Shapes/Polygon/Polygon";
import Polyline from "../../Shapes/Polyline/Polyline";

const SelectBoxComponent = ({ box }) => {

  // console.log("Render select box")
  return (
    <>
      <Polygon
        points={getRotateTransformPoints(box.frame, box.angle, box.position)}
        stroke="magenta"
        strokeWidth={1}
      />
      {box.controls.map(e => e.drawComponent())}
      <Polyline
        points={getRotateTransformPoints([{ x: box.position.x, y: box.position.y - box.height / 2 }, { x: box.position.x, y: box.position.y - 60 }], box.angle, box.position)}
        stroke="magenta"
        strokeWidth={1}
      />
      <Circle
        center={getRotateTransformPoint(new Point(box.position.x, box.position.y - 60 - 5), box.angle, box.position)}
        radius={5}
        fill="none"
        stroke="magenta"
        strokeWidth={1}
      />
    </>
  );
}

export default SelectBoxComponent;