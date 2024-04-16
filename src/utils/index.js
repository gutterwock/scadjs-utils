const scad = require("scad-js");
const fs = require("fs");

// TODO: handle the points of interest
const multiTransform = (solid, operations) => {
  let result = solid;
  operations.forEach(([operation, params]) => {
    switch (operation) {
      case "translate":
        result = result.translate(params);
        break;
      case "rotate":
        result = result.rotate(params);
        break;
      case "color":
        result = result.color(params);
        break;
      default:
        throw new Error(`Invalid operation: ${operation}`);
    }
  });
  return result;
};

const extendLine = (point1, point2, distance) => {
  const [x1, y1, z1] = point1;
  const [x2, y2, z3] = point2;
  const dx = x2 - x1;
  const dydx = (y2 - y1) / dx;
  const dzdx = (z2 - z1) / dx;
  const xExtend = distance / (Math.sqrt(1 + dydx ** 2 + dzdx ** 2));
  const yExtend = xExtend * dydx;
  const zExtend = xExtend * dzdx;
  return [x2 + xExtend, y2 + yExtend, z2 + zExtend];
};

const writeToFile = ({ fileName, fn, solids }) => {
  fs.writeFileSync(
    fileName,
    scad.union(
      ...solids.map(({ result }) => result).flat()
    ).serialize({ $fn: fn })
  );
};

module.exports = {
  extendLine,
  multiTransform,
  writeToFile
};