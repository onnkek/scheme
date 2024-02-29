import React, { useEffect } from "react";
import SelectBox from "../SelectBox/SelectBox";
import SelectLine from "../SelectLine/SelectLine";

const SelectLayer = (select) => {
  return (
    <>
      {select.select.type === "branch" ? (<SelectLine points={select.select.image.list} />) : ""}
      {select.select.type === "node" ? (<SelectBox cp={select.cp} svg={select.svg} point={select.select.coordinates}
        widthRight={select.select.image.widthRight} widthLeft={select.select.image.widthLeft} />) : ""}
    </>
  );
}

export default SelectLayer;