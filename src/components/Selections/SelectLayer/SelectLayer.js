import React from "react";
import SelectBox from "../SelectBox/SelectBox";
import SelectLine from "../SelectLine/SelectLine";

const SelectLayer = (select) => {

  return (
    <>
      {select.select.type === "branch" ? (<SelectLine points={select.select.image.list} />) : ""}
      {select.select.type === "node" ? (<SelectBox point={select.select.coordinates} width={select.select.image.width} />) : ""}
    </>
  );
}

export default SelectLayer;