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
			// todo: add polyhedra
			materialize: () => {
        // pairs of corners used to calculate vertex positions
        const vertexAdjustmentIndices = [
          [[3, 0], [1, 0], [4, 0]],
          [[2, 1], [0, 1], [5, 1]],
          [[1, 2], [3, 2], [6, 2]],
          [[0, 3], [2, 3], [7, 3]],
          [[7, 4], [5, 4], [0, 4]],
          [[6, 5], [4, 5], [1, 5]],
          [[5, 6], [7, 6], [2, 6]],
          [[4, 7], [6, 7], [3, 7]],
        ];

        const vertexPositions = vertexAdjustmentIndices.map(([xPair, yPair, zPair]) => {
          const [x,,] = extendLine(corners[xPair[0]], corners[xPair[1]], -bevelRadius);
          const [,y,] = extendLine(corners[yPair[0]], corners[yPair[1]], -bevelRadius);
          const [,,z] = extendLine(corners[zPair[0]], corners[zPair[1]], -bevelRadius);
          return [x, y, z];
        });
// console.log(corners)
// console.log(vertexPositions)
        const useCorner = [
          // [true, false, false],
          [false, true, false],
          // [false, false, true],
        ];

        return scad.union(
          // scad.hull(
            scad.union(
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
                [0,1,2,3],
                [4,5,1,0],
                [7,6,5,4],
                [5,6,2,1],
                [6,7,3,2],
                [7,4,0,3]
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