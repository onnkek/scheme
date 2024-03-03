function Line(props) {

  let { p1, p2, stroke, strokeWidth, onMD, onMU, onMM } = props;

  return (
    <line onMouseDown={onMD}
      onMouseUp={onMU}
      onMouseMove={onMM}
      x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={stroke} strokeWidth={strokeWidth}></line>
  );
}

export default Line;