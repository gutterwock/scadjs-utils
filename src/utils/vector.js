const requireEqualDimensions = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		throw new Error("Arrays must have equal dimensions");
	}
};

const addVectors = (v1, v2) => {
	requireEqualDimensions(v1, v2);
  return v1.map((val, index) => val + v2[index]);
};

const scaleVectors = (v1, v2) => {
	requireEqualDimensions(v1, v2);
	const knownIndex = v2.findIndex((val) => val);
	const ratio = v2[knownIndex] / v1[knownIndex];
	return v1.map((side) => side * ratio);
};

const calculateDistance = (p1, p2) => {
	requireEqualDimensions(p1, p2);
	const sum = p1.reduce((acc, val, index) => {
		return acc + (val - p2[index]) ** 2; 
	}, 0);
	return Math.sqrt(sum);
};

const determineSigns = (p0, p1) => {
	requireEqualDimensions(p0, p1);
	return p0.map((val, index) => p1[index] < val ? -1 : 1);
};

const normalizeVector = (vector) => {
	const magnitude = Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0));
	return vector.map((val) => val / magnitude);
};

const calculateDotProduct = (v1, v2) => {
	requireEqualDimensions(v1, v2);
	return v1.reduce((acc, val, index) => acc + val * v2[index], 0);
};

module.exports = {
	addVectors,
	calculateDistance,
	calculateDotProduct,
	determineSigns,
	normalizeVector,
	requireEqualDimensions,
	scaleVectors,
};