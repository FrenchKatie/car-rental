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





}());
