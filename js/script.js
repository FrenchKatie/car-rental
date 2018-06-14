(function() {

			//Page Piling Plugin
			//------------------
			$('#pagepiling').pagepiling({
					normalScrollElements: '.halfScreen'
			});
			// $.fn.pagepiling.setAllowScrolling(false);



			//Jquery UI Date Picker
			//---------------------
			$( "#dateLeave" ).datepicker();
			$( "#dateReturn" ).datepicker();



			//Toggling Item Info Dynamically
			//------------------------------
			$(".moreInfoBtn").click(function(){
					 	console.dir(this);
				 	 	$(this).next().slideToggle();
			 })


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





}());
