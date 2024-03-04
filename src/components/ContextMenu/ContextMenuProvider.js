import { useCallback, useEffect, useState } from "react";
import { ContextMenu } from "./ContextMenu"
import styles from "./ContextMenuProvider.css"



export const ContextMenuProvider = ({ children }) => {

  const [contextMenuItems, setContextMenuItems] = useState([]);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);

  const setContextMenu = useCallback((items, position) => {
    setContextMenuItems(items);
    setContextMenuPosition(position);
  }, [])

  const closeMenu = useCallback(() => {
    setContextMenuPosition(null);
  }, [])

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [closeMenu])

  return (
    <ContextMenu.Provider value={{ setContextMenu }}>
      {!!contextMenuPosition && (
        <ul
          className="contextMenu"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {contextMenuItems.map((item) =>
            <li
              key={Math.random()}
              className="contextMenuItem"
              onClick={item.onClick}
            >{item.text}</li>)}
        </ul>
      )}
      {children}
    </ContextMenu.Provider>
  )
}