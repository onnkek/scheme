import React, { useCallback, useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Point } from "../../utils/Point";

const TableComponent = ({ inputTable }) => {

  let initTable = inputTable;
  if (inputTable) {
    initTable = [];
    for (let i = 0; i < inputTable.length; i++) {
      initTable.push([]);
      for (let j = 0; j < inputTable[i].length; j++) {
        initTable[i][j] = { data: inputTable[i][j], width: 50 }
      }
    }
  }
  const [target, setTarget] = useState(null);
  const [table, setTable] = useState(initTable);
  const [lastCursor, setLastCursor] = useState(new Point(0, 0));

  const mouseDownHandler = (e) => {
    const index = e.target.getAttribute("columnIndex")
    setTarget(index);






  }

  const mouseMoveHandler = useCallback((e) => {
    const cursor = new Point(e.clientX, e.clientY);
    const delta = new Point(lastCursor.x - cursor.x, lastCursor.y - cursor.y)


    if (target) {
      if (target === 0) {
        table[0][target] = { data: table[0][target].data, width: table[0][target].width - delta.x };
      } else {
        table[0][target - 1] = { data: table[0][target].data, width: table[0][target].width + delta.x };
        table[0][target] = { data: table[0][target].data, width: table[0][target].width - delta.x };
      }
    }




    setTable([...table])



    setLastCursor(cursor);
  }, [lastCursor, table, target])

  const mouseUpHandler = useCallback((e) => {
    setTarget(null);

  }, [])


  useEffect(() => {
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [mouseUpHandler, mouseMoveHandler]);
  //console.log("render TableComponent")
  return (
    <>
      <Table bordered onMouseDown={mouseDownHandler}>
        <thead>
          <tr>
            {table[0].map(item =>
              <th columnIndex={table[0].indexOf(item)} style={{ width: item.width }}>
                {item.data}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {table.slice(1, table.length).map(row =>
            <tr>
              {row.map(item =>
                <td style={{ width: item.width }}>
                  {item.data}
                </td>
              )}
            </tr>
          )}</tbody>
      </Table>
    </>
  );
}

export default TableComponent;