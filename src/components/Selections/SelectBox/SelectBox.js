import React from "react";
import Rectangle from "../../Shapes/Rectangle/Rectangle";
import Polyline from "../../Shapes/Polyline/Polyline";

const SelectBox = ({ point, width }) => {
  const selectPadding = 2;
  const selectControlPadding = 8;
  const selectControlLength = 12;
  const height = 30;

  const points1 = [{
    coordinates: { x: point.x - width / 2 - selectControlPadding + selectControlLength, y: point.y - height / 2 - selectControlPadding }
  }, {
    coordinates: { x: point.x - width / 2 - selectControlPadding, y: point.y - height / 2 - selectControlPadding }
  }, {
    coordinates: { x: point.x - width / 2 - selectControlPadding, y: point.y - height / 2 - selectControlPadding + selectControlLength }
  }
  ];
  const points2 = [{
    coordinates: { x: point.x + width / 2 + selectControlPadding - selectControlLength, y: point.y - height / 2 - selectControlPadding }
  }, {
    coordinates: { x: point.x + width / 2 + selectControlPadding, y: point.y - height / 2 - selectControlPadding }
  }, {
    coordinates: { x: point.x + width / 2 + selectControlPadding, y: point.y - height / 2 - selectControlPadding + selectControlLength }
  }
  ]
  const points3 = [{
    coordinates: { x: point.x - width / 2 - selectControlPadding + selectControlLength, y: point.y + height / 2 + selectControlPadding }
  }, {
    coordinates: { x: point.x - width / 2 - selectControlPadding, y: point.y + height / 2 + selectControlPadding }
  }, {
    coordinates: { x: point.x - width / 2 - selectControlPadding, y: point.y + height / 2 + selectControlPadding - selectControlLength }
  }
  ]
  const points4 = [{
    coordinates: { x: point.x + width / 2 + selectControlPadding - selectControlLength, y: point.y + height / 2 + selectControlPadding }
  }, {
    coordinates: { x: point.x + width / 2 + selectControlPadding, y: point.y + height / 2 + selectControlPadding }
  }, {
    coordinates: { x: point.x + width / 2 + selectControlPadding, y: point.y + height / 2 + selectControlPadding - selectControlLength }
  }
  ]

  return (
    <>
      <Rectangle x={point.x - width / 2 - selectPadding} y={point.y - height / 2 - selectPadding}
        width={width + 2 * selectPadding} height={height + 2 * selectPadding} stroke="magenta" strokeWidth={1} fill="none" />
      <Polyline points={points1} stroke="DodgerBlue" strokeWidth={4} />
      <Polyline points={points2} stroke="DodgerBlue" strokeWidth={4} />
      <Polyline points={points3} stroke="DodgerBlue" strokeWidth={4} />
      <Polyline points={points4} stroke="DodgerBlue" strokeWidth={4} />
    </>
  );
}

export default SelectBox;