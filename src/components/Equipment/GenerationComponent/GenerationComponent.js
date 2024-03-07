import React from "react";
import { config } from "../../../config";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";
import Circle from "../../Shapes/Circle/Circle";
import { Point } from "../../../tools/Point";

const GenerationComponent = React.memo(({ x, y, isShowTerminals, terminals, voltageColor }) => {


  // console.log(`render generation`)
  return (
    <>
      <Circle
        center={new Point(x, y)}
        radius={config.elements.generation.radius}
        fill="none"
        stroke={voltageColor}
        strokeWidth={config.elements.generation.strokeWidth}
      />
      <path d={config.elements.generation.path} stroke={voltageColor} fill="none" />

      {isShowTerminals ? terminals.map((terminal) =>
        <TerminalComponent
          canConnect={terminal.canConnect}
          position={terminal.position}
          key={terminal.id}
        />) : <></>}
    </>

  );
})

export default GenerationComponent;