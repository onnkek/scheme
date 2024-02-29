import React, { useEffect } from "react";
import SelectBox from "../SelectBox/SelectBox";
import SelectLine from "../SelectLine/SelectLine";

const SelectLayer = (select) => {
  //console.log(select.svg.current);
  
  // useEffect(() => {
  //   select.svg.current.addEventListener("mousedown", (e) => {
  //     console.log("НАЖАЛ ПО СВГ ИЗ ЛЭЙЕРА")
  //   })
  // }, [])
  return (
    <>
      {select.select.type === "branch" ? (<SelectLine points={select.select.image.list} />) : ""}
      {select.select.type === "node" ? (<SelectBox point={select.select.coordinates} width={select.select.image.width} />) : ""}
    </>
  );
}

export default SelectLayer;