const scad = require("scad-js");
const Solid = require("../solid");
const { extendLine } = require("../utils");

class RoundedQuad extends Solid {
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
		name = "roundedQuad",
		origin = [0, 0, 0],
		transformations = [],
	}) {
		super({
			// todo: add polyhedra
			materialize: () => {

				return scad.hull(
					...this.corners.map((position, index) => {

						return scad.sphere(this.bevelRadius, { $fn: this.fn }).translate(position);
					})
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

module.exports = RoundedQuad;