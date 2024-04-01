const scad = require("scad-js");
const Solid = require("../solid");

class Cylinder extends Solid {
	constructor({
		dimensions = [1, 1, 1],
		name = "cylinder",
		origin = [0, 0, 0],
		transformations = [],
	}) {
    this.dimensions = dimensions;
    this.materialize = () => { return scad.cylinder(this.dimensions); };
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

module.exports = Cylinder;