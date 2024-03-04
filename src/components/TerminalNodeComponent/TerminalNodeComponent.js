import React from "react";
import Line from "../Shapes/Line/Line";

const TerminalNodeComponent = ({ position, id, widthLeft, widthRight }) => {

  console.log("render TerminalComponent")
  return (
    <>
      <Line p1={{ x: position.x - widthLeft, y: position.y }} p2={{ x: position.x + widthRight, y: position.y }} stroke="black"
        strokeWidth={8} />
      <Line p1={{ x: position.x - widthLeft, y: position.y }} p2={{ x: position.x + widthRight, y: position.y }} stroke="red"
        strokeWidth={6} />
    </>
  );
}

export default TerminalNodeComponent;