import React from "react";
import Polyline from "../../Shapes/Polyline/Polyline";

const SelectLineComponent = ({ box }) => {

  console.log("render SelectLineComponent")
  return (
    <>
      <Polyline key={Math.random()} points={box.points} stroke="Violet" strokeWidth={1} />
      {box.controls.map(e => e.drawComponent())}
    </>
  );
}

export default SelectLineComponent;