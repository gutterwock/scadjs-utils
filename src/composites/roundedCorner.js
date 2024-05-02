const scad = require("scad-js");
const Solid = require("../solid");
const RoundedCylinder = require("./roundedCylinder");
const { increaseMagnitude } = require("../utils");

class RoundedCorner extends Solid  {
	constructor({
		angle = 90,
		bevelRadius = .25,
		dimensions = [1, 1, 1],
		fn = 10,
		name = "roundedCorner",
		origin = [0, 0, 0],
		roundedEdges = [true, true],
		transformations = [],
	}) {
		super({
			materialize: () => {
				const base = (new RoundedCylinder({
					bevelRadius,
					dimensions,
					fn,
					name,
					origin,
					roundedEdges,
					transformations,
				})).materialize();

				const [height, r1, r2] = this.dimensions;
				const diffPoints = [
					[0, 0, -height / 2 - 1],
					[0, 2 * r1, -height / 2 - 1],
					[-2 * r1, -2 * r1, -height / 2 - 1],
					[2 * r1, 0, -height / 2 - 1],
					[0, 0, height / 2 + 1],
					[0, 2 * r2, height / 2 + 1],
					[-2 * r2, -2 * r2, height / 2 + 1],
					[2 * r2, 0, height / 2 + 1],
				];
				const diffPaths = [
					[0, 1, 2, 3],
					[4, 5, 1, 0],
					[7, 6, 5, 4],
					[5, 6, 2, 1],
					[6, 7, 3, 2],
					[7, 4, 0, 3]
				];
				return scad.difference(
				// return scad.union(
					base,
					scad.polyhedron(diffPoints, diffPaths)
				);
			},
			name,
			origin,
			pointsOfInterest: {},
			transformations
		});
		this.angle = angle;
		this.bevelRadius = bevelRadius;
		this.dimensions = dimensions;
		this.fn = fn;
		this.roundedEdges = roundedEdges;
	};
};

module.exports = RoundedCorner;
