import { Point } from "./Point";

export const getGridDelta = (cursor, lastCursor) => {
  let stepOfGrid = 10;
  let gridCursor = {
    x: Math.round((cursor.x) / stepOfGrid) * stepOfGrid,
    y: Math.round((cursor.y) / stepOfGrid) * stepOfGrid,
  };
  let gridLastCursor = {
    x: Math.round((lastCursor.x) / stepOfGrid) * stepOfGrid,
    y: Math.round((lastCursor.y) / stepOfGrid) * stepOfGrid,
  };
  return new Point(gridCursor.x - gridLastCursor.x, gridCursor.y - gridLastCursor.y);
} 