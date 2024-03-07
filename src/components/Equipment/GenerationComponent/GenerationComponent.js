import React from "react";
import { config } from "../../../config";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";
import Circle from "../../Shapes/Circle/Circle";
import { Point } from "../../../utils/Point";
import Path from "../../Shapes/Path/Path";

const GenerationComponent = React.memo(({ x, y, isShowTerminals, terminals, voltageColor, angle }) => {


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
      <Path
        point={new Point(x, y)}
        path={config.elements.generation.path}
        stroke={voltageColor}
        fill="none"
        strokeWidth={config.elements.generation.strokeWidth}
        pos={new Point(x, y)}
        angle={angle}
      />

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