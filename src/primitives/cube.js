const scad = require("scad-js");
const Solid = require("../solid");

class Cube extends Solid {
	constructor({
		dimensions = [1, 1, 1],
		name = "cube",
		origin = [0, 0, 0],
		transformations = [],
	}) {
    super({
      materialize: () => { return scad.cube(this.dimensions); },
      name,
      origin,
      pointsOfInterest: {},
      transformations
    });
    this.dimensions = dimensions;
	};
};

module.exports = Cube;