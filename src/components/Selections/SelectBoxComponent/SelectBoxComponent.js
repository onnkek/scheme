import React from "react";
import { getRotateTransformPoints } from "../../../utils/Transform";
import Polygon from "../../Shapes/Polygon/Polygon";

const SelectBoxComponent = React.memo(({ box }) => {

  // console.log("Render select box")
  const { frame, angle, position, color, strokeDasharray } = box;
  return (
    <>
      <Polygon
        points={getRotateTransformPoints(frame, angle, position)}
        stroke={color}
        strokeWidth={1}
        strokeDasharray={strokeDasharray}
      />
      {box.controls.map(e => e.drawComponent())}
    </>
  );
})

export default SelectBoxComponent;