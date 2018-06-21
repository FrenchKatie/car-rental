(function() {

			var leaveDate = document.getElementById('dateLeave');
			var returnDate = document.getElementById('dateReturn');
			var seatNumber = document.getElementById('seats');
			var seats = 0;
			var diffDays = 0;
			var startDate = 0;
			var endDate = 0;
			var distance = 0;

			//------------------
			//Page Piling Plugin
			//------------------
			$('#pagepiling').pagepiling({
					normalScrollElements: '.halfScreen'
			});
			// $.fn.pagepiling.setAllowScrolling(false);

			//---------------------
			//Jquery UI Date Picker
			//---------------------
			$( "#dateLeave,#dateReturn" ).datepicker({
						changeMonth: true,
						changeYear: true,
						firstDay: 1,
						dateFormat: 'dd/mm/yy',
			})

			$( "#dateLeave" ).datepicker({ dateFormat: 'dd-mm-yy' });
			$( "#dateReturn" ).datepicker({ dateFormat: 'dd-mm-yy' });


			$('#dateReturn').change(function() {
						//Storing the users date inputs in variables
						startDate = $('#dateLeave').datepicker('getDate');
						endDate   = $('#dateReturn').datepicker('getDate');

						if (startDate<endDate) {
									diffDays   = (endDate - startDate)/1000/60/60/24;
									// $('#days').val(diffDays);
									console.log(diffDays + " days requested to rent");
						}
						else {
									alert ("You cant come back before you have been!");
									$('#dateLeave').val("");
									$('#dateReturn').val("");
									// $('#days').val("");
									console.log(diffDays);
						}
			}); //end change function

			//------------------------------
			//Toggling Item Info Dynamically
			//------------------------------
			$(".moreInfoBtn").click(function(){
				 	 	$(this).next().slideToggle();
			})

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
									    var route = data.routes[0].geometry;
											distance = data.routes[0].distance / 1000;
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
						seats = seatNumber.value;
						// console.log(seats + " seats requested");
			})

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


							getPricePerDay(0);
							getPricePerDay(1);
							getPricePerDay(2);

							getFuelConsumption(0, distance);
							getFuelConsumption(1, distance);
							getFuelConsumption(2, distance);
			});
			//Defining variables to store coordinates of start and ending locations.  These are called above in the getRoute function
			var start = [];
			var end = [];
			//Finding the start location coordinates depending on what the user input was.  This is called in the click function above
			function startLocation() {
							if (pickupLocation.value === "auckland") {
										start =[174.763332, -36.848460]
							}else if(pickupLocation.value === "wellington"){
										start =[174.776236, -41.286460]
							}else if(pickupLocation.value === "queenstown"){
										start =[168.662644, -45.031162]
							}
			}
			//Finding the end location coordinates depending on what the user input was. This is called in the click function above
			function endLocation () {
							if (dropoffLocation.value === "auckland") {
										end = [174.763332, -36.848460]
							}else if(dropoffLocation.value === "wellington"){
										end = [174.776236, -41.286460]
							}else if(dropoffLocation.value === "queenstown"){
										end = [168.662644, -45.031162]
							}
			}
			//---------------------------------------------------
			// Working out prices based on distance etc
			//---------------------------------------------------


			//gets price per day of the vehicle index number multiplied by days travelled
			function getPricePerDay (indexNum) {
							var getPricePerDay = vehicleData[indexNum].pricePerDay * diffDays;
							console.log(getPricePerDay + " price to rent");
			}
			//gets getFuelConsumption for the vehicle by its corresponding index number and distance travelled
			function getFuelConsumption (indexNum, distanceToTravel) {
							console.log(distance + " is the distance travelled");
							var getFuelConsumption = distanceToTravel / 100 * vehicleData[indexNum].fuelKm;
							console.log(getFuelConsumption + " fuel consumption");
			}


}());
