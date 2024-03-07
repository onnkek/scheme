function Path({ point, path, stroke, strokeWidth }) {

  let stringPath = "";
  for (let i = 0; i < path.length; i++) {
    if (path[i].type !== "") {
      stringPath += `${path[i].type} ${Number(path[i].x) + point.x} ${Number(path[i].y) + point.y} `;
    } else {
      stringPath += `${Number(path[i].x) + point.x} ${Number(path[i].y) + point.y} `;
    }
  }
  return (
    <path
      d={stringPath}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
    />
  );
}

export default Path;