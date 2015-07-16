  $(document).ready(function(){
  
  
      $('select').material_select();
	  
	  $('.datepicker').pickadate({
       selectMonths: true, // Creates a dropdown to control month
       selectYears: 25 // Creates a dropdown of 15 years to control year
       });
	 
		initNavigation();
		
	 
    });
	
	function initNavigation(){
		
		$pages = [ "personal", "official", "professional" ];
		$current = 0;
		$next = 1;
		
		//Disable all the tabs
		$("#registration-card-container .tab:nth-child(n+2)").addClass("disabled");
		//Disable the back button
		$("#back-btn").addClass("disabled");
		//Hide submit Button
		//$("#registration-submit-btn").hide();
		
		$("#next-btn").on("click", function(){
			$("#"+$pages[$current]+"-tab").addClass("disabled");
			$current++;
			
			$("#"+$pages[$next]+"-tab").removeClass("disabled");
			$('ul.tabs').tabs('select_tab', $pages[$next]);
			$next++;
			
			checkForPageNumber($current);
		});
		
		$("#back-btn").on("click", function(){
			$("#"+$pages[$current]+"-tab").addClass("disabled");
			$current--;
			
			$("#"+$pages[$current]+"-tab").removeClass("disabled");
			$('ul.tabs').tabs('select_tab', $pages[$current]);
			$next--;
			
			checkForPageNumber($current);
		});
	}

	
	function checkForPageNumber($current){
		if($current == 0){
				//Disable the back button
				$("#back-btn").addClass("disabled");
			}
			else {
				//Enable the back button
				$("#back-btn").removeClass("disabled");
			}
			
			if( $current == 2 ){
				$("#next-btn").hide();
				//$("#registration-submit-btn").show();
			}
			
			if(($("#next-btn").is(":hidden")) && $current < 2){
				$("#next-btn").show();
				//$("#registration-submit-btn").hide();
			}
	}