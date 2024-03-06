import React from "react";
import config from "../../../config.json";
import TerminalComponent from "../../TerminalComponent/TerminalComponent";
import Circle from "../../Shapes/Circle/Circle";
import { Point } from "../../../tools/Point";

const TransformerComponent = React.memo(({ x, y, isShowTerminals, terminals }) => {


  //console.log(`render transformer`)
  return (
    <>
      <Circle
        center={new Point(x, y - config.elements.transformer.offset)}
        radius={config.elements.transformer.radius}
        fill="none"
        stroke="yellow"
        strokeWidth={config.elements.transformer.strokeWidth}
      />
      <Circle
        center={new Point(x, y + config.elements.transformer.offset)}
        radius={config.elements.transformer.radius}
        fill="none"
        stroke="red"
        strokeWidth={config.elements.transformer.strokeWidth}
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

export default TransformerComponent;