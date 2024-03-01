import React, { useEffect } from "react";
import SelectBox from "../SelectBox/SelectBox";
import SelectLine from "../SelectLine/SelectLine";
import { Branch } from "../../../models/Branch";
import { Node } from "../../../models/Node";
import { Switch } from "../../../models/Switch";

const SelectLayer = ({ selectElement }) => {
  console.log("render SelectLayer")
  if (selectElement instanceof Switch)
    console.log(selectElement.getFrame())
  return (
    <>
      {selectElement instanceof Branch ? (<SelectLine points={selectElement.points} />) : ""}
      {selectElement && !(selectElement instanceof Branch) ? (<SelectBox frame={selectElement.getFrame()} />) : ""}
    </>
  );
}

export default SelectLayer;