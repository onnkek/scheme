import React from "react";
import Rectangle from "../Shapes/Rectangle/Rectangle";
import Polyline from "../Shapes/Polyline/Polyline";
import Circle from "../Shapes/Circle/Circle";

const SelectLayer = (select) => {
  const selectPadding = 2;
  const selectControlPadding = 8;
  const selectControlLength = 12;

  const height = 30;
  // console.log("render SelectLayer")
  // if(select.select) {
  //   console.log(select.select.image.list[0].coordinates)
  // }

  const GetLineControls = (points) => {
    const needPoints = points.filter(
      (point, p) => p > 0 && p < points.length - 1
    );
    console.log(needPoints)
    return needPoints.map((point) =>
      <>
        <Rectangle x={point.coordinates.x - 5} y={point.coordinates.y - 5} width={10} height={10} stroke="white" strokeWidth={0} fill="white"/>
        <Rectangle x={point.coordinates.x - 4} y={point.coordinates.y - 4} width={8} height={8} stroke="black" strokeWidth={0} fill="black"/>
        <Rectangle x={point.coordinates.x - 3} y={point.coordinates.y - 3} width={6} height={6} stroke="black" strokeWidth={0} fill="white"/>
      </>
    );
  }

  // let rect = DrawRectanle({
  //   x: selectBranch.image.list[i].coordinates.x - 5,
  //   y: selectBranch.image.list[i].coordinates.y - 5
  // },
  //   10, 10, 0, "white", "white");
  // branchEditPoints.push(rect);
  // rect.setAttribute("filter", "url(#f1)");
  // rect = DrawRectanle({
  //   x: selectBranch.image.list[i].coordinates.x - 4,
  //   y: selectBranch.image.list[i].coordinates.y - 4,
  // }, 8, 8, 0, "black", "black");
  // branchEditPoints.push(rect);
  // rect = DrawRectanle({
  //   x: selectBranch.image.list[i].coordinates.x - 3,
  //   y: selectBranch.image.list[i].coordinates.y - 3,
  // }, 6, 6, 0, "black", "white");


  return (
    <>
      {select.select.type === "branch" ? (
        <>
          <Polyline points={select.select.image.list} stroke="Violet" strokeWidth={1} />
          <Circle center={select.select.image.list[0].coordinates} radius={4} fill="red" stroke="black" strokeWidth={1} />
          <Circle center={select.select.image.list[select.select.image.list.length - 1].coordinates} radius={4} fill="red" stroke="black" strokeWidth={1} />
          {GetLineControls(select.select.image.list)}
        </>

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