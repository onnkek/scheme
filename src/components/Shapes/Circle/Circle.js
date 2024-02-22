function Circle(props) {
  
  let { center, radius, fill }= props;
  
  return (
    <circle cx={center.x} cy={center.y} r={radius} fill={fill}></circle>
  );
}

export default Circle;