import React, { useState } from "react";
import TreeView from "../TreeView/TreeView";
import './TreeViewItem.css'
import arrowIcon from '../../assets/icons/arrow.svg'

const TreeViewItem = React.memo(({ data, onSelect }) => {

  const [showChildren, setShowChildren] = useState(true);

  const handleClick = () => setShowChildren(!showChildren);

  return (
    <ul style={{ paddingLeft: "0px" }}>
      <div
        className={`tree-view-item__area ${data.select && "tree-view-item__area_select"}`}
        onClick={onSelect}
        uid={data.uid}
      ></div>
      <div className="tree-view-item" >
        <img
          onClick={handleClick}
          className={`tree-view-item__control ${data.children.length > 0 && "tree-view-item__control_show"} ${showChildren && "tree-view-item__control_open"}`}
          src={arrowIcon}
          alt=""
        />
        <img
          className="tree-view-item__icon"
          src={data.icon}
          alt=""
        />
        <span>{data.label}</span>
      </div>
      {showChildren &&
        <ul style={{ paddingLeft: "10px" }}>
          <TreeView
            data={data.children}
            onSelect={onSelect}
          />
        </ul>
      }
    </ul>
  );
})

export default TreeViewItem;