const scad = require("scad-js");
const fs = require("fs");

const addVectors = (v1, v2) => {
  return v1.map((val, index) => val +(v2[index] || 0));
};

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
        result = result.color(...params);
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
  const [dx, dy, dz] = [x2 - x1, y2 - y1, z2 - z1];
  const distanceBetweenPoints = Math.sqrt((dx) ** 2 + (dy) ** 2 + (dz) ** 2);
  const [vx, vy, vz] = [dx / distanceBetweenPoints, dy / distanceBetweenPoints, dz / distanceBetweenPoints];

  return [
    distance * vx + x2,
    distance * vy + y2,
    distance * vz + z2,
  ];
};

const increaseMagnitude = (val, magnitude) => {
  if (val === 0) {
    return 0;
  } else if (val < 0) {
    return val - magnitude;
  } else {
    return val + magnitude;
  }
};

const polarToCartesian = (r, angle) => {
  const radians = angle * Math.PI / 180;
  return [
    r * Math.cos(radians),
    r * Math.sin(radians)
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
  addVectors,
  extendLine,
  multiTransform,
  polarToCartesian,
  increaseMagnitude,
  writeToFile
};