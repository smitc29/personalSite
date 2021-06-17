/* Author: Christopher Smith */
/* eslint-disable no-console */ //Enables console output

/* Runs on page load to ensure things are presented properly */
$(document).ready(function() {
    //scaleBoxText();
    console.log(document.getElementById("hamburger"));
    
    // Set Project pictures
    loadImages('proj01img', './images/match3.jpg');
    loadImages('proj02img', './images/checkers.jpg');
    loadImages('proj03img', './images/benBisognoProfile.jpg');
    
    
    // Set Education pictures
    loadImages('school01img', './images/Logo-georgiaTech.jpg');
    loadImages('school02img', './images/Logo-comptia.png');
    loadImages('school03img', './images/Logo-suny.jpg');
    loadImages('school04img', './images/Logo-brewster.png');
    
    // Set Employment pictures
    loadImages('work01img', './images/Logo-collins.jpg');
    loadImages('work02img', './images/Logo-Qualitest.png');
    loadImages('work03img', './images/Logo-iDTech.png');
    
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
    $("#hamburgerHelper").fadeToggle("fast");
    $("#mobilenav").css("opacity", "1.0");   
    $(".ham").fadeToggle();
    $(".hamhock").fadeToggle();
    $(".hamcore").fadeToggle();
    return false;
}

/* Ensures images don't appear until fully loaded */
function loadImages(myID, myURL) {
    
    var img = new Image();
    var imgUrl = myURL;
    img.onload = function(){
        // this gets run once the image has finished downloading
        document.getElementById(myID).src = imgUrl;
    }
    img.src = imgUrl; // this causes the image to get downloaded in the background
    console.log(img);

}
