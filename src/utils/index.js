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

module.exports = {
  multiTransform
};