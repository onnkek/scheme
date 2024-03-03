function Rectangle(props) {

  let { x, y, width, height, stroke, strokeWidth, fill } = props;

  return (
    <>
      <rect x={x - width / 2} y={y - height / 2} width={width} height={height} stroke={stroke} strokeWidth={strokeWidth} fill={fill}></rect>
      {/* <circle cx={x} cy={y} r={2} fill="green" stroke="none" strokeWidth={0}></circle> */}
    </>
  );
}

export default Rectangle;