function Line(props) {

  let { p1, p2, stroke, strokeWidth, strokeDasharray, opacity = 1 } = props;

  return (
    <line
      x1={p1.x}
      y1={p1.y}
      x2={p2.x}
      y2={p2.y}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      opacity={opacity}
    />
  );
}

export default Line;