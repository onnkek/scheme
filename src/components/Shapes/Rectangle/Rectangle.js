function Rectangle(props) {

  let { x, y, width, height, stroke, strokeWidth, fill } = props;

  return (
    <rect
      x={x - width / 2}
      y={y - height / 2}
      width={width}
      height={height}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
}

export default Rectangle;