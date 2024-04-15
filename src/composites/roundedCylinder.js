const scad = require("scad-js");
const Solid = require("../solid");

class RoundedCylinder extends Solid {
	constructor({
    bevelRadius = .25,
		dimensions = [1, 1, 1],
    fn = 10,
		name = "roundedCylinder",
		origin = [0, 0, 0],
    roundedEdges = [true, true],
		transformations = [],
	}) {
    super({
      materialize: () => {
        const [height, r1, r2] = this.dimensions;
        const innerR1 = r1 - this.bevelRadius;
        const innerR2 = r2 - this.bevelRadius;
        const outerHeight = height - (this.roundedEdges[0] ? bevelRadius : 0) - (this.roundedEdges[1] ? bevelRadius : 0);
        const outerZ = 0 - (this.roundedEdges[0] ? bevelRadius : 0) + (this.roundedEdges[1] ? bevelRadius : 0);
        return scad.union(
          scad.cylinder(height, [innerR1, innerR2], { $fn: this.fn }),
          scad.cylinder(outerHeight, [r1, r2], { $fn: this.fn }).translate([0, 0, outerZ]),
          scad.circle(bevelRadius, { $fn: this.fn }).translate([r1 - bevelRadius, 0, 0]).rotate_extrude(360, { $fn: this.fn }).translate([0, 0, -height / 2 + bevelRadius]),
          scad.circle(bevelRadius, { $fn: this.fn }).translate([r2 - bevelRadius, 0, 0]).rotate_extrude(360, { $fn: this.fn }).translate([0, 0, height / 2 - bevelRadius])
        );
      },
      name,
      origin,
      pointsOfInterest: {},
      transformations
    });
    this.bevelRadius = bevelRadius;
    this.dimensions = dimensions;
    this.fn = fn;
    this.roundedEdges = roundedEdges;
	};
};

module.exports = RoundedCylinder;