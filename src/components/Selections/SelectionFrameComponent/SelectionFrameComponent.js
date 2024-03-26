import { config } from "../../../config";
import { SelectionFrame } from "../../../models/SelectionFrame";
import Rectangle from "../../Shapes/RectangleComponent/RectangleComponent";

const SelectionFrameComponent = ({ selectionFrame }) => {

  // console.log("Render SelectionFrameComponent")

  const stroke = selectionFrame.mode === SelectionFrame.Modes.Contain ?
    config.editor.selection.contain.stroke :
    config.editor.selection.intersect.stroke;

  const fill = selectionFrame.mode === SelectionFrame.Modes.Contain ?
    config.editor.selection.contain.fill :
    config.editor.selection.intersect.fill;

  return (
    <>
      <Rectangle
        x={selectionFrame.position.x}
        y={selectionFrame.position.y}
        width={selectionFrame.width}
        height={selectionFrame.height}
        stroke={stroke}
        strokeWidth={1}
        fill={fill}
      />
    </>
  );
}

export default SelectionFrameComponent;