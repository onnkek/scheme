function Rectangle(props) {

  let { point, width, height, stroke, strokeWidth, fill } = props;

  return (
    <rect x={point.x} y={point.y} width={width} height={height} stroke={stroke} strokeWidth={strokeWidth} fill={fill}></rect>
  );
}

export default Rectangle;