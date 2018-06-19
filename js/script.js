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

			//-------
			//Map Box
 			//-------

			// function createMap () {
			// 	//get input fields
			// 	var pickupLocation = document.getElementById('inputGroupSelect1');
			// 	var dropoffLocation = document.getElementById('inputGroupSelect2');
			// 	//get user input locations
			// 	var getUserPickupLocation = pickupLocation.value;
			// 	var getUserDropoffLocation = dropoffLocation.value;
			// 	//Get drop off same as pickup
			// 	//----if statement where getUserPickupLocation and getUserDropoffLocation will = eachother
			// 	//Get coordinates
			//
			//
			//
			// }



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

			map.on('load', function() {
			  				getRoute();
			});

			var start = [];
			var end = [];

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





// *** LOGIC JS ***



			//--------------------------------------
			// Getting user input of Dates & Seats
			//--------------------------------------
			var leaveDate = document.getElementById('dateLeave');
			var returnDate = document.getElementById('dateReturn');
			var seatNumber = document.getElementById('seats');



			$("#sectionOneSubmitBtn").click(function(){
				//Getting the difference between the two dates
						var date1 = new Date(leaveDate.value);
						var date2 = new Date(returnDate.value);
						var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
						// alert(diffDays)
						console.log(diffDays);
						console.log(seatNumber);



			})

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

			}); //end of click event

			function startLocation() {
							if (pickupLocation.value === "auckland") {
										// console.dir(locationData["0"].coordinates);
										start.push(locationData["0"].coordinates);
										console.log(start);
							}else if(pickupLocation.value === "wellington"){
										// console.log(locationData["1"].coordinates);
										start.push(locationData["1"].coordinates);
										console.log(start);
							}else if(pickupLocation.value === "queenstown"){
										// console.log(locationData["2"].coordinates);
										start.push(locationData["2"].coordinates);
										console.log(start);
							}
			}

			function endLocation () {
							if (dropoffLocation.value === "auckland") {
										// console.dir(locationData["0"].coordinates);
										end.push(locationData["0"].coordinates);
										console.log(end);
							}else if(dropoffLocation.value === "wellington"){
										// console.log(locationData["1"].coordinates);
										end.push(locationData["1"].coordinates);
										console.log(end);
							}else if(dropoffLocation.value === "queenstown"){
										// console.log(locationData["2"].coordinates);
										end.push(locationData["2"].coordinates);
										console.log(end);
							}
			}

}());
