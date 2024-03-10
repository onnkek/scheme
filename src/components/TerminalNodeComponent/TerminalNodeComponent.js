import React from "react";
import Line from "../Shapes/Line/Line";

const TerminalNodeComponent = ({ position, widthLeft, widthRight, canConnect }) => {

  //console.log("render TerminalComponent")
  const color = canConnect ? "lime" : "red";

  return (
    <>
      <Line
        p1={{ x: position.x - widthLeft, y: position.y }}
        p2={{ x: position.x + widthRight, y: position.y }}
        stroke="black"
        strokeWidth={8}
      />
      <Line
        p1={{ x: position.x - widthLeft, y: position.y }}
        p2={{ x: position.x + widthRight, y: position.y }}
        stroke={color}
        strokeWidth={6}
      />
    </>
  );
}

export default TerminalNodeComponent;