function Text(props) {

  let { point, fontSize, fill, opacity = 1, textAnchor, angle, rotatePoint } = props;

  return (
    <text
      x={point.x}
      y={point.y}
      fontSize={fontSize}
      fill={fill}
      fontFamily="Verdana"
      textAnchor={textAnchor}
      opacity={opacity}
      transform={`rotate(${angle}, ${rotatePoint.x}, ${rotatePoint.y})`}
    >{props.children}</text>
  );
}

export default Text;