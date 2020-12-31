/*eslint-env browser*/
/* eslint-disable no-console */ //Enables console output

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

// These functions are prepped as soon as the site loads initially
$(document).ready(function(){
	
		// Whenever the user scrolls on the page, trigger this function call
		$(window).bind('scroll', function() {	
			
			scrollChecker();
});
});


/* Function examines where viewer is on page, adjusts visibility of desktop nav and accordingly */
function scrollChecker()
{
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
}
// End function scrollChecker()

/* Adds a cookie to the site. Normally triggers 2 seconds after page loads */
function addCookieToPage()
{
	document.cookie = "returning=true";
	console.log("A cookie has been created for this page.");
}
// End function addCookieToPage()

/* On page load, examines if cookie exists for page; if none exist, make one */
function checkIfCookiePresent()
{
	// Obtain site cookie and turn its properties into array
	var decodedCookie = decodeURIComponent(document.cookie);
	var save = decodedCookie.split(';');
	console.log(save);
	
	// If there's a cookie from this page before that meets the expected criteria...
	if(save[0]=='returning=true')
	{
		// Bypass intro fading sequence, and immediately display name and starting links
		console.log("Bypassing intro animation");
		document.getElementsByTagName("Header")[0].style.display = 'None';
		scrollChecker();
		document.getElementById("Chris01").style.animationDuration = "0s";
		document.getElementById("Smith01").style.animationDuration = "0s";
		document.getElementsByClassName("ChrisName")[0].classList.add("disableAnimations");
		document.getElementsByClassName("SmithName")[0].classList.add("disableAnimations");
		
		// Displays 5 main links directly below title area on reload
		var mainLinks = document.getElementsByTagName("a");
		for(var i = 0; i < mainLinks.length; i++)
		{
			mainLinks[i].style.animationDuration = "0s";
			mainLinks[i].style.animationDelay = "0s";
		}
	}
	// Otherwise, create a cookie after a 2 second delay
	else
	{
		setTimeout(addCookieToPage, 2000); // try again in 2 seconds
	}
		
}
// End function checkIfCookiePresent()
