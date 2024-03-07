import React from "react";
import { config } from "../../../config";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";
import Circle from "../../Shapes/Circle/Circle";
import { Point } from "../../../tools/Point";
import Path from "../../Shapes/Path/Path";
import Polyline from "../../Shapes/Polyline/Polyline";

const LoadComponent = React.memo(({ x, y, isShowTerminals, terminals, voltageColor }) => {


  // console.log(`render load`)
  return (
    <>
      <Polyline
        points={[{ x: x - config.elements.load.widthArrow / 2, y: y - config.elements.load.heightArrow }, { x: x, y: y }, { x: x + config.elements.load.widthArrow / 2, y: y - config.elements.load.heightArrow }]}
        stroke={voltageColor}
        strokeWidth={config.elements.branchStrokeWidth}
      />
      <Polyline
        points={[{ x: x, y: y - config.elements.load.height }, { x: x, y: y }]}
        stroke={voltageColor}
        strokeWidth={config.elements.branchStrokeWidth}
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

export default LoadComponent;