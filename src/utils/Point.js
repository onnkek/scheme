export class Point {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export const getPointsString = (points) => {
  let pointsString = "";
  for (let i = 0; i < points.length; i++) {
    pointsString += `${points[i].x},${points[i].y} `;
  }
  return pointsString.trim();
}


