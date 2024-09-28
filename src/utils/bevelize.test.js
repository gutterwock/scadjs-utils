const { bevelize } = require("./bevelize");
const { calculateDistance } = require("./vector");

const bevelLength = 2;
const convex = [
	[0, 0],
	[10, 0],
	[10, 10],
	[0, 10],
];
const concave = [
	[0, 0],
	[0, 10],
	[5, 8],
	[12, 12],
	[11, -1]
];

const closeEnough = (expected, actual, margin = 0.01) => {
	return Math.abs(expected - actual) <= margin;
};

const checkBevelLengths = (original, beveled, bevelLength) => {
	const lengths = original.map((_p, index) => calculateDistance(beveled[2 * index], beveled[2 * index + 1]));
	return lengths.map((length) => closeEnough(bevelLength, length));
};

const checkBevelsBisect = (original, beveled) => {
	return pairDistancesMatch = original.map((point, index) => {
		return closeEnough(
			calculateDistance(point, beveled[2 * index]),
			calculateDistance(point, beveled[2 * index + 1])
		);
	});
};

describe("bevelize", () => {
	it("calculates bevel points for a convex polygon", () => {
		const beveled = bevelize(convex, 2);
		const lengthsAreEqual = checkBevelLengths(convex, beveled, bevelLength);
		const bevelsBisectAngle = checkBevelsBisect(convex, beveled);
		
		expect(lengthsAreEqual).not.toContain(false);
		expect(bevelsBisectAngle).not.toContain(false);
	});

	it("calculates bevel points for a concave polygon", () => {
		const beveled = bevelize(concave, 2);
		const lengthsAreEqual = checkBevelLengths(concave, beveled, bevelLength);
		const bevelsBisectAngle = checkBevelsBisect(concave, beveled);

		expect(lengthsAreEqual).not.toContain(false);
		expect(bevelsBisectAngle).not.toContain(false);
	});
});

