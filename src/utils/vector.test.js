const { determineSigns } = require("./vector");

xdescribe("determineSigns", () => {
	it("checks if inputs are of equal length", () => {
		try {
			determineSigns([,], [,,,]);
			throw new Error("Expected error was not thrown");
		} catch (err) {
			expect(err.message).toBe("Arrays must have equal dimensions");
		}
	});

	it("determines the signs for offsets", () => {
		const origin = [0, 0];
		const points = [
			[1, 0],
			[1, 1],
			[0, 1],
			[-1, 1],
			[-1, 0],
			[-1, -1],
			[0, -1],
			[1, -1],
		]
		const result = points.map((point) => determineSigns(origin, point));
		expect(result).toEqual([
			[1, 1],
			[1, 1],
			[1, 1],
			[-1, 1],
			[-1, 1],
			[-1, -1],
			[1, -1],
			[1, -1],
		]);
	});
});
