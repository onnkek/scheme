function Rectangle(props) {

  let { x, y, width, height, stroke, strokeWidth, fill, opacity = 1 } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      opacity={opacity}
    />
  );
}

export default Rectangle;