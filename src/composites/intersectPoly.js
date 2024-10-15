const scad = require("scad-js");
const Solid = require("../solid");

class IntersectPoly extends Solid {
	constructor({
		name = "intersectPoly",
		origin = [0, 0, 0],
		solids = [],
		transformations = [],
	}) {
		super({
			materialize: () => {
				return scad.intersection(
				// return scad.union(
					...solids.map(({ points, faces, color = [.5, .5 , .5] }) => scad.polyhedron(points, faces).color(color) )
				)
			},
			name,
			origin,
			pointsOfInterest: {},
			transformations
		});
	};
};

module.exports = IntersectPoly;