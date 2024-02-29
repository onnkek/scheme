import React from "react";
import Rectangle from "../../Shapes/Rectangle/Rectangle";


const LinePoint = ({ point }) => {

  return (
    <>
      <Rectangle x={point.x - 5} y={point.y - 5} width={10} height={10} stroke="white" strokeWidth={0} fill="white" />
      <Rectangle x={point.x - 4} y={point.y - 4} width={8} height={8} stroke="black" strokeWidth={0} fill="black" />
      <Rectangle x={point.x - 3} y={point.y - 3} width={6} height={6} stroke="black" strokeWidth={0} fill="white" />
    </>
  );
}

export default LinePoint;