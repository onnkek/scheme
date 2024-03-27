import React from "react";
import Polyline from "../../Shapes/PolylineComponent/PolylineComponent";

const SelectLineComponent = ({ box }) => {
  return (
    <>
      <Polyline
        key={Math.random()}
        points={box.points}
        stroke="Violet"
        strokeWidth={1}
      />
      {box.controls.map(e => e.drawComponent())}
    </>
  );
}

export default SelectLineComponent;