import { getRotateTransformPoints } from "../../../utils/Transform";
import Polygon from "../../Shapes/Polygon/Polygon";

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
    </>
  );
}

export default SelectBoxComponent;