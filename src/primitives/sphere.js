const scad = require("scad-js");
const Solid = require("../solid");

class Sphere extends Solid {
	constructor({
		dimensions = [1],
		name = "sphere",
		origin = [0, 0, 0],
		transformations = [],
	}) {
    this.dimensions = dimensions;
    this.materialize = () => { return scad.sphere(this.dimensions); };
    this.name = name;
    this.origin = origin;
    this.pointsOfInterest = {};
    this.transformations = transformations;

    // TODO: multi transform based on transformations
    this.render = async () => {
      await this.materialize();
    };
	};
};

module.exports = Sphere;