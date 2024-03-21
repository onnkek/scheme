import React from "react";
import TreeViewItem from "../TreeViewItem/TreeViewItem";

const TreeView = React.memo(({ data, onSelect }) => {

  const renderItem = (item) => (
    <TreeViewItem
      onSelect={onSelect}
      data={item}
      key={item.uid}
    />
  )

  return (
    <>
      {data.map(renderItem)}
    </>
  );
})

export default TreeView;