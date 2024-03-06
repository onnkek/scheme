function Text(props) {

  let { point, fontSize, fill } = props;

  return (
    <text
      x={point.x}
      y={point.y}
      fontSize={fontSize}
      fill={fill}
      fontFamily="Verdana"
    >{props.children}</text>
  );
}

export default Text;