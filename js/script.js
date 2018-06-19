(function() {

// *** FRONT END JS ***

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
			$( "#dateLeave" ).datepicker();
			$( "#dateReturn" ).datepicker();

			//------------------------------
			//Toggling Item Info Dynamically
			//------------------------------
			$(".moreInfoBtn").click(function(){
					 	// console.dir(this);
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
			var leaveDate = document.getElementById('dateLeave');
			var returnDate = document.getElementById('dateReturn');
			var seatNumber = document.getElementById('seats');


			$("#sectionOneSubmitBtn").click(function(){
						getSeats();
						getDates();
			})
			//Storing the users seat input in a variable
			function getSeats() {
						var userSeat = seatNumber.value
						console.log(userSeat);
			}

			//Storing the users date inputs in variables
			function getDates() {
						var date1 = new Date(leaveDate.value);
						var date2 = new Date(returnDate.value);
						//Getting the difference between the two dates
						var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
						console.log(diffDays);
			}

			//----------------------------------------------
			// Showing vehicles that match date & seat needs
			//----------------------------------------------





			//--------------------------------------
			// Mapping Route & Getting User location
			//--------------------------------------

			var pickupLocation = document.getElementById('inputGroupSelect1');
			var dropoffLocation = document.getElementById('inputGroupSelect2');
			var getUserPickupLocation = pickupLocation.value;
			var getUserDropoffLocation = dropoffLocation.value;
			var test = document.getElementById('test');


			//On click event listener
			test.addEventListener('click', function (e) {
						e.preventDefault();
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

}());
