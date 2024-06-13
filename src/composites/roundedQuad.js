const scad = require("scad-js");
const Solid = require("../solid");

class RoundedPoly extends Solid {
	constructor({
		bevelRadius = .25,
		corners = [
			[-1, -1, -1],
			[-1, 1, -1],
			[1, 1, -1],
			[1, -1, -1],
			[-1, -1, 1],
			[-1, 1, 1],
			[1, 1, 1],
			[1, -1, 1]
		],
		fn = 10,
		name = "roundedPoly",
		origin = [0, 0, 0],
		transformations = [],
	}) {
		super({
			materialize: () => {
				return scad.union(
					scad.hull(
					// scad.union(
						...corners.map((position) => {
							return scad.sphere(this.bevelRadius, { $fn: this.fn }).translate(position);
						})
					),
				);
			},
			name,
			origin,
			pointsOfInterest: {},
			transformations
		});
		this.bevelRadius = bevelRadius;
		this.corners = corners;
		this.fn = fn;
	};
};

module.exports = RoundedPoly;