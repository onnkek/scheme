import React from "react";
import './ContextMenuItem.css';

const ContextMenuItem = ({ text, onClick }) => {

  console.log("render ContextMenuItem")
  return (
    <div className="context-menu-item" onClick={onClick} onContextMenu={(e) => e.preventDefault()}>
      {text}
    </div>
  );
}

export default ContextMenuItem;