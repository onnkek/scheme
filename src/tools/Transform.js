import { Point } from "./Point";

export const getLineTransform = (points, point) => {
    let result = [];
    for (let i = 0; i < points.length; i++) {
        result.push(new Point(points[i].x + point.x, points[i].y + point.y));
    }
    return result;
}

export const getRotateTransform = (points, angle, point) => {
    let result = [];
    let zeroPoints = getLineTransform(points, new Point(-point.x, -point.y));
    for (let i = 0; i < zeroPoints.length; i++) {
        let angleRad = angle / 180 * Math.PI;

        result.push(new Point(zeroPoints[i].x * Math.cos(angleRad) - zeroPoints[i].y * Math.sin(angleRad), zeroPoints[i].x * Math.sin(angleRad) + zeroPoints[i].y * Math.cos(angleRad)));
    }
    return getLineTransform(result, point);
}