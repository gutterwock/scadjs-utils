const { multiTransform } = require("../utils");

class Solid {
	constructor ({
		children = [],
    materialize = () => {},
		name = "solid",
		origin = [0, 0, 0],
		pointsOfInterest = {},
		transformations = [],
	}) {
		this.children = children;
    this.materialize = materialize;
		this.name = name;
		this.origin = origin;
		this.pointsOfInterest = pointsOfInterest;
    this.result = [];
		this.transformations = transformations;

    this.render = () => {
      this.result = [
        multiTransform(this.materialize(), transformations),
        ...children.map(async (solid) => { solid.render() })
      ];
    };
	};
};

module.exports = Solid;