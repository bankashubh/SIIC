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
		//Disable the back button and next button
		$("#back-btn").addClass("disabled");
		$("#next-btn").addClass("disabled");
		
		//Hide error-message
		$("#error-msg").hide();
		
		//Prevent submit on enter
		preventEnter();
		
		$("#"+$pages[$current]+"-tab ~ li a").addClass("red-text");
		
		console.log($("#"+$pages[$current]+" input"));
		$("#"+$pages[$current]+" input").on("keyup change mouseenter", checkForEmptyFields);
		
		$("#registration-submit-btn").on("focus submit click", function(){
			checkForEmptyFields();
			if($(this).hasClass("disabled")){
				$("#error-msg").fadeIn().delay(1000).fadeOut("slow");
				return;
			}
		});
		
		$("#next-btn").on("click", function(){
			checkForEmptyFields();
			
			if($(this).hasClass("disabled")){
				$("#error-msg").fadeIn().delay(1000).fadeOut("slow");
				return;
			}
			
			$("#"+$pages[$current]+"-tab").addClass("disabled");
			$current++;
			
			$("#"+$pages[$next]+"-tab").removeClass("disabled");
			$("#"+$pages[$current]+"-tab a").removeClass("red-text");
			$('ul.tabs').tabs('select_tab', $pages[$next]);
			$next++;
			
			$("#"+$pages[$current]+" input")
			.on("keyup change mouseenter", checkForEmptyFields);
			$("#"+$pages[$current]+" select")
			.on("keyup change mouseenter", checkForEmptyFields);
			
			checkForPageNumber($current);
		});
		
		$("#back-btn").on("click", function(){
			if($current==0)
				return;
			$("#"+$pages[$current]+"-tab").addClass("disabled");
			$current--;
			
			$("#"+$pages[$current]+"-tab").removeClass("disabled");
			$("#"+$pages[$current]+"-tab").removeClass("green-text");
			$('ul.tabs').tabs('select_tab', $pages[$current]);
			$next--;
			
			checkForPageNumber($current);
		});
	}

	
	function checkForPageNumber($current){
		if($current == 0)
			$("#back-btn").addClass("disabled");
		else
			$("#back-btn").removeClass("disabled");
		
		if( $current == $pages.length-1 )
			$("#next-btn").hide();
		
		if(($("#next-btn").is(":hidden")) && $current < $pages.length-1)
			$("#next-btn").show();
		
		$previousTabs = $current-1;
		while($previousTabs >= 0)
			$("#"+$pages[$previousTabs--]+"-tab a").addClass("green-text");
		$("#"+$pages[$current]+"-tab ~ li a").addClass("red-text");
		
	}
	
	function preventEnter(){
		$(window).keydown(function(event){
			if(event.keyCode == 13) {
				$form = $("#registration-form input, #registration-form select");
				$form.each(function(){
					if(!$(this).val())
						event.preventDefault();
				});
				return false;
			}
		});
	}
	
	var checkForEmptyFields = (function(){
		$("#"+$pages[$current]+" input, #"+$pages[$current]+" select").each(function(){
				if(!$(this).val()){
					$("#next-btn, #registration-submit-btn").addClass("disabled");
					return false;
				}	
				$("#next-btn, #registration-submit-btn").removeClass("disabled");
			});
	});