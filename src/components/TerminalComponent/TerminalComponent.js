import React from "react";
import Circle from "../Shapes/CircleComponent/CircleComponent";
import { config } from "../../config";

const TerminalComponent = ({ position, id, canConnect }) => {

  //console.log("render TerminalComponent")
  const color = canConnect ? "white" : "red";
  return (
    <>
      <Circle
        key={id}
        center={position}
        radius={config.elements.terminal.radius}
        fill={color}
        stroke="black"
        strokeWidth={config.elements.terminal.strokeWidth}
      />
    </>
  );
}

export default TerminalComponent;