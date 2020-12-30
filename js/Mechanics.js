var i = 0;
var txt = " ";

$(document).ready(function(){
    $(".flipMenu").click(function(){
        $(".panelMenu").fadeToggle("fast");
    });
});

$(document).ready(function(){
    $(".panelMenu").click(function(){
        $(".panelMenu").fadeToggle("fast");
    });
});

// Handle page scrolling effect on load
$(document).ready(function(){
	
		// Whenever the user scrolls, trigger this function call
		$(window).bind('scroll', function() {	
			
  			// This value measures how far from the top of the page we are visually
		   	var distance = 500;
			
             if ($(window).scrollTop() > distance) {
                 $('nav').fadeIn(500);
				 $('aside').fadeIn(500);
				
             }
             else 
			 {
                 $('nav').fadeOut(500);
				 $('aside').fadeOut(500);
             }
		   	
		     if ($(window).scrollTop() > distance) {
                 $('header').fadeOut(500);				 
             }           
});
});

