const scad = require("scad-js");
const Solid = require("../solid");

class IntersectPoly extends Solid {
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
		name = "intersectPoly",
		origin = [0, 0, 0],
		transformations = [],
	}) {
		super({
			materialize: () => {
				return scad.intersection(
				// return scad.union(
					scad.polygon(
						[
							[0, 0],
							[5, 0],
							[6, 1],
							[5, 5],
							[0, 5]
						]
					).linear_extrude(10).rotate([0, 90, 0]),
					scad.polygon(
						[
							[0, 0],
							[5, 0],
							[8, 1],
							[5, 7],
							[0, 7]
						]
					).linear_extrude(20).rotate([90, 90, 0]).translate([0,10,0]),
					scad.polygon(
						[
							[0, 0],
							[5, 0],
							[6, 1],
							[5, 5],
							[0, 5]
						]
					).linear_extrude(20).translate([0,0,-10])
				)
				// return scad.union(
				// 	scad.hull(
				// 	// scad.union(
				// 		...corners.map((position) => {
				// 			return scad.sphere(this.bevelRadius, { $fn: this.fn }).translate(position);
				// 		})
				// 	),
				// );
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

module.exports = IntersectPoly;