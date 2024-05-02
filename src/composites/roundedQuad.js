const scad = require("scad-js");
const Solid = require("../solid");
const { increaseMagnitude } = require("../utils");

class RoundedQuad extends Solid {
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
		name = "roundedQuad",
		origin = [0, 0, 0],
		transformations = [],
	}) {
		super({
			materialize: () => {
        const vertexPositions = corners.map(([x, y, z]) => {
          return [
            increaseMagnitude(x, -bevelRadius),
            increaseMagnitude(y, -bevelRadius),
            increaseMagnitude(z, -bevelRadius)
          ];
        });
        const useCorner = [
          [true, false, false],
          [false, true, false],
          [false, false, true],
        ];
        return scad.union(
          scad.hull(
          // scad.union(
            ...vertexPositions.map((position) => {
              return scad.sphere(this.bevelRadius, { $fn: this.fn }).translate(position);
            })
          ),
          scad.union(
            ...useCorner.map(([useX, useY, useZ]) => {
              const points = corners.map(([x, y, z], index) => {
                return [
                  useX ? x : vertexPositions[index][0],
                  useY ? y : vertexPositions[index][1],
                  useZ ? z : vertexPositions[index][2]
                ];
              });
              const paths = [
                [0, 1, 2, 3],
                [4, 5, 1, 0],
                [7, 6, 5, 4],
                [5, 6, 2, 1],
                [6, 7, 3, 2],
                [7, 4, 0, 3]
              ];
              return scad.polyhedron(points, paths);
            })
          )
				);
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

module.exports = RoundedQuad;