import React from "react";
import Rectangle from "../Shapes/Rectangle/Rectangle";
import Polyline from "../Shapes/Polyline/Polyline";

const SelectLayer = (select) => {
  const selectPadding = 2;
  const selectControlPadding = 8;
  const selectControlLength = 12;

  const height = 20;
  console.log("render SelectLayer")
  return (
    <>
      {select.select.type === "branch" ? (
        <Polyline points={select.select.image.list} stroke="Violet" strokeWidth={1} />
      ) : ""}
      {select.select.type === "node" ? (
        <>
          <Rectangle x={select.select.coordinates.x - select.select.image.width / 2 - selectPadding} y={select.select.coordinates.y - height / 2 - selectPadding}
            width={select.select.image.width + 2 * selectPadding} height={height + 2 * selectPadding} stroke="magenta" strokeWidth={1} fill="none" />
          <Polyline points={[{
            coordinates: { x: select.select.coordinates.x - select.select.image.width / 2 - selectControlPadding + selectControlLength, y: select.select.coordinates.y - height / 2 - selectControlPadding }
          }, {
            coordinates: { x: select.select.coordinates.x - select.select.image.width / 2 - selectControlPadding, y: select.select.coordinates.y - height / 2 - selectControlPadding }
          }, {
            coordinates: { x: select.select.coordinates.x - select.select.image.width / 2 - selectControlPadding, y: select.select.coordinates.y - height / 2 - selectControlPadding + selectControlLength }
          }
          ]} stroke="DodgerBlue" strokeWidth={4} />
          <Polyline points={[{
            coordinates: { x: select.select.coordinates.x + select.select.image.width / 2 + selectControlPadding - selectControlLength, y: select.select.coordinates.y - height / 2 - selectControlPadding }
          }, {
            coordinates: { x: select.select.coordinates.x + select.select.image.width / 2 + selectControlPadding, y: select.select.coordinates.y - height / 2 - selectControlPadding }
          }, {
            coordinates: { x: select.select.coordinates.x + select.select.image.width / 2 + selectControlPadding, y: select.select.coordinates.y - height / 2 - selectControlPadding + selectControlLength }
          }
          ]} stroke="DodgerBlue" strokeWidth={4} />
          <Polyline points={[{
            coordinates: { x: select.select.coordinates.x - select.select.image.width / 2 - selectControlPadding + selectControlLength, y: select.select.coordinates.y + height / 2 + selectControlPadding }
          }, {
            coordinates: { x: select.select.coordinates.x - select.select.image.width / 2 - selectControlPadding, y: select.select.coordinates.y + height / 2 + selectControlPadding }
          }, {
            coordinates: { x: select.select.coordinates.x - select.select.image.width / 2 - selectControlPadding, y: select.select.coordinates.y + height / 2 + selectControlPadding - selectControlLength }
          }
          ]} stroke="DodgerBlue" strokeWidth={4} />
          <Polyline points={[{
            coordinates: { x: select.select.coordinates.x + select.select.image.width / 2 + selectControlPadding - selectControlLength, y: select.select.coordinates.y + height / 2 + selectControlPadding }
          }, {
            coordinates: { x: select.select.coordinates.x + select.select.image.width / 2 + selectControlPadding, y: select.select.coordinates.y + height / 2 + selectControlPadding }
          }, {
            coordinates: { x: select.select.coordinates.x + select.select.image.width / 2 + selectControlPadding, y: select.select.coordinates.y + height / 2 + selectControlPadding - selectControlLength }
          }
          ]} stroke="DodgerBlue" strokeWidth={4} />
        </>
      ) : ""}
    </>
  );
}

export default SelectLayer;