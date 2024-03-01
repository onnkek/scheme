import Rectangle from "../../Shapes/Rectangle/Rectangle";
import Polyline from "../../Shapes/Polyline/Polyline";
import { Point } from "../../../models/Point";

const SelectBox = ({ frame }) => {
  const selectPadding = 2;
  const height = 30;

  console.log("Render select box")
  console.log(frame[1].x)
  console.log(frame[0].x)
  
  const getControls = (points, selectControlPadding, selectControlLength) => {
    let result = [];
    result.push([
      new Point(points[0].x - selectControlPadding + selectControlLength, points[0].y - selectControlPadding),
      new Point(points[0].x - selectControlPadding, points[0].y - selectControlPadding),
      new Point(points[0].x - selectControlPadding, points[0].y - selectControlPadding + selectControlLength)
    ]);
    result.push([
      new Point(points[1].x + selectControlPadding - selectControlLength, points[1].y - selectControlPadding),
      new Point(points[1].x + selectControlPadding, points[1].y - selectControlPadding),
      new Point(points[1].x + selectControlPadding, points[1].y - selectControlPadding + selectControlLength)
    ]);
    result.push([
      new Point(points[2].x + selectControlPadding - selectControlLength, points[2].y + selectControlPadding),
      new Point(points[2].x + selectControlPadding, points[2].y + selectControlPadding),
      new Point(points[2].x + selectControlPadding, points[2].y + selectControlPadding - selectControlLength)
    ]);
    result.push([
      new Point(points[3].x - selectControlPadding + selectControlLength, points[3].y + selectControlPadding),
      new Point(points[3].x - selectControlPadding, points[3].y + selectControlPadding),
      new Point(points[3].x - selectControlPadding, points[3].y + selectControlPadding - selectControlLength)
    ]);
    return result;
  }

  return (
    <>
      <Rectangle x={frame[0].x + (frame[1].x - frame[0].x) / 2} y={frame[1].y + (frame[2].y - frame[1].y) / 2}
        width={frame[1].x - frame[0].x + 7} height={frame[2].y - frame[1].y + 7} stroke="magenta" strokeWidth={1} fill="none" />
      {getControls(frame, 8, 12).map(c => <Polyline key={Math.random()} points={c} stroke="DodgerBlue" strokeWidth={4} />)}
    </>
  );
}

export default SelectBox;