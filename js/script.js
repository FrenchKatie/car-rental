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
					 	console.dir(this);
				 	 	$(this).next().slideToggle();
			})




			//-------
			//Map Box
 			//-------
			mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0aWVmcmVuY2giLCJhIjoiY2ppM240MGFyMDA5cTNrbDJwNTkwYWZmOSJ9.vMh53hzHle4vA4uwg0TE6A';

      var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v9',
                center: [-79.4512, 43.6568],
                zoom: 13
      });

      map.addControl(new MapboxDirections({
                accessToken: mapboxgl.accessToken
      }), 'top-left');

			var directions = new MapboxDirections({
								accessToken:
									'pk.eyJ1Ijoia2F0aWVmcmVuY2giLCJhIjoiY2ppM240MGFyMDA5cTNrbDJwNTkwYWZmOSJ9.vMh53hzHle4vA4uwg0TE6A',
								unit: 'metric',
								profile: 'mapbox/driving'
			});

			directions.on('route', function(directions) {
								console.dir(directions.route[0].distance / 1000 + 'kms');
								console.dir(locationInputOne.value);
								console.dir(locationInputTwo.value);
			});


// *** LOGIC JS ***


			//-------------------------
			// Array of Objects (Vehicles)
			//-------------------------


			var vehicles = [
							motorbike = {
										minSeats: 1,
										maxSeats: 1,
										pricePerDay: 109,
										minDays: 1,
										maxDays: 5,
										fuelKm: 3.7
							},
							smallCar = {
										minSeats:1,
										maxSeats:2,
										pricePerDay: 129,
										minDays: 1,
										maxDays: 10,
										fuelKm: 8.5
							},
							largeCar = {
										minSeats:1,
										maxSeats:5,
										pricePerDay: 144,
										minDays:2,
										maxDays: 10,
										fuelKm:9.7
							},
							motorhome = {
										minSeats: 2,
										maxSeats: 6,
										pricePerDay: 200,
										minDays: 2,
										maxDays: 15,
										fuelKm: 17
							}
			]


			$(".submitBtn").click(function(){
						console.dir(pickupDate.value);
						console.dir(dropoffDate.value);
						console.dir(seats.value);
			})


			var pickupDate = document.getElementById('dateLeave');
			var dropoffDate = document.getElementById('dateReturn');
			var seats = document.getElementById('seats');
			var locationInputOne = document.getElementById('map').children[2].children["0"].children["0"].childNodes["0"].children["0"].children["0"].childNodes[1].childNodes[3].childNodes["0"].children[1];
			var locationInputTwo = document.getElementById("map").childNodes[2].children["0"].children["0"].children["0"].children["0"].children["0"].children[2].children[1].children["0"].children[1];
			var defaultTransportTypeInput = document.getElementById('map').childNodes[2].children["0"].children["0"].children["0"].children["0"].children[1];

			defaultTransportTypeInput.style.display = "none";



			// var date1 = new Date("7/13/2010");
			// var date2 = new Date("12/15/2010");
			// var timeDiff = date2.getTime() - date1.getTime();
			// var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
			// alert(diffDays);






}());
