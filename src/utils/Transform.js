import { Point } from "./Point";

export const getLineTransformPoint = (point, startPoint) => {
	return new Point(point.x + startPoint.x, point.y + startPoint.y)
}
export const getLineTransformPoints = (points, startPoint) => {
	let result = [];
	for (let i = 0; i < points.length; i++) {
		result.push(getLineTransformPoint(points[i], startPoint));
	}
	return result;
}

export const getRotateTransformPoint = (point, angle, startPoint) => {
	let zeroPoint = getLineTransformPoint(point, new Point(-startPoint.x, -startPoint.y));
	let angleRad = angle / 180 * Math.PI;
	let rotatePoint = new Point(zeroPoint.x * Math.cos(angleRad) - zeroPoint.y * Math.sin(angleRad), zeroPoint.x * Math.sin(angleRad) + zeroPoint.y * Math.cos(angleRad));
	return getLineTransformPoint(rotatePoint, startPoint);
}

export const getRotateTransformPoints = (points, angle, startPoint) => {
	let result = [];
	for (let i = 0; i < points.length; i++) {
		result.push(getRotateTransformPoint(points[i], angle, startPoint));
	}
	return result;
}
