function Circle(props) {
  
  let { center, radius, fill, stroke, strokeWidth }= props;
  
  return (
    <circle cx={center.x} cy={center.y} r={radius} fill={fill} stroke={stroke} strokeWidth={strokeWidth}></circle>
  );
}

export default Circle;