function Polyline(props) {

  let { points, stroke, strokeWidth } = props;

  let pointsString = "";
  for(let i = 0; i < points.length; i++) {
    pointsString += `${points[i].coordinates.x},${points[i].coordinates.y} `;
  }
  pointsString.trim();

  return (
    <polyline points={pointsString} stroke={stroke} strokeWidth={strokeWidth} fill="none"></polyline>
    
  );
}

export default Polyline;