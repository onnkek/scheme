function Rectangle(props) {

  let { x, y, width, height, stroke, strokeWidth, fill } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
}

export default Rectangle;