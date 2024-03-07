import React from "react";
import Rectangle from "../../Shapes/Rectangle/Rectangle";
import { config } from "../../../config"

const SquareControlComponent = ({ position }) => {

  return (
    <>
      <Rectangle
        x={position.x}
        y={position.y}
        width={config.editor.controls.squareControl.size3}
        height={config.editor.controls.squareControl.size3}
        stroke="white"
        strokeWidth={0}
        fill="white"
      />
      <Rectangle
        x={position.x}
        y={position.y}
        width={config.editor.controls.squareControl.size2}
        height={config.editor.controls.squareControl.size2}
        stroke="black"
        strokeWidth={0}
        fill="black"
      />
      <Rectangle
        x={position.x}
        y={position.y}
        width={config.editor.controls.squareControl.size1}
        height={config.editor.controls.squareControl.size1}
        stroke="black"
        strokeWidth={0}
        fill="white"
      />
    </>
  );
}

export default SquareControlComponent;