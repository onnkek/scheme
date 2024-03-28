import React from "react";
import { config } from "../../../config";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";
import { Point } from "../../../utils/Point";
import { getRotateTransformPoint } from "../../../utils/Transform";
import CircleComponent from "../../Shapes/CircleComponent/CircleComponent";

const TransformerComponent = React.memo(({ x, y, isShowTerminals, terminals, voltageColor1, voltageColor2, angle, opacity }) => {


  //console.log(`render transformer`)
  return (
    <>
      <CircleComponent
        center={getRotateTransformPoint(new Point(x, y - config.elements.transformer.offset), angle, new Point(x, y))}
        radius={config.elements.transformer.radius}
        fill="none"
        stroke={voltageColor1}
        strokeWidth={config.elements.transformer.strokeWidth}
        opacity={opacity}
      />
      <CircleComponent
        center={getRotateTransformPoint(new Point(x, y + config.elements.transformer.offset), angle, new Point(x, y))}
        radius={config.elements.transformer.radius}
        fill="none"
        stroke={voltageColor2}
        strokeWidth={config.elements.transformer.strokeWidth}
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

export default TransformerComponent;