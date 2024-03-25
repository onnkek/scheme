function Text(props) {

  let { point, fontSize, fill, opacity = 1 } = props;

  return (
    <text
      x={point.x}
      y={point.y}
      fontSize={fontSize}
      fill={fill}
      fontFamily="Verdana"
      text-anchor="end"
      opacity={opacity}
    >{props.children}</text>
  );
}

export default Text;