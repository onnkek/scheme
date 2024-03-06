import Rectangle from "../../Shapes/Rectangle/Rectangle";

const SelectBoxComponent = ({ box }) => {

  // console.log("Render select box")

  return (
    <>
      <Rectangle
        x={box.position.x}
        y={box.position.y}
        width={box.width}
        height={box.height}
        stroke="magenta"
        strokeWidth={1}
        fill="none"
      />
      {box.controls.map(e => e.drawComponent())}
    </>
  );
}

export default SelectBoxComponent;