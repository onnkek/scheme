import React from "react";
import SelectBoxComponent from "../SelectBoxComponent/SelectBoxComponent";
import SelectLineComponent from "../SelectLineComponent/SelectLineComponent";
import { Branch } from "../../../models/Elements/Branch";
import SelectionFrameComponent from "../SelectionFrameComponent/SelectionFrameComponent";

const SelectLayerComponent = ({ selectElement, selectLayer }) => {

  //console.log("render SelectLayerComponent")

  return (
    <>
      {selectLayer.selectionFrame ? <SelectionFrameComponent selectionFrame={selectLayer.selectionFrame} /> : <></>}
      {selectLayer.box.map(b => b.draw())}
      {/* {selectElement instanceof Branch ? (<SelectLineComponent box={selectLayer.box[0]} />) : <></>}
      {!(selectElement instanceof Branch) && selectLayer.box[0] ? <SelectBoxComponent box={selectLayer.box[0]} /> : <></>} */}
    </>
  );
}

export default SelectLayerComponent;