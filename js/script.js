(function() {
	//------------------
	//Global Variables
	//------------------
	var leaveDate = document.getElementById("dateLeave");
	var returnDate = document.getElementById("dateReturn");
	var seatNumber = document.getElementById("seats");
	var seats = 0;
	var diffDays = 0;
	var startDate = 0;
	var endDate = 0;
	var route = 0;
	var distance = 0;
	// var userOptions = [];
	var userVehicleSelect = 0;
	var pickDate = 0;
	var dropDate = 0;

	//------------------
	//Page Piling Plugin
	//------------------
	$("#pagepiling").pagepiling({
		// normalScrollElements: ".halfScreen"
		navigation: false,
		keyboardScrolling: false
	});

	$.fn.pagepiling.setAllowScrolling(false);

	//------------------
	//Event Handlers
	//------------------
	//pagepiling plugin - move to next section
	$("#confirmJourney").click(function() {
		$.fn.pagepiling.moveSectionDown();
	});

	//pagepiling plugin - move up a section if back btn is clicked
	$(".backBtn").click(function() {
		event.preventDefault();
		$.fn.pagepiling.moveSectionUp();
	});

	//First form validation
	$("#sectionOneSubmitBtn").click(function() {
		event.preventDefault();
		checkForm();
	});

	//Toggling vehicle information
	$(document).on("click", ".moreInfoBtn", function() {
		$(this)
			.next()
			.slideToggle("done", function() {});
	});

	//If user clicks anywhere on the page and if the object clicked has class of .vehicleConfirmBtn then get which vehicle was selected and the input name & calculated price into the journey page
	$(document).on("click", ".vehicleConfirmBtn", function() {
		$.fn.pagepiling.moveSectionDown();

		if ($(this)["0"].id == "confirmmotorbike") {
			userVehicleSelect = vehicleData[0].name;
			userVehicleSelectPrice = vehicleData[0].pricePerDay;
			userPrice = compareDates(pickDate, dropDate) * vehicleData[0].pricePerDay;
			//inputs html saying journey vehicle
			var journeyVehicle =
				"<p class='flexChildren alignRight headingFive cap'>" +
				userVehicleSelect +
				"</p>";
			var insertJourneyVehicle = document.getElementById("journeyVehicle");
			insertJourneyVehicle.insertAdjacentHTML("afterEnd", journeyVehicle);

			var journeyVehiclePrice =
				"<h3 class='flexChildren alignRight headingFour'>$" +
				userVehicleSelectPrice * compareDates(pickDate, dropDate) +
				"</h3>";
			var insertJourneyVehiclePrice = document.getElementById(
				"journeyVehiclePrice"
			);
			insertJourneyVehiclePrice.insertAdjacentHTML(
				"afterEnd",
				journeyVehiclePrice
			);
		} else if ($(this)["0"].id == "confirmsmallCar") {
			userVehicleSelect = vehicleData[1].name;
			userVehicleSelectPrice = vehicleData[1].pricePerDay;
			userPrice = compareDates(pickDate, dropDate) * vehicleData[1].pricePerDay;
			//inputs html saying journey vehicle
			var journeyVehicle =
				"<p class='flexChildren alignRight headingFive cap'>" +
				userVehicleSelect +
				"</p>";
			var insertJourneyVehicle = document.getElementById("journeyVehicle");
			insertJourneyVehicle.insertAdjacentHTML("afterEnd", journeyVehicle);
			var journeyVehiclePrice =
				"<h3 class='flexChildren alignRight headingFour'>$" +
				userVehicleSelectPrice * compareDates(pickDate, dropDate) +
				"</h3>";
			var insertJourneyVehiclePrice = document.getElementById(
				"journeyVehiclePrice"
			);
			insertJourneyVehiclePrice.insertAdjacentHTML(
				"afterEnd",
				journeyVehiclePrice
			);
		} else if ($(this)["0"].id == "confirmlargeCar") {
			userVehicleSelect = vehicleData[2].name;
			userVehicleSelectPrice = vehicleData[2].pricePerDay;
			userPrice = compareDates(pickDate, dropDate) * vehicleData[2].pricePerDay;
			//inputs html saying journey vehicle
			var journeyVehicle =
				"<p class='flexChildren alignRight headingFive cap'>" +
				userVehicleSelect +
				"</p>";
			var insertJourneyVehicle = document.getElementById("journeyVehicle");
			insertJourneyVehicle.insertAdjacentHTML("afterEnd", journeyVehicle);
			var journeyVehiclePrice =
				"<h3 class='flexChildren alignRight headingFour'>$" +
				userVehicleSelectPrice * compareDates(pickDate, dropDate) +
				"</h3>";
			var insertJourneyVehiclePrice = document.getElementById(
				"journeyVehiclePrice"
			);
			insertJourneyVehiclePrice.insertAdjacentHTML(
				"afterEnd",
				journeyVehiclePrice
			);
		} else if ($(this)["0"].id == "confirmmotorhome") {
			userVehicleSelect = vehicleData[3].name;
			userVehicleSelectPrice = vehicleData[3].pricePerDay;
			userPrice = compareDates(pickDate, dropDate) * vehicleData[3].pricePerDay;
			//inputs html saying journey vehicle
			var journeyVehicle =
				"<p class='flexChildren alignRight headingFive cap'>" +
				userVehicleSelect +
				"</p>";
			var insertJourneyVehicle = document.getElementById("journeyVehicle");
			insertJourneyVehicle.insertAdjacentHTML("afterEnd", journeyVehicle);
			var journeyVehiclePrice =
				"<h3 class='flexChildren alignRight headingFour'>$" +
				userVehicleSelectPrice * compareDates(pickDate, dropDate) +
				"</h3>";
			var insertJourneyVehiclePrice = document.getElementById(
				"journeyVehiclePrice"
			);
			insertJourneyVehiclePrice.insertAdjacentHTML(
				"afterEnd",
				journeyVehiclePrice
			);
		}
	});

	// <h3 class="flexChildren alignRight headingFour">$516</h3>

	//---------------
	//Map Box & Route
	//---------------
	mapboxgl.accessToken =
		"pk.eyJ1Ijoia2F0aWVmcmVuY2giLCJhIjoiY2ppM240MGFyMDA5cTNrbDJwNTkwYWZmOSJ9.vMh53hzHle4vA4uwg0TE6A";

	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v9",
		center: [173.839405, -41.18189],
		zoom: 5
	});
	var directions = new MapboxDirections({
		accessToken:
			"pk.eyJ1Ijoia2F0aWVmcmVuY2giLCJhIjoiY2ppM240MGFyMDA5cTNrbDJwNTkwYWZmOSJ9.vMh53hzHle4vA4uwg0TE6A",
		unit: "metric",
		profile: "mapbox/driving"
	});

	function getRoute() {
		var directionsRequest =
			"https://api.mapbox.com/directions/v5/mapbox/driving/" +
			start[0] +
			"," +
			start[1] +
			";" +
			end[0] +
			"," +
			end[1] +
			"?geometries=geojson&access_token=" +
			mapboxgl.accessToken;
		$.ajax({
			method: "GET",
			url: directionsRequest
		}).done(function(data) {
			resubmitMap();
			//This event handler has to be in the done section of this ajax call.  If the user was too quick to click this button and the distance had not yet finished calculating then it would create an error.
			$("#confirmLocation").click(function() {
				resubmitVehicleTitleRemove();
				resubmitItemRemove();
				getAllElements();
				$.fn.pagepiling.moveSectionDown();
			});

			// custom function once ajax completes
			goodToGo(data);
			map.addLayer({
				id: "route",
				type: "line",
				source: {
					type: "geojson",
					data: {
						type: "Feature",
						geometry: route
					}
				},
				paint: {
					"line-width": 2
				}
			});
			map.addLayer({
				id: "start",
				type: "circle",
				source: {
					type: "geojson",
					data: {
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: start
						}
					}
				}
			});
			map.addLayer({
				id: "end",
				type: "circle",
				source: {
					type: "geojson",
					data: {
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: end
						}
					}
				}
			});
		});
	}

	//---------------------
	//Jquery UI Date Picker
	//---------------------

	// date calender
	var dateFormat = "mm/dd/yy",
		from = $("#dateLeave")
			.datepicker({
				dateFormat: "dd/mm/yy",
				defaultDate: 0,
				minDate: 0,
				numberOfMonths: 1
			})
			.on("change", function() {
				to.datepicker("option", "minDate", getDate(this));
			}),
		to = $("#dateReturn")
			.datepicker({
				dateFormat: "dd/mm/yy",
				defaultDate: 0,
				minDate: 0,
				numberOfMonths: 1
			})
			.on("change", function() {
				from.datepicker("option", "maxDate", getDate(this));
			});

	// sets return date to only show from pickDate
	function getDate(element) {
		var dateFormat = "dd/mm/yy";
		var newDate = $("#dateLeave").datepicker({ dateFormat: "mm/dd/yy" });
		var date;
		try {
			date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
			date = null;
		}
		return date;
	}

	//This function is essentially date difference between pickDate and dropDate when called.
	function compareDates(startDate, endDate) {
		var date1 = new Date(startDate);
		var date2 = new Date(endDate);
		var timeDiff = date2.getTime() - date1.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return diffDays;
	}

	//----------------
	// Form Validation
	//----------------

	function checkForm() {
		pickDate = $("#dateLeave").datepicker("getDate");
		dropDate = $("#dateReturn").datepicker("getDate");
		seats = parseInt(seatNumber.value);
		//MY TRY
		//------
		if (pickDate === null) {
			$("#dateLeave").tooltip("show");
		} else if (dropDate === null) {
			$("#dateReturn").tooltip("show");
		} else if (compareDates(pickDate, dropDate) > 16) {
			$("#dateReturn")
				.attr("title", "Maximum number of days to rent is 15")
				.tooltip("_fixTitle")
				.tooltip("show");
		} else if (seatNumber.value === "") {
			console.log(seatNumber.value);
			$("#seats")
				.attr("title", "You must select a required number of seats")
				.tooltip("_fixTitle")
				.tooltip("show");
		} else if (seats > 6) {
			$("#seats")
				.attr("title", "Maximum number of seats is 6")
				.tooltip("_fixTitle")
				.tooltip("show");
		} else if (seats < 1) {
			$("#seats")
				.attr("title", "Minimum number of seats is 1")
				.tooltip("_fixTitle")
				.tooltip("show");
		} else if (
			(compareDates(pickDate, dropDate) === 1 && seats > 2) ||
			(seats === 1 && compareDates(pickDate, dropDate) > 10)
		) {
			alert("Sorry, there are no vehicles available for those requirements...");
		} else {
			$.fn.pagepiling.moveSectionDown();
		}
	}

	function checkLocationForm() {
		if (inputGroupSelect1.value === "choose") {
			$("#inputGroupSelect1").tooltip("show");
		} else if (inputGroupSelect2.value === "choose") {
			$("#inputGroupSelect2").tooltip("show");
		} else {
			document.getElementById("confirmLocation").classList.remove("hide");
		}
	}

	//-------------------------------------------------
	// Mapping Route & Getting User location & Distance
	//-------------------------------------------------

	var pickupLocation = document.getElementById("inputGroupSelect1");
	var dropoffLocation = document.getElementById("inputGroupSelect2");
	var getUserPickupLocation = pickupLocation.value;
	var getUserDropoffLocation = dropoffLocation.value;
	var viewRoute = document.getElementById("viewRoute");
	//On click event listener
	viewRoute.addEventListener("click", function(e) {
		e.preventDefault();
		checkLocationForm();
		startLocation();
		endLocation();
		getRoute();
	});
	//Defining variables to store coordinates of start and ending locations.  These are called above in the getRoute function
	var start = [];
	var end = [];
	//Finding the start location coordinates depending on what the user input was.  This is called in the click function above
	function startLocation() {
		if (pickupLocation.value === "auckland") {
			start = [174.763332, -36.84846];
		} else if (pickupLocation.value === "wellington") {
			start = [174.776236, -41.28646];
		} else if (pickupLocation.value === "queenstown") {
			start = [168.662644, -45.031162];
		}
	}

	//Finding the end location coordinates depending on what the user input was. This is called in the click function above
	function endLocation() {
		if (dropoffLocation.value === "auckland") {
			end = [174.763332, -36.84846];
		} else if (dropoffLocation.value === "wellington") {
			end = [174.776236, -41.28646];
		} else if (dropoffLocation.value === "queenstown") {
			end = [168.662644, -45.031162];
		}
	}

	//Have called this function above in the "done" phase of my Ajax call, Which means that it can grab the data info for distance
	function goodToGo(data) {
		route = data.routes[0].geometry;
		distance = data.routes[0].distance / 1000;
	}

	//--------------------------------------------------------
	// Removing appended items if user goes back and resubmits
	//--------------------------------------------------------
	//If the user has already defined a route this will remove the route before adding a new one.  Called in the done method of our map AJAX call
	function resubmitMap() {
		if (map.getLayer("route")) {
			map.removeLayer("route");
			map.removeLayer("start");
			map.removeLayer("end");
			map.removeSource("route");
			map.removeSource("start");
			map.removeSource("end");
		}
	}
	//If the user has already submitted this form before then remove old items before adding new ones
	function resubmitItemRemove() {
		$(".myItem").remove();
	}

	function resubmitVehicleTitleRemove() {
		$("#vehicleOptionTitle").remove();
	}

	//--------------------------------------------------------------
	// Dynamically show the right vehicle options for users requests
	//--------------------------------------------------------------

	function getAllElements() {
		//getting vehicles
		for (var i = 0; i < vehicleData.length; i++) {
			if (
				vehicleData[i].minSeats <= seats &&
				vehicleData[i].maxSeats >= seats &&
				vehicleData[i].minDays <= compareDates(pickDate, dropDate) &&
				vehicleData[i].maxDays >= compareDates(pickDate, dropDate)
			) {
				var newElement = "";
				newElement += "<div class='myItem row justify-content-between'>";
				newElement += "<div class='itemLabel col-3'>";
				newElement +=
					"<p class='headingSix removeSpace'>" + vehicleData[i].name + "</p>";
				newElement +=
					"<p class='headingFive removeSpace'>" +
					vehicleData[i].maxSeats +
					" Seats</p>";
				newElement += "</div>";
				newElement +=
					"<button type='button' name='button' class='moreInfoBtn'><span class='btnText col-9'>View information</span><i class='icon fas fa-chevron-down test'></i></button>";
				newElement += "<div class='hide itemInformation fullWidth'>";
				newElement += "<div class='fullWidth itemGeneralInfo'>";
				newElement += "<h4 class='headingFive itemSubHeader'>General</h4>";
				newElement += "<div class='flexMe'>";
				newElement += "<p class='flexChildren'>Seats</p>";
				newElement +=
					"<p class='flexChildren alignRight'>" +
					vehicleData[i].maxSeats +
					" seats</p>";
				newElement += "</div>";
				newElement += "<div class='flexMe'>";
				newElement += "<p class='flexChildren'>Rental cost per day</p>";
				newElement +=
					"<p class='flexChildren alignRight'>$" +
					vehicleData[i].pricePerDay +
					"</p>";
				newElement += "</div>";
				newElement += "<div class='flexMe'>";
				newElement += "<p class='flexChildren'>Fuel consumption per 100km</p>";
				newElement +=
					"<p class='flexChildren alignRight'>" +
					vehicleData[i].fuelKm +
					"L</p>";
				newElement += "</div>";
				newElement += "</div>";
				newElement += "<div class='fullWidth itemTripInfo'>";
				newElement += "<h4 class='headingFive itemSubHeader'>Your trip</h4>";
				newElement += "<div class='flexMe'>";
				newElement += "<p class='flexChildren'>Rental cost total</p>";
				newElement +=
					"<p class='flexChildren alignRight'>$" +
					vehicleData[i].pricePerDay * compareDates(pickDate, dropDate) +
					"</p>";
				newElement += "</div>";
				newElement += "<div class='flexMe'>";
				newElement +=
					"<p class='flexChildren'>Estimated fuel consumption total</p>";
				newElement +=
					"<p class='flexChildren alignRight'>" +
					Math.ceil(vehicleData[i].fuelKm * distance) +
					"L</p>";
				newElement += "</div>";
				newElement += "</div>";
				newElement +=
					"<button type='button' name='button' class='iconBtnFillWide vehicleConfirmBtn' id='confirm" +
					vehicleData[i].type +
					"'><span class='btnText col-12'>Select this vehicle</span><i class='iconWide fas fa-chevron-right'></i></button>";
				newElement += "</div>";
				newElement += "</div>";
				newElement += "</div>";

				var insertItem = document.getElementById("itemsHeader");
				insertItem.insertAdjacentHTML("afterEnd", newElement);
			}
		}

		//Changes h3 tag to dynamically display how many seats & days user has requested
		var newh3Element =
			"<h3 id='vehicleOptionTitle' class='headingFour'>You requested a vehicle with <span class='featureFont'>" +
			seats +
			"</span> seats for a period of <span class='featureFont'>" +
			compareDates(pickDate, dropDate) +
			"</span> days</h3>";
		var insertnewh3Element = document.getElementById("mainItemsHeader");
		insertnewh3Element.insertAdjacentHTML("afterEnd", newh3Element);

		//Inputs HTML saying the date leaving dynamically for section 5
		var lastPageleavingDate =
			"<h3 class='headingThree'>We'll see you on " +
			leaveDate.value +
			" when you start your journey</h3>";
		var insertLastPageleavingDate = document.getElementById(
			"sectionFiveCongrat"
		);
		insertLastPageleavingDate.insertAdjacentHTML(
			"afterEnd",
			lastPageleavingDate
		);

		//inputs html saying journey leaving date
		var journeyLeaveDate =
			"<p class='flexChildren alignRight headingFive' id='bookingPickupDate'>" +
			leaveDate.value +
			"</p>";
		var insertJourneyLeaveDate = document.getElementById("journeyLeaveDate");
		insertJourneyLeaveDate.insertAdjacentHTML("afterEnd", journeyLeaveDate);

		//inputs html saying journey returning date
		var journeyReturnDate =
			"<p class='flexChildren alignRight headingFive' id='bookingDropoffDate'>" +
			returnDate.value +
			"</p>";
		var insertJourneyReturnDate = document.getElementById("journeyReturnDate");
		insertJourneyReturnDate.insertAdjacentHTML("afterEnd", journeyReturnDate);

		//inputs html saying journey leaving location
		var journeyLeaveLoc =
			"<p class='flexChildren alignRight headingFive cap'>" +
			pickupLocation.value +
			"</p>";
		var insertJourneyLeaveLoc = document.getElementById("journeyLeaveLoc");
		insertJourneyLeaveLoc.insertAdjacentHTML("afterEnd", journeyLeaveLoc);

		//inputs html saying journey returning location
		var journeyReturnLoc =
			"<p class='flexChildren alignRight headingFive cap'>" +
			dropoffLocation.value +
			"</p>";
		var insertJourneyReturnLoc = document.getElementById("journeyReturnLoc");
		insertJourneyReturnLoc.insertAdjacentHTML("afterEnd", journeyReturnLoc);
	}
})();
