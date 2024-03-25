import React from "react";

const GridComponent = React.memo(({ grid, stepX, stepY, backgroundColor, strokeWidth}) => {

   console.log("Render GridComponent")

  return (
    <>
      {grid.draw()}
    </>
  );
})

export default GridComponent;