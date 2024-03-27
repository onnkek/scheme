import { Branch } from "../models/Elements/Branch";
import { Line } from "../models/Elements/Shapes/Line";
import { Polygon } from "../models/Elements/Shapes/Polygon";
import { Polyline } from "../models/Elements/Shapes/Polyline";
import { Point } from "./Point";
import { getRotateTransformPoints } from "./Transform";

export const hitTestLine = function (point1, point2, cursor, r) {
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
export const hitTestBranch = function (points, cursor, r) {
  for (let i = 0; i < points.length - 1; i++) {
    if (hitTestLine(points[i], points[i + 1], cursor, r)) {
      return true;
    }
  }
  return false;
};

export const hitTestPoint = function (point, cursor, r) {
  if (Math.pow(point.x - cursor.x, 2) + Math.pow(point.y - cursor.y, 2) < Math.pow(r, 2)) {
    return true;
  }
  return false;
};


export const hitTestFrame = (vertices, cursor, radius) => {
  let collision = false;
  let next = 0;
  for (let current = 0; current < vertices.length; current++) {
    next = current + 1;
    if (next === vertices.length) {
      next = 0;
    }
    let vc = vertices[current]; // xy1
    let vn = vertices[next]; // xy2
    if ((((vc.y >= cursor.y && vn.y < cursor.y) ||
      (vc.y < cursor.y && vn.y >= cursor.y)) &&
      (cursor.x < (vn.x - vc.x) * (cursor.y - vc.y) / (vn.y - vc.y) + vc.x))) {
      collision = !collision;
    }
    if (!collision && hitTestLine(vn, vc, cursor, radius)) {
      collision = !collision;
    }
  }
  return collision;

}

export const hitTestElement = (elements, cursor, radius) => {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] instanceof Branch || elements[i] instanceof Polyline || elements[i] instanceof Polygon || elements[i] instanceof Line) {
      if (hitTestBranch(elements[i].getFrame(), cursor, radius)) {
        return elements[i];
      }
    } else {
      if (hitTestFrame(getRotateTransformPoints(elements[i].getFrame(), elements[i].angle, elements[i].position), cursor, radius)) {
        return elements[i];
      }
    }
  }
}

// POLYGON/POLYGON
export const polyPoly = (vertices1, vertices2) => {

  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0;
  for (let current = 0; current < vertices1.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1;
    if (next === vertices1.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    let vc = vertices1[current];    // c for "current"
    let vn = vertices1[next];       // n for "next"

    // now we can use these two points (a line) to compare
    // to the other polygon's vertices using polyLine()
    let collision = polyLine(vertices2, vc, vn);
    if (collision) return true;

    // optional: check if the 2nd polygon is INSIDE the first
    collision = polyPoint(vertices1, vertices2[0]);
    if (collision) return true;
  }

  return false;
}

// POLYGON/POLYGON
export const polyPolyContain = (vertices, targetVertices) => {

  for (let i = 0; i < targetVertices.length; i++) {
    let contain = polyPoint(vertices, targetVertices[i]);
    if (!contain) {
      return false;
    }
  }
  return true;
}

// POLYGON/LINE
export const polyLine = (vertices, point1, point2) => {

  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0;
  for (let current = 0; current < vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position
    // extract X/Y coordinates from each
    let point3 = new Point(vertices[current].x, vertices[current].y);
    let point4 = new Point(vertices[next].x, vertices[next].y);

    // do a Line/Line comparison
    // if true, return 'true' immediately and
    // stop testing (faster)
    let hit = lineLine(point1, point2, point3, point4);
    if (hit) {
      return true;
    }
  }

  // never got a hit
  return false;
}

// LINE/LINE
export const lineLine = (point1, point2, point3, point4) => {

  // calculate the direction of the lines
  let uA = ((point4.x - point3.x) * (point1.y - point3.y) - (point4.y - point3.y) * (point1.x - point3.x)) / ((point4.y - point3.y) * (point2.x - point1.x) - (point4.x - point3.x) * (point2.y - point1.y));
  let uB = ((point2.x - point1.x) * (point1.y - point3.y) - (point2.y - point1.y) * (point1.x - point3.x)) / ((point4.y - point3.y) * (point2.x - point1.x) - (point4.x - point3.x) * (point2.y - point1.y));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}

// POLYGON/POINT
// used only to check if the second polygon is
// INSIDE the first
export const polyPoint = (vertices, point) => {
  let collision = false;

  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0;
  for (let current = 0; current < vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1;
    if (next === vertices.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    let vc = vertices[current];    // c for "current"
    let vn = vertices[next];       // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (((vc.y > point.y && vn.y < point.y) || (vc.y < point.y && vn.y > point.y)) &&
      (point.x < (vn.x - vc.x) * (point.y - vc.y) / (vn.y - vc.y) + vc.x)) {
      collision = !collision;
    }
  }
  return collision;
}