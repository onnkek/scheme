import React from "react";
import Polyline from "../../Shapes/Polyline/Polyline";
import Circle from "../../Shapes/Circle/Circle";
import LinePoint from "../../Controls/LinePoint/LinePoint";

const SelectLine = ({ points }) => {
  console.log(points)
  const getLinePoints = (points) => {
    return points.filter((point, p) => p > 0 && p < points.length - 1);
  }

  return (
    <>
      <Polyline points={points} stroke="Violet" strokeWidth={1} />
      <Circle center={points[0]} radius={4} fill="red" stroke="black" strokeWidth={1} />
      <Circle center={points[points.length - 1]} radius={4} fill="red" stroke="black" strokeWidth={1} />
      {getLinePoints(points).map((point) => <LinePoint key={Math.random()} point={point} />)}
    </>
  );
}

export default SelectLine;