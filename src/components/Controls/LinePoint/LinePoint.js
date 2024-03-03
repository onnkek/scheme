import React from "react";
import Rectangle from "../../Shapes/Rectangle/Rectangle";


const LinePoint = ({ point }) => {

  return (
    <>
      <Rectangle x={point.x} y={point.y} width={10} height={10} stroke="white" strokeWidth={0} fill="white" />
      <Rectangle x={point.x} y={point.y} width={8} height={8} stroke="black" strokeWidth={0} fill="black" />
      <Rectangle x={point.x} y={point.y} width={6} height={6} stroke="black" strokeWidth={0} fill="white" />
    </>
  );
}

export default LinePoint;