import Rectangle from "../../Shapes/Rectangle/Rectangle";
import Polyline from "../../Shapes/Polyline/Polyline";

const SelectBox = ({ point, widthLeft, widthRight, cp }) => {
  const selectPadding = 2;
  const height = 30;

  console.log("Render select box")
  return (
    <>
      <Rectangle x={point.x - widthLeft - selectPadding} y={point.y - height / 2 - selectPadding}
        width={widthLeft + widthRight + 2 * selectPadding} height={height + 2 * selectPadding} stroke="magenta" strokeWidth={1} fill="none" />
      {cp.map(c => <Polyline key={Math.random()} points={c} stroke="DodgerBlue" strokeWidth={4} />)}
    </>
  );
}

export default SelectBox;