import React from "react";
import Line from "../../Shapes/Line/Line";
import Text from "../../Shapes/Text/Text";
import config from "../../../config.json";
import TerminalNodeComponent from "../../TerminalNodeComponent/TerminalNodeComponent";
import Circle from "../../Shapes/Circle/Circle";

const NodeComponent = React.memo((props) => {

  let { x, y, widthRight, widthLeft, number, isShowTerminals, terminals, id, canConnect } = props;

  //console.log(`render node - ${number}`)
  //console.log(terminals);
  return (
    <>
      <Line
        p1={{ x: x - widthLeft, y: y }}
        p2={{ x: x + widthRight, y: y }}
        stroke="darkred"
        strokeWidth={config.elements.nodeHeight}
      />
      {terminals.map((terminal) =>
        <Circle
          center={terminal.position}
          radius={8}
          fill="white"
          stroke="black"
          strokeWidth={1}
        />)}
      <Text
        point={{ x: x - widthLeft - 20, y: y + 7 }}
        fill="white"
        fontSize={20}
      >{number}</Text>
      {/* {isShowTerminals ?
        <TerminalNodeComponent
          position={terminals[0].position}
          id={id}
          widthLeft={widthLeft}
          widthRight={widthRight}
          canConnect={terminals[0].canConnect}
        /> : <></>} */}
    </>
  );
})

export default NodeComponent;