const { calculateDistance, determineSigns, scaleVectors } = require("./vector");

const useSelectedIndices = (originalPoint, newValues, indices) => {
	const newPoint = [...originalPoint];
	indices.forEach((originalIndex, newIndex) => newPoint[originalIndex] = newValues[newIndex]);
	return newPoint;
};

const bevelize = (points, bevelLength, indices = [0, 1]) => {
	const pointsToBevel = points.map((point) => [point[indices[0]], point[indices[1]]])
	const lastIndex = points.length - 1;
	const result = [];

	pointsToBevel.forEach((point, index) => {
		const previousPoint = pointsToBevel[index === 0 ? lastIndex : index - 1];
		const nextPoint = pointsToBevel[index === lastIndex ? 0 : index + 1];
		const [x0, y0] = previousPoint;
		const [x1, y1] = point;
		const [x2, y2] = nextPoint;

		const angle = Math.atan2(y2 - y1, x2 - x1) - Math.atan2(y0 - y1, x0 - x1);
		const previousOffsetSigns = determineSigns(point, previousPoint);
		const nextOffsetSigns = determineSigns(point, nextPoint);

		const offsetHyp = bevelLength / (2 * Math.sin(angle / 2));
		const [offsetX0, offsetY0] = scaleVectors([x0 - x1, y0 - y1, calculateDistance(previousPoint, point)], [,,offsetHyp]);
		const [offsetX2, offsetY2] = scaleVectors([x2 - x1, y2 - y1, calculateDistance(nextPoint, point)], [,,offsetHyp]);

		const previousOffset = [x1 + Math.abs(offsetX0) * previousOffsetSigns[0], y1 + Math.abs(offsetY0) * previousOffsetSigns[1]];
		const nextOffset = [x1 + Math.abs(offsetX2) * nextOffsetSigns[0], y1 + Math.abs(offsetY2) * nextOffsetSigns[1]];
		result.push(useSelectedIndices(points[index], previousOffset, indices));
		result.push(useSelectedIndices(points[index], nextOffset, indices));
	});

	return result;
};

module.exports = {
	bevelize
};