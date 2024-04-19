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
  const [x2, y2, z2] = point2;

  
  const distanceBetweenPoints = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
  const extendedDistance = distanceBetweenPoints + distance;
  const deltas = [x2 - x1, y2 - y1, z2 - z1];
  const primary = deltas.find((delta) => delta != 0);
  const [dx, dy, dz] = deltas;
  const dxd = dx / primary;
  const dyd = dy / primary;
  const dzd = dz / primary;
  const xExtend = (dx > 0 ? 1 : -1) * (dx === 0 ? 0 : extendedDistance) / (Math.sqrt(1 + dyd ** 2 + dzd ** 2));
  const yExtend = (dy > 0 ? 1 : -1) * (dy === 0 ? 0 : extendedDistance) / (Math.sqrt(1 + dxd ** 2 + dzd ** 2));
  const zExtend = (dz > 0 ? 1 : -1) * (dz === 0 ? 0 : extendedDistance) / (Math.sqrt(1 + dxd ** 2 + dyd ** 2));



  if (point1.includes(-2) || point2.includes(-2)) {

    console.log(point1)
    console.log(point2)
    console.log(distanceBetweenPoints, extendedDistance, deltas, xExtend, yExtend, zExtend)
    console.log("\n")
  }
  return [x1 + xExtend, y1 + yExtend, z1 + zExtend];
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