//-----------------
// Array of Objects
//-----------------

var vehicleData = [
	(motorbike = {
		type: "motorbike",
		name: "Motorbike",
		minSeats: 1,
		maxSeats: 1,
		pricePerDay: 109,
		minDays: 1,
		maxDays: 5,
		fuelKm: 3.7
	}),
	(smallCar = {
		type: "smallCar",
		name: "Small Car",
		minSeats: 1,
		maxSeats: 2,
		pricePerDay: 129,
		minDays: 1,
		maxDays: 10,
		fuelKm: 8.5
	}),
	(largeCar = {
		type: "largeCar",
		name: "Large Car",
		minSeats: 1,
		maxSeats: 5,
		pricePerDay: 144,
		minDays: 2,
		maxDays: 10,
		fuelKm: 9.7
	}),
	(motorhome = {
		type: "motorhome",
		name: "Motorhome",
		minSeats: 2,
		maxSeats: 6,
		pricePerDay: 200,
		minDays: 2,
		maxDays: 15,
		fuelKm: 17
	})
];

var locationData = [
	(auckland = {
		location: "auckland",
		name: "Auckland",
		coordinates: [174.763332, -36.84846]
	}),
	(wellington = {
		location: "wellington",
		name: "Wellington",
		coordinates: [174.776236, -41.28646]
	}),
	(queenstown = {
		location: "queenstown",
		name: "Queenstown",
		coordinates: [168.662644, -45.031162]
	})
];
