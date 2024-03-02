import React from "react";
import SelectLine from "../SelectLine/SelectLine";
import { Branch } from "../../../models/Branch";
import SelectBoxComponent from "../SelectBox/SelectBoxComponent";

const SelectLayerComponent = ({ selectElement, selectLayer }) => {
  console.log("render SelectLayer")
  return (
    <>
      {selectElement instanceof Branch ? (<SelectLine points={selectElement.points} />) : ""}
      {selectLayer.box ? <SelectBoxComponent box={selectLayer.box} /> : <></>}
    </>
  );
}

export default SelectLayerComponent;