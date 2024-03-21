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
import { Switch } from "../../models/Elements/Switch";
import { Branch } from "../../models/Elements/Branch";
import { Node } from "../../models/Elements/Node";
import { Generation } from "../../models/Elements/Generation";
import { Transformer } from "../../models/Elements/Transformer";
import { Load } from "../../models/Elements/Load";

const Explorer = React.memo(({ scheme, onSelect, selected }) => {

  //console.log(`render PropertiesBar`)



  const getIcon = (element) => {

    if (element instanceof Node) {
      return nodeIcon;
    } else if (element instanceof Branch) {
      return branchIcon;
    } else if (element instanceof Switch) {
      return switchIcon;
    } else if (element instanceof Generation) {
      return genIcon;
    } else if (element instanceof Transformer) {
      return transIcon;
    } else if (element instanceof Load) {
      return loadIcon;
    } else {
      return folderIcon;
    }

  }
  const getType = (element) => {

    if (element instanceof Node) {
      return "Nodes";
    } else if (element instanceof Branch) {
      return "Branches";
    } else if (element instanceof Switch) {
      return "Switches";
    } else if (element instanceof Generation) {
      return "Generators";
    } else if (element instanceof Transformer) {
      return "Transformers";
    } else if (element instanceof Load) {
      return "Loads";
    } else {
      return "Unknowns";
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
      const type = getType(scheme.elements[i]);

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
          uid: i, label: getType(scheme.elements[i]), select: false, icon: folderIcon, children: [
            { uid: scheme.elements[i].id, select: isSelected, label: scheme.elements[i].name, icon: getIcon(scheme.elements[i]), children: [] }
          ]
        })
      }

    }
    console.log(data)
    return data;
  }, [scheme.elements, selected])




  //const onSelectHandler = useCallback((e) => onSelect(e), [onSelect]);

  return (
    <div className="explorer">
      {/* BETA */}
      <div style={{ color: "red", fontWeight: 900, padding: "0px 10px 10px 10px", display: "flex", justifyContent: "center", fontSize: "20px" }}>
        <div style={{ width: "100%", border: "1px solid red", padding: "5px 15px", borderRadius: "4px", backgroundColor: "#fdafaf", textAlign: "center" }}>BETA PANEL</div>
      </div>
      {/* BETA */}

      <TreeView data={getData} onSelect={onSelect} />

    </div>
  );
})

export default Explorer;