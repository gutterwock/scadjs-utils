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
      materialize: () => { return scad.sphere(this.dimensions); },
      name,
      origin,
      pointsOfInterest: {},
      transformations
    });
    this.dimensions = dimensions;
	};
};

module.exports = Sphere;