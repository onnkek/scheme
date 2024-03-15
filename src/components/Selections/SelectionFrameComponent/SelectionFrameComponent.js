import Rectangle from "../../Shapes/Rectangle/Rectangle";

const SelectionFrameComponent = ({ selectionFrame }) => {

  // console.log("Render SelectionFrameComponent")
  return (
    <>
      <Rectangle
        x={selectionFrame.position.x}
        y={selectionFrame.position.y}
        width={selectionFrame.width}
        height={selectionFrame.height}
        stroke="DodgerBlue"
        strokeWidth={1}
        fill="#62b8ff23"
      />
    </>
  );
}

export default SelectionFrameComponent;