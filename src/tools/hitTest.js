const hitTestLine = function (point1, point2, cursor, r) {
  let x1 = point1.x - cursor.x;
  let y1 = point1.y - cursor.y;
  let x2 = point2.x - cursor.x;
  let y2 = point2.y - cursor.y;
  let a = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
  let b = 2 * (x1 * (x2 - x1) + y1 * (y2 - y1));
  let c = Math.pow(x1, 2) + Math.pow(y1, 2) - Math.pow(r, 2);

  // get discriminant
  let disc = Math.pow(b, 2) - 4 * a * c;

  // check if discriminant has real values
  if (disc <= 0) return;

  // find intersection points
  let sqrtdisc = Math.sqrt(disc);
  let t1 = (-b + sqrtdisc) / (2 * a);
  let t2 = (-b - sqrtdisc) / (2 * a);
  if ((0 < t1 && t1 < 1) || (0 < t2 && t2 < 1)) return true;
}
export const hitTestBranch = function (list, cursor, r) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].image.list.length - 1; j++) {
      if (hitTestLine(list[i].image.list[j].coordinates, list[i].image.list[j + 1].coordinates, cursor, r)) {
        console.log("true");
        return list[i];
      }
    }
  }
  return false;
};
export const hitTestNode = function (list, cursor, r) {
  for (let i = 0; i < list.length; i++) {
    if (hitTestLine({
      x: list[i].coordinates.x - list[i].image.width / 2,
      y: list[i].coordinates.y
    }, {
      x: list[i].coordinates.x + list[i].image.width / 2,
      y: list[i].coordinates.y
    }, cursor, r)) {
      return list[i];
    }
  }
  return false;
};

export const hitTestLinePoint = function (list, cursor, r) {
  for (let i = 0; i < list.length; i++) {
    if (Math.pow(list[i].coordinates.x - cursor.x, 2) + Math.pow(list[i].coordinates.y - cursor.y, 2) < Math.pow(r, 2)) {
      return list[i];
    }
  }
  return false;
};

