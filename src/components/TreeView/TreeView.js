import React, { useState } from "react";
import TreeViewItem from "../TreeViewItem/TreeViewItem";

const TreeView = React.memo(({ data, onSelect }) => {

  //console.log(`render TreeView`)


  // const handleSelect = (e) => {


  //   setSelect(e.target)
  //   onSelect(e);
  // }

  return (
    <div>
      {data.map(item =>
        <ul style={{ paddingLeft: "0px" }}>
          <TreeViewItem select={item.select} onSelect={onSelect} data={item} key={Math.random()} />
        </ul>
      )}
    </div>
  );
})

export default TreeView;