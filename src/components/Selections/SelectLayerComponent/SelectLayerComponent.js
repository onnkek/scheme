import React from "react";
import SelectBoxComponent from "../SelectBoxComponent/SelectBoxComponent";
import SelectLineComponent from "../SelectLineComponent/SelectLineComponent";
import { Branch } from "../../../models/Elements/Branch";

const SelectLayerComponent = ({ selectElement, selectLayer }) => {
  
  //console.log("render SelectLayerComponent")
  
  return (
    <>
      {selectElement instanceof Branch ? (<SelectLineComponent box={selectLayer.box} />) : <></>}
      {!(selectElement instanceof Branch) && selectLayer.box ? <SelectBoxComponent box={selectLayer.box} /> : <></>}
    </>
  );
}

export default SelectLayerComponent;