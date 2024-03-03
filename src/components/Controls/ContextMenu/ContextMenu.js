import React from "react";
import './ContextMenu.css';

const ContextMenu = ({ visible, children, position }) => {

	console.log("render ContextMenu")
	console.log(visible)
	return (
		visible ?
			<div className="context-menu" style={{ left: position.x + "px", top: position.y + "px" }} onContextMenu={(e) => e.preventDefault()}>
				{children}
			</div > :
			<></>
	);
}

export default ContextMenu;