function Text(props) {

  let { text, point, fontSize, fill } = props;

  return (
    <text x={point.x} y={point.y} fontSize={fontSize} fill={fill} fontFamily="Verdana">{props.children}</text>
  );
}

export default Text;