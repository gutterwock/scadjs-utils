const scad = require("scad-js");
const Solid = require("../solid");

class Sphere extends Solid {
	constructor({
		dimensions = [1],
		name = "sphere",
		origin = [0, 0, 0],
		transformations = [],
	}) { 
    super({
      materialize: () => { return scad.sphere(this.dimensions, { $fn: this.fn }); },
      name,
      origin,
      pointsOfInterest: {},
      transformations
    });
    this.dimensions = dimensions;
    this.fn = 10;
	};
};

module.exports = Sphere;