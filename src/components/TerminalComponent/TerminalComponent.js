import React from "react";
import Circle from "../Shapes/Circle/Circle";
import { getRotateTransformPoint } from "../../utils/Transform";

const TerminalComponent = ({ position, id, canConnect, angle, point }) => {

  //console.log("render TerminalComponent")
  const color = canConnect ? "white" : "red";
  return (
    <>
      <Circle
        key={id}
        center={position}
        radius={5}
        fill={color}
        stroke="black"
        strokeWidth={1}
      />
    </>
  );
}

export default TerminalComponent;