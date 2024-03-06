import React from "react";
import { Point } from "../../tools/Point";
import Polyline from "../Shapes/Polyline/Polyline";
import Circle from "../Shapes/Circle/Circle";

const TerminalComponent = ({ position, id, canConnect }) => {

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