import React from "react";
import Text from "../../Shapes/Text/Text";

const TextBlockComponent = React.memo(({ text, x, y, angle, color, fontSize, opacity, rotatePoint }) => {


  //console.log(`render transformer`)
  return (
    <Text
      point={{ x: x, y: y }}
      fill={color}
      fontSize={fontSize}
      opacity={opacity}
      textAnchor="start"
      angle={angle}
      rotatePoint={rotatePoint}
    >{text}</Text>

  );
})

export default TextBlockComponent;