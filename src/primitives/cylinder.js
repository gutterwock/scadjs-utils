const scad = require("scad-js");
const Solid = require("../solid");

class Cylinder extends Solid {
	constructor({
		dimensions = [1, 1, 1],
		name = "cylinder",
		origin = [0, 0, 0],
		transformations = [],
	}) {
    super({
      materialize: () => { return scad.cylinder(this.dimensions); },
      name,
      origin,
      pointsOfInterest: {},
      transformations
    });
    this.dimensions = dimensions;
	};
};

module.exports = Cylinder;