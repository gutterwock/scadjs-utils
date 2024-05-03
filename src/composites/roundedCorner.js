const scad = require("scad-js");
const RoundedCylinder = require("./roundedCylinder");
const Solid = require("../solid");
const { polarToCartesian } = require("../utils");

class RoundedCorner extends Solid  {
	constructor({
		angle = 90,
		bevelRadius = .25,
		dimensions = [1, 1, 1],
		fn = 10,
		name = "roundedCorner",
		origin = [0, 0, 0],
		roundedEdges = [true, true],
		transformations = [],
	}) {
		super({
			materialize: () => {
				const base = (new RoundedCylinder({
					bevelRadius,
					dimensions,
					fn,
					name,
					origin,
					roundedEdges,
					transformations,
				})).materialize();

				const [height, r1, r2] = this.dimensions;
        const numberOfPoints = 2 + (360 - angle) / 90 | 0;
        const angleIncrement = (360 - angle) / (numberOfPoints - 1);
        const pointAngles = Array.from({length: numberOfPoints }, (_, index) => index * angleIncrement);
        const botPoints = [
          [0, 0, -height / 2 - 1],
          ...pointAngles.map((angle) => [...polarToCartesian(2 * r1, angle), -height / 2 - 1])
        ];
        const topPoints = [
          [0, 0, height / 2 + 1],
          ...pointAngles.map((angle) => [...polarToCartesian(2 * r2, angle), height / 2 + 1])
        ];
				const diffPaths = [
          Array.from({length: numberOfPoints + 1 }, (_, index) => index),
          Array.from({length: numberOfPoints + 1 }, (_, index) => index + numberOfPoints + 1).reverse(),
          ...Array.from({length: numberOfPoints + 1 }, (_, index) => { return [
            index,
            (index + 1) % (numberOfPoints + 1),
            (index + 1) % (numberOfPoints + 1) + numberOfPoints + 1,
            index + numberOfPoints + 1
          ].reverse()}),
				];

				return scad.difference(
				// return scad.union(
					base,
					scad.polyhedron([...botPoints, ...topPoints], diffPaths)
				);
			},
			name,
			origin,
			pointsOfInterest: {},
			transformations
		});
		this.angle = angle;
		this.bevelRadius = bevelRadius;
		this.dimensions = dimensions;
		this.fn = fn;
		this.roundedEdges = roundedEdges;
	};
};

module.exports = RoundedCorner;
