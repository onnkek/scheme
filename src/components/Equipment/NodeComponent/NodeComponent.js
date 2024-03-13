import React from "react";
import Line from "../../Shapes/Line/Line";
import Text from "../../Shapes/Text/Text";
import { config } from "../../../config";
import Circle from "../../Shapes/Circle/Circle";
import "./NodeComponent.css"

const NodeComponent = React.memo((props) => {

  let { x, y, widthRight, widthLeft, number, terminals, voltageColor, isShowTerminals } = props;

  //console.log(`render node - ${number}`)
  return (
    <>

      <Line
        p1={{ x: x - widthLeft, y: y }}
        p2={{ x: x + widthRight, y: y }}
        stroke={voltageColor}
        strokeWidth={config.elements.node.height}
      />
      {isShowTerminals ?
        <>
          <Line
            p1={{ x: x - widthLeft, y: y }}
            p2={{ x: x + widthRight, y: y }}
            stroke="black"
            strokeWidth={5}
          />
          <Line
            p1={{ x: x - widthLeft, y: y }}
            p2={{ x: x + widthRight, y: y }}
            stroke="white"
            strokeWidth={4}
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