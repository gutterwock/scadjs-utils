class Solid {
	constructor ({
		children = [],
    materialize = () => {},
		name = "solid",
		origin = [0, 0, 0],
		pointsOfInterest = {},
		transformations = [],
	}) {
		this.children = children;
    this.materialize = materialize;
		this.name = name;
		this.origin = origin;
		this.pointsOfInterest = pointsOfInterest;
		this.transformations = transformations;

    this.render = async () => {
      await this.materialize();
      await Promise.all(children.map(async (solid) => { await solid.render() }));
    };
	};
};

module.exports = Solid;