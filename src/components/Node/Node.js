import React from "react";
import Circle from "../Shapes/Circle/Circle";
import Line from "../Shapes/Line/Line";
import Text from "../Shapes/Text/Text";

const Node = React.memo((props) => {
  const cpOffset = 50;
  const cpRadius = 8;
  const height = 30;

  let { x, y, width, number } = props;

  let cp = [];
  for (let i = 0; i < width / cpOffset - 1; i++) {
    cp.push({ x: x - width / 2 + (i + 1) * cpOffset, y: y });
  }

  console.log(`render node - ${number}`)

  return (
    <>

      <Line p1={{ x: x - width / 2, y: y }} p2={{ x: x + width / 2, y: y }} stroke="darkred"
        strokeWidth={height} />
      {cp.map(p => <Circle center={p} radius={cpRadius} fill="white" />)}
      <Text point={{ x: x - width / 2 - 20, y: y + 7 }} fill="white" fontSize={20}>{number}</Text>
    </>
  );
})

export default Node;