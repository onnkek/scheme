import React from "react";
import Line from "../../Shapes/Line/Line";
import Text from "../../Shapes/Text/Text";
import { config } from "../../../config";
import Circle from "../../Shapes/Circle/Circle";
import "./NodeComponent.css"

const NodeComponent = React.memo((props) => {

  let { x, y, widthRight, widthLeft, number, terminals, voltageColor } = props;

  //console.log(`render node - ${number}`)
  return (
    <>
      <Line
        p1={{ x: x - widthLeft, y: y }}
        p2={{ x: x + widthRight, y: y }}
        stroke={voltageColor}
        strokeWidth={config.elements.node.height}
      />
      {terminals.map((terminal) =>
        <Circle
          key={terminal.id}
          center={terminal.position}
          radius={config.elements.terminalNode.radius}
          fill="white"
          stroke="black"
          strokeWidth={config.elements.terminalNode.strokeWidth}
        />)}
      <Text
        point={{ x: x - widthLeft - 20, y: y + 7 }}
        fill="white"
        fontSize={20}
      >{number}</Text>
    </>
  );
})

export default NodeComponent;