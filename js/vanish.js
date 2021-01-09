$(document).ready(function(){
       $(window).bind('scroll', function() {
       var distance = 500;
             if ($(window).scrollTop() > distance) {
                 $('nav').fadeIn(500);
				 $('aside').fadeIn(500);
				
             }
             else {
                 $('nav').fadeOut(500);
				 $('aside').fadeOut(500);
             }
		   	
		     if ($(window).scrollTop() > distance) {
                 $('header').fadeOut(500);				 
             }
		   
		   	
             
		 });
    });

