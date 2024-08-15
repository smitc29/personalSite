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
    loadImages('work04img', './images/Logo-fitzelle.jpg');
    loadImages('work05img', './images/Logo-DragonLair.png');
    loadImages('work06img', './images/Logo-UlsterBOCES.png');
    
});

/* Adjust size of video player whenever browser window changes size with JQuery */
$(window).resize(function() {

	console.log("Window has been resized!!!");
	
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
/* End of function loadImages() */

/* Causes screen to scroll down when user clicks experience buttons on mobile device */
function mobileShowExperience(target)
{
    // If button is being deselected, don't move the page
    if(target.classList.contains("selected") == false)
    { 
        return 0;
        console.log(target.id + " is being deselected");
    }
      
    var y = $(window).scrollTop();  // User's current y position on the page
  
    // Only scroll if we're on mobile view
    if(window.innerWidth < 501)
    {
        $(window).scrollTop(y + 200);               
    }
        
} /* End of function mobileShowExperience() */


function testfunction()
{
    console.log(1);
    setTimeout(console.log(2),0);
    setTimeout(console.log(3),10);
    console.log(4);
}