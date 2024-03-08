import { Branch } from "../models/Elements/Branch";

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

// export const hitTestFrame = (points, cursor) => {
//   let radius = 10;
//   let check = 0;
//   if ((points[1].x === points[2].x)) {
//     if (points[1].x > cursor.x - radius) {
//       check++;
//     }
//   } else {
//     let k = (points[2].y - points[1].y) / (points[2].x - points[1].x);
//     let m = points[1].y - k * points[1].x;
//     if (k * points[1].x + m > cursor.x - radius) {
//       check++;
//     }
//   }
//   if ((points[0].x === points[3].x)) {
//     if (points[0].x < cursor.x + radius) {
//       check++;
//     }
//   } else {
//     let k = (points[0].y - points[3].y) / (points[0].x - points[3].x);
//     let m = points[0].y - k * points[1].x;
//     if (k * points[0].x + m < cursor.x + radius) {
//       check++;
//     }
//   }

//   if ((points[0].y === points[1].y)) {
//     if (points[0].y < cursor.y + radius) {
//       check++;
//     }
//   } else {
//     let k = (points[0].y - points[1].y) / (points[0].x - points[1].x);
//     let m = points[0].y - k * points[1].x;
//     if (k * points[0].y + m < cursor.y + radius) {
//       check++;
//     }
//   }
//   if ((points[2].y === points[3].y)) {
//     if (points[2].y > cursor.y - radius) {
//       check++;
//     }
//   } else {
//     let k = (points[2].y - points[3].y) / (points[2].x - points[3].x);
//     let m = points[2].y - k * points[1].x;
//     if (k * points[2].y + m > cursor.y - radius) {
//       check++;
//     }
//   }
//   if (check === 4) {
//     return true;
//   }

// }

export const hitTestElement = (elements, cursor, radius) => {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] instanceof Branch) {
      if (hitTestBranch(elements[i].getFrame(), cursor, radius)) {
        return elements[i];
      }
    } else {
      if (hitTestFrame(elements[i].getFrame(), cursor, radius)) {
        return elements[i];
      }
    }
  }
}