import React from "react";
import { config } from "../../../config";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";
import Polyline from "../../Shapes/PolylineComponent/PolylineComponent";
import { getRotateTransformPoints } from "../../../utils/Transform";
import { Point } from "../../../utils/Point";

const LoadComponent = React.memo(({ x, y, isShowTerminals, terminals, voltageColor, angle, opacity }) => {


  // console.log(`render load`)
  const polyline1 = [
    {
      x: x - config.elements.load.widthArrow / 2,
      y: y - config.elements.load.heightArrow + config.elements.load.height / 2
    },
    {
      x: x,
      y: y + config.elements.load.height / 2
    },
    {
      x: x + config.elements.load.widthArrow / 2,
      y: y - config.elements.load.heightArrow + config.elements.load.height / 2
    }
  ]
  const polyline2 = [
    {
      x: x,
      y: y - config.elements.load.height / 2
    },
    {
      x: x,
      y: y + config.elements.load.height / 2
    }
  ]



  return (
    <>
      <Polyline
        points={getRotateTransformPoints(polyline1, angle, new Point(x, y))}
        stroke={voltageColor}
        strokeWidth={config.elements.load.strokeWidth}
        opacity={opacity}
      />
      <Polyline
        points={getRotateTransformPoints(polyline2, angle, new Point(x, y))}
        stroke={voltageColor}
        strokeWidth={config.elements.load.strokeWidth}
        opacity={opacity}
      />

      {isShowTerminals ? terminals.map((terminal) =>
        <TerminalComponent
          canConnect={terminal.canConnect}
          position={terminal.position}
          key={terminal.id}
          opacity={opacity}
        />) : <></>}
    </>

  );
})

export default LoadComponent;