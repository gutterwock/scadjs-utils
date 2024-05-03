const { writeToFile } = require("./src/utils");
const Cube = require("./src/primitives/cube");
const RoundedCylinder = require("./src/composites/roundedCylinder");
const RoundedQuad = require("./src/composites/roundedQuad");

// const a = new Cube({
//   name: "a"
// });

// const a = new RoundedCylinder({
//   dimensions: [5, 2, 1]
// });

const a = new RoundedQuad({
  corners: [
    [-2, -1, -1],
    [-1, 1, -1],
    [1, 1, -1],
    [1, -1, -1],
    [-1, -1, 1],
    [-1, 1, 1],
    [1, 1, 1],
    [1, -1, 1]
  ]
});

a.render()

const solids = [a];

writeToFile({
  fileName: "debug.scad",
  fn: 15,
  solids
})
