class Solid {
	constructor ({
		components = [],
		name = "solid",
		position = [0, 0, 0],
		pointsOfInterest = {},
		transformations = [],
	}) {
		this.components = components;
		this.name = name;
		this.position = position;
		this.pointsOfInterest = pointsOfInterest;
		this.transformations = transformations;
	};

	
};