import React from "react";
import { Point } from "../../models/Point";
import Polyline from "../Shapes/Polyline/Polyline";
import Circle from "../Shapes/Circle/Circle";

const TerminalComponent = ({ position, id }) => {

  console.log("render TerminalComponent")
  return (
    <>
      <Circle key={id} center={position} radius={5} fill="red" stroke="black" strokeWidth={1} />
    </>
  );
}

export default TerminalComponent;