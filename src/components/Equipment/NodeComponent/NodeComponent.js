import React from "react";
import Line from "../../Shapes/LineComponent/LineComponent";
import Text from "../../Shapes/Text/Text";
import { config } from "../../../config";
import Circle from "../../Shapes/CircleComponent/CircleComponent";
import "./NodeComponent.css"

const NodeComponent = React.memo((props) => {

  let { x, y, widthRight, widthLeft, name, terminals, voltageColor, isShowTerminals, opacity } = props;

  //console.log(`render node - ${number}`)
  return (
    <>

      <Line
        p1={{ x: x - widthLeft, y: y }}
        p2={{ x: x + widthRight, y: y }}
        stroke={voltageColor}
        strokeWidth={config.elements.node.height}
        opacity={opacity}
      />
      {isShowTerminals ?
        <>
          <Line
            p1={{ x: x - widthLeft, y: y }}
            p2={{ x: x + widthRight, y: y }}
            stroke="black"
            strokeWidth={5}
            opacity={opacity}
          />
          <Line
            p1={{ x: x - widthLeft, y: y }}
            p2={{ x: x + widthRight, y: y }}
            stroke="white"
            strokeWidth={4}
            opacity={opacity}
          />
        </>
        : <></>}
      {terminals.map((terminal) =>
        <Circle
          key={terminal.id}
          center={terminal.position}
          radius={config.elements.terminalNode.radius}
          fill="white"
          stroke="black"
          strokeWidth={config.elements.terminalNode.strokeWidth}
          opacity={opacity}
        />)}
      <Text
        point={{ x: x - widthLeft - 10, y: y + 7 }}
        fill="white"
        fontSize={20}
        opacity={opacity}
        textAnchor="end"
        angle={0}
        rotatePoint={{ x: x - widthLeft - 10, y: y + 7 }}
      >{name}</Text>

    </>
  );
})

export default NodeComponent;