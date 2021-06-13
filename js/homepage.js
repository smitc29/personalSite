/* Author: Christopher Smith */
/* eslint-disable no-console */ //Enables console output

$(document).ready(function() {
    //scaleBoxText();
    console.log(document.getElementById("hamburger"));
});

/* Toggles X icon and mobile nav menu on click  */


/* Adjust size of video player whenever browser window changes size with JQuery */
$(window).resize(function() {

	scaleBoxText();
	
});

/* Hides or displays mobile nav menu */
function toggleNavMenu()
{   
    var nav = document.getElementById("mobilenav");
    nav.style.opacity = "1.0";
    console.log(nav.style.opacity);
    $("#mobilenav").fadeToggle("fast");
    $("#mobilenav").css("opacity", "1.0");   
    $(".ham").fadeToggle();
    $(".hamhock").fadeToggle();
    $(".hamcore").fadeToggle();
    return false;
}

/* Ensures images don't appear until fully loaded */
function LoadImages() {
    

}
