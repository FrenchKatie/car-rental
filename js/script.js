$(document).ready(function() {
			$('#pagepiling').pagepiling({
					normalScrollElements: '#vehicleContent'
			});

			$( "#dateLeave" ).datepicker();
			$( "#dateReturn" ).datepicker();

			// $.fn.pagepiling.setAllowScrolling(false);
			//
			// $( "#bla" ).click(function() {
			//   	$.fn.pagepiling.moveSectionDown();
			// });


			// $('#bikeInfoBtn').click(function(){
	    //   $("#bikeInfo").slideToggle();
			// });
			$('#bikeInfoBtn').click(function(){
	      toggleItemInfo();
			});

			// $('#smlCarInfoBtn').click(function(){
	    //   $("#smlCarInfo").slideToggle();
			// });


			function toggleItemInfo(event){
						event.target.slideToggle();
			}

});
