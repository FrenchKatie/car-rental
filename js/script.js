(function() {

			var leaveDate = document.getElementById('dateLeave');
			var returnDate = document.getElementById('dateReturn');
			var seatNumber = document.getElementById('seats');
			var seats = 0;
			var diffDays = 0;
			var startDate = 0;
			var endDate = 0;
			var route = 0;
			var distance = 0;
			var userOptions = [];

			//------------------
			//Page Piling Plugin
			//------------------
			$('#pagepiling').pagepiling({
					normalScrollElements: '.halfScreen'
			});
			$.fn.pagepiling.setAllowScrolling(false);

			$("#confirmLocation").click(function(){
						//pagepiling plugin - move to next section
						$.fn.pagepiling.moveSectionDown();
			});
			$("#confirmJourney").click(function(){
						//pagepiling plugin - move to next section
						$.fn.pagepiling.moveSectionDown();
			});

			//---------------------
			//Jquery UI Date Picker
			//---------------------
			$( "#dateLeave,#dateReturn" ).datepicker({
						changeMonth: true,
						changeYear: true,
						firstDay: 1,
						dateFormat: 'dd/mm/yy',
			});

			$( "#dateLeave" ).datepicker({ dateFormat: 'dd-mm-yy' });
			$( "#dateReturn" ).datepicker({ dateFormat: 'dd-mm-yy' });


			$('#dateReturn').change(function() {
						//Storing the users date inputs in variables
						startDate = $('#dateLeave').datepicker('getDate');
						endDate   = $('#dateReturn').datepicker('getDate');

						if (startDate<endDate) {
									diffDays   = (endDate - startDate)/1000/60/60/24;
						}
						else {
									alert ("You cant come back before you have been!");
									$('#dateLeave').val("");
									$('#dateReturn').val("");
						}
			}); //end change function

			//------------------------------
			//Toggling Item Info Dynamically
			//------------------------------
			$(".moreInfoBtn").click(function(){
				 	 	$(this).next().slideToggle();

			});

			//---------------
			//Map Box & Route
 			//---------------
			mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0aWVmcmVuY2giLCJhIjoiY2ppM240MGFyMDA5cTNrbDJwNTkwYWZmOSJ9.vMh53hzHle4vA4uwg0TE6A';
			var map = new mapboxgl.Map({
								container: 'map',
								style: 'mapbox://styles/mapbox/streets-v9',
								center: [173.839405, -41.181890],
								zoom: 5
			});
			var directions = new MapboxDirections({
								accessToken:
									'pk.eyJ1Ijoia2F0aWVmcmVuY2giLCJhIjoiY2ppM240MGFyMDA5cTNrbDJwNTkwYWZmOSJ9.vMh53hzHle4vA4uwg0TE6A',
								unit: 'metric',
								profile: 'mapbox/driving'
			});
			function getRoute() {

							  var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?geometries=geojson&access_token=' + mapboxgl.accessToken;
							  $.ajax({
									    method: 'GET',
									    url: directionsRequest,
							  }).done(function(data) {
											// custom function once ajax completes
											goodToGo(data);
									    map.addLayer({
										      id: 'route',
										      type: 'line',
										      source: {
												        type: 'geojson',
												        data: {
														          type: 'Feature',
														          geometry: route
												        }
										      },
										      paint: {
								        				'line-width': 2
										      }
								    	}	);
											map.addLayer({
												  id: 'start',
												  type: 'circle',
												  source: {
													    type: 'geojson',
													    data: {
														      type: 'Feature',
														      geometry: {
															        type: 'Point',
															        coordinates: start
														      }
													    }
												  }
												});
												map.addLayer({
													  id: 'end',
													  type: 'circle',
													  source: {
														    type: 'geojson',
														    data: {
															      type: 'Feature',
															      geometry: {
																        type: 'Point',
																        coordinates: end
															      }
														    }
													  }
												});
							  });

			}


			//--------------------------------------
			// Getting user input of Dates & Seats
			//--------------------------------------

			$("#sectionOneSubmitBtn").click(function(){
						//Storing the users seat input in a variable
						seats = parseInt(seatNumber.value);
						//pagepiling plugin - move to next section
						$.fn.pagepiling.moveSectionDown();
			});

			//-------------------------------------------------
			// Mapping Route & Getting User location & Distance
			//-------------------------------------------------

			var pickupLocation = document.getElementById('inputGroupSelect1');
			var dropoffLocation = document.getElementById('inputGroupSelect2');
			var getUserPickupLocation = pickupLocation.value;
			var getUserDropoffLocation = dropoffLocation.value;
			var viewRoute = document.getElementById('viewRoute');
			//On click event listener
			viewRoute.addEventListener('click', function (e) {
							e.preventDefault();
							startLocation();
							endLocation();
							getRoute();
							//logs the distance of the route but needs to be fired after the Route function is finished running
							getVehicle();

			});
			//Defining variables to store coordinates of start and ending locations.  These are called above in the getRoute function
			var start = [];
			var end = [];
			//Finding the start location coordinates depending on what the user input was.  This is called in the click function above
			function startLocation() {
							if (pickupLocation.value === "auckland") {
										start =[174.763332, -36.848460];
							}else if(pickupLocation.value === "wellington"){
										start =[174.776236, -41.286460];
							}else if(pickupLocation.value === "queenstown"){
										start =[168.662644, -45.031162];
							}
			}
			//Finding the end location coordinates depending on what the user input was. This is called in the click function above
			function endLocation () {
							if (dropoffLocation.value === "auckland") {
										end = [174.763332, -36.848460];
							}else if(dropoffLocation.value === "wellington"){
										end = [174.776236, -41.286460];
							}else if(dropoffLocation.value === "queenstown"){
										end = [168.662644, -45.031162];
							}
			}
			//--------------------------------------------------------------
			// Dynamically show the right vehicle options for users requests
			//--------------------------------------------------------------

			function getVehicle () {

							for(var i = 0; i < vehicleData.length; i++){
										if (vehicleData[i].minSeats <= seats &&
												vehicleData[i].maxSeats >= seats &&
												vehicleData[i].minDays <= diffDays &&
												vehicleData[i].maxDays >= diffDays) {

													var newElement = "";
													newElement += "<div class='myItem row justify-content-between'>"
													newElement += "<div class='itemLabel col-3'>"
													newElement +=			"<p class='headingSix removeSpace'>" + vehicleData[i].type + "</p>"
													newElement +=			"<p class='headingFive removeSpace'>" + vehicleData[i].maxSeats + " Seats</p>"
													newElement += "</div>"
													newElement += "<button type='button' name='button' class='moreInfoBtn'><span class='btnText col-9'>View information</span><i class='icon fas fa-chevron-down'></i></button>"
													newElement += "<div class='hide'>"
													newElement += "<div class='fullWidth'>"
													newElement += 		"<h4 class='headingFive'>General</h4>"
													newElement += 		"<div class='flexMe'>"
													newElement += 					"<p class='flexChildren'>Seats</p>"
													newElement += 					"<p class='flexChildren alignRight'>"
													newElement += 							"<i class='far fa-user'></i>"
													newElement +=						"</p>"
													newElement +=			"</div>"
													newElement +=			"<div class='flexMe'>"
													newElement +=					"<p class='flexChildren'>Rental cost per day</p>"
													newElement +=					"<p class='flexChildren alignRight'>$" + vehicleData[i].pricePerDay + "</p>"
													newElement +=			"</div>"
													newElement +=			"<div class='flexMe'>"
													newElement +=					"<p class='flexChildren'>Fuel consumption per 100km</p>"
													newElement +=					"<p class='flexChildren alignRight'>" + vehicleData[i].fuelKm + "L</p>"
													newElement +=			"</div>"
													newElement +=	"</div>"
													newElement +=	"<div class='fullWidth'>"
													newElement +=			"<h4 class='headingFive'>Your trip</h4>"
													newElement +=			"<div class='flexMe'>"
													newElement +=					"<p class='flexChildren'>Rental cost total</p>"
													newElement +=					"<p class='flexChildren alignRight'>$" + vehicleData[i].pricePerDay * diffDays + "</p>"
													newElement +=			"</div>"
													newElement +=			"<div class='flexMe'>"
													newElement +=					"<p class='flexChildren'>Estimated fuel consumption total</p>"
													newElement +=					"<p class='flexChildren alignRight'>" + vehicleData[i].fuelKm * distance + "L</p>"
													newElement +=			"</div>"
													newElement +=	"</div>"
													newElement +=	"<button type='button' name='button' class='iconBtnFillWide' id='confirm" + vehicleData[i].type + "'><span class='btnText col-12'>Confirm this vehicle</span><i class='iconWide fas fa-chevron-right'></i></button>"
													newElement +=	"</div>"
													newElement +=	"</div>"
													newElement +=	"</div>"

													var insertItem = document.getElementById("itemsHeader");
													insertItem.insertAdjacentHTML("afterEnd", newElement);

										}

						 }
						 //Inputs HTML saying the date leaving dynamically for section 5
						 var lastPageleavingDate = "<h3 class='headingThree'>We'll see you on " + leaveDate.value + " when you start your journey</h3>";
						 var insertLastPageleavingDate = document.getElementById("sectionFiveCongrat");
						 insertLastPageleavingDate.insertAdjacentHTML("afterEnd", lastPageleavingDate);

						 //inputs html saying journey leaving date
						 var journeyLeaveDate = "<p class='flexChildren alignRight headingFive' id='bookingPickupDate'>" + leaveDate.value + "</p>";
						 var insertJourneyLeaveDate = document.getElementById("journeyLeaveDate");
						 insertJourneyLeaveDate.insertAdjacentHTML("afterEnd", journeyLeaveDate);

						 //inputs html saying journey returning date
						 var journeyReturnDate = "<p class='flexChildren alignRight headingFive' id='bookingDropoffDate'>" + returnDate.value + "</p>";
						 var insertJourneyReturnDate = document.getElementById("journeyReturnDate");
						 insertJourneyReturnDate.insertAdjacentHTML("afterEnd", journeyReturnDate);

						 //inputs html saying journey leaving location
						 var journeyLeaveLoc = "<p class='flexChildren alignRight headingFive'>" + pickupLocation.value + "</p>";
						 var insertJourneyLeaveLoc = document.getElementById("journeyLeaveLoc");
						 insertJourneyLeaveLoc.insertAdjacentHTML("afterEnd", journeyLeaveLoc);

						 //inputs html saying journey returning location
						 var journeyReturnLoc = "<p class='flexChildren alignRight headingFive'>" + dropoffLocation.value + "</p>";
						 var insertJourneyReturnLoc = document.getElementById("journeyReturnLoc");
						 insertJourneyReturnLoc.insertAdjacentHTML("afterEnd", journeyReturnLoc);



		}

		//Have called this function above in the "done" phase of my Ajax call, Which means that it can grab the data info for distance
		function goodToGo ( data ) {
		    route = data.routes[0].geometry;
			  distance = data.routes[0].distance / 1000;
			  console.log('checking');
				console.log(route);
				console.log(distance);
		}









			//--------------------------------------------------------------
			// Functions for dynamically getting prices and fuel consumption
			//--------------------------------------------------------------
			//gets price per day of the vehicle index number multiplied by days travelled
			// function getPricePerDay (indexNum) {
			// 				var getPricePerDay = vehicleData[indexNum].pricePerDay * diffDays;
			// 				console.log(getPricePerDay + " price to rent");
			// }
			//gets getFuelConsumption for the vehicle by its corresponding index number and distance travelled
			// function getFuelConsumption (indexNum, distanceToTravel) {
			// 				console.log(distance + " is the distance travelled");
			// 				var getFuelConsumption = distanceToTravel / 100 * vehicleData[indexNum].fuelKm;
			// 				console.log(getFuelConsumption + " fuel consumption");
			// }


}());
