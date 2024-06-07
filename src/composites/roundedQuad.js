const scad = require("scad-js");
const Solid = require("../solid");
const { extendLine } = require("../utils");

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

        const cornerPairs = [
          [3, 1, 4],
          [2, 0, 5],
          [1, 3, 6],
          [0, 2, 7],
          [7, 5, 0],
          [6, 4, 1],
          [5, 7, 2],
          [4, 6, 3],
        ];
        const vertexPositions = cornerPairs.map(([xIndex, yIndex, zIndex], cornerIndex) => {
          return [
            extendLine([corners[xIndex][0], corners[cornerIndex][1], corners[cornerIndex][2]], corners[cornerIndex], -bevelRadius)[0] || corners[cornerIndex][0],
            extendLine([corners[cornerIndex][0], corners[yIndex][1], corners[cornerIndex][2]], corners[cornerIndex], -bevelRadius)[1] || corners[cornerIndex][1],
            extendLine([corners[cornerIndex][0], corners[cornerIndex][1], corners[zIndex][2]], corners[cornerIndex], -bevelRadius)[2] || corners[cornerIndex][2],
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