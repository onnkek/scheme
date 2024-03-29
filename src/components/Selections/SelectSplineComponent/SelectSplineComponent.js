import React from "react";
import PathComponent from "../../Shapes/PathComponent/PathComponent";
import { pathParse } from "../../../utils/Transform";
import { Point } from "../../../utils/Point";

const SelectSplineComponent = ({ box }) => {

  console.log(box.points[0])
  return (
    <>
      <PathComponent
        point={box.points[0]}
        path={pathParse(box.path)}
        fill="none"
        angle={0}
        stroke="Violet"
        strokeWidth={1}
        offset={new Point(0, 0)}
        opacity={1}
      />
      {box.controls.map(e => e.drawComponent())}
    </>
  );
}

export default SelectSplineComponent;