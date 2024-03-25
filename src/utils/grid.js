import { Point } from "./Point";

export const getGridDelta = (cursor, lastCursor, grid) => {
  let gridCursor = {
    x: Math.round((cursor.x) / grid.stepX) * grid.stepX,
    y: Math.round((cursor.y) / grid.stepY) * grid.stepY,
  };
  let gridLastCursor = {
    x: Math.round((lastCursor.x) / grid.stepX) * grid.stepX,
    y: Math.round((lastCursor.y) / grid.stepY) * grid.stepY,
  };
  return new Point(gridCursor.x - gridLastCursor.x, gridCursor.y - gridLastCursor.y);
} 