import React, { useCallback, useMemo } from "react";
import "./Explorer.css"
import nodeIcon from '../../assets/icons/node.svg'
import folderIcon from '../../assets/icons/folder.svg'
import branchIcon from '../../assets/icons/branch.svg'
import switchIcon from '../../assets/icons/switch.svg'
import transIcon from '../../assets/icons/trans.svg'
import genIcon from '../../assets/icons/gen.svg'
import loadIcon from '../../assets/icons/load.svg'
import TreeView from "../TreeView/TreeView";

const Explorer = React.memo(({ scheme, onSelect, selected }) => {

  //console.log(`render PropertiesBar`)



  const getIcon = (element) => {
    switch (element.constructor.name) {
      case "Node":
        return nodeIcon;
      case "Branch":
        return branchIcon;
      case "Switch":
        return switchIcon;
      case "Generation":
        return genIcon;
      case "Transformer":
        return transIcon;
      case "Load":
        return loadIcon;
      default:
        return folderIcon;
    }
  }


  const getData = useMemo(() => {
    const data = [
      {
        uid: "1",
        label: "Scheme",
        icon: folderIcon,
        select: false,
        children: []
      }
    ]
    for (let i = 0; i < scheme.elements.length; i++) {
      const type = scheme.elements[i].constructor.name;

      let typeIndex = -1;
      if (data[0].children.length) {
        typeIndex = data[0].children.findIndex(x => x.label === type)
      }
      const isSelected = (selected.length > 0 && selected[0].id === scheme.elements[i].id) ? true : false;
      if (typeIndex !== -1) {
        data[0].children[typeIndex].children.push(
          { uid: scheme.elements[i].id, select: isSelected, label: scheme.elements[i].name, icon: getIcon(scheme.elements[i]), children: [] }
        )
      } else {
        data[0].children.push({
          uid: Math.random(), label: type, select: false, icon: folderIcon, children: [
            { uid: scheme.elements[i].id, select: isSelected, label: scheme.elements[i].name, icon: getIcon(scheme.elements[i]), children: [] }
          ]
        })
      }

    }
    return data;
  }, [scheme.elements, selected])




  //const onSelectHandler = useCallback((e) => onSelect(e), [onSelect]);

  return (
    <div className="explorer">
      {/* BETA */}
      <div style={{ color: "red", fontWeight: 900, padding: "50px 0px", display: "flex", justifyContent: "center", fontSize: "20px" }}>
        <div style={{ border: "1px solid red", padding: "5px 15px", borderRadius: "4px", backgroundColor: "#fdafaf" }}>BETA, DONT WORK</div>
      </div>
      {/* BETA */}

      <TreeView data={getData} onSelect={onSelect} />

    </div>
  );
})

export default Explorer;