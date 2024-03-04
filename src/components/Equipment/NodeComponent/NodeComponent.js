import React from "react";
import Line from "../../Shapes/Line/Line";
import Text from "../../Shapes/Text/Text";
import config from "../../../config.json";

const NodeComponent = React.memo((props) => {
  const cpOffset = 50;
  const cpRadius = 8;

  let { x, y, widthRight, widthLeft, number } = props;

  let cp = [];
  for (let i = 0; i < (widthLeft + widthRight) / cpOffset - 1; i++) {
    cp.push({ x: x - widthLeft + (i + 1) * cpOffset, y: y });
  }

  console.log(`render node - ${number}`)

  return (
    <>

      <Line p1={{ x: x - widthLeft, y: y }} p2={{ x: x + widthRight, y: y }} stroke="darkred"
        strokeWidth={config.elements.nodeHeight} />
      
      <Text point={{ x: x - widthLeft - 20, y: y + 7 }} fill="white" fontSize={20}>{number}</Text>
    </>
  );
})

export default NodeComponent;