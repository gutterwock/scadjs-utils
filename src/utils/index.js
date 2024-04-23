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
  const proportion = (distance + distanceBetweenPoints) / distanceBetweenPoints;
  
  const [dx, dy, dz] = [x2 - x1, y2 - y1, z2 - z1];
  console.log(distanceBetweenPoints, distance, proportion, z1, dz)
  return [
    proportion * dx + x1,
    proportion * dy + y1,
    proportion * dz + z1,
  ];
};

const writeToFile = ({ fileName, fn, solids }) => {
  fs.writeFileSync(
    fileName,
    scad.union(
      ...solids.map(({ result }) => result).flat()
    )
      .serialize({ $fn: fn })
      .split("\n") // for compatibility with newer openscad versions
      .map((line) => line.replace(/(polyhedron\([^\)]*)paths( =)/, "$1" + "faces" + "$2"))
      .join("\n")
  );
};

module.exports = {
  extendLine,
  multiTransform,
  writeToFile
};