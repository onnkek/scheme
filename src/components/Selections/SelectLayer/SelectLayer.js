import React, { useEffect } from "react";
import SelectBox from "../SelectBox/SelectBox";
import SelectLine from "../SelectLine/SelectLine";
import { Branch } from "../../../models/Branch";
import { Node } from "../../../models/Node";

const SelectLayer = ({selectElement, cp}) => {
  console.log("render SelectLayer")
  return (
    <>
      {selectElement instanceof Branch ? (<SelectLine points={selectElement.points} />) : ""}
      {selectElement instanceof Node ? (<SelectBox cp={cp} point={selectElement.position}
        widthRight={selectElement.widthRight} widthLeft={selectElement.widthLeft} />) : ""}
    </>
  );
}

export default SelectLayer;