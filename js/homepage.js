/* Author: Christopher Smith */
/* eslint-disable no-console */ //Enables console output


$(document).ready(function() {
    //scaleBoxText();
});

/* Toggles X icon and mobile nav menu on click  */
function navToggle()
{
	var bars = document.getElementById("mobileNav").getElementsByTagName("span");
	var anchors = document.getElementById("mobileNavMenu").getElementsByTagName("a");
	var i = 0;
	console.log(anchors.length);
	
	if(bars[1].style.opacity != 0.0) // mobileNavMenu isn't visible, let's change that
    {
		// Toggle middle sandwich bar, make the menu backdrop visible
		bars[1].style.opacity = 0.0;
		document.getElementById("mobileNavMenu").style.opacity = 1.0;
		document.getElementById("mobileNavMenu").style.visibility = "visible";
		
		
		// Displays and enables all links on nav Menu to enable easier navigation
		for(i = 0; i < anchors.length; i ++)
		{
			anchors[i].style.visibility = "visible";
		}
		
		// Set hamburger bars to change color when mobile menu becomes visible
		for(i = 0; i < bars.length; i ++)
		{
			bars[i].style.backgroundColor = "white";
		}		
    }
	else // mobileNavMenu is visible, so let's hide it & menu items
	{
		// Show middle sandwich bar, make the menu backdrop invisible
		bars[1].style.opacity = 1.0;
		document.getElementById("mobileNavMenu").style.opacity = 0.0;
		document.getElementById("mobileNavMenu").style.visibility = "hidden";
		
		// Hides all links on nav Menu to prevent accidental clicks
		for(i = 0; i < anchors.length; i ++)
		{
			anchors[i].style.visibility = "hidden";
		}
		
		// Set hamburger bars to change color when mobile menu becomes visible
		for(i = 0; i < bars.length; i ++)
		{
			bars[i].style.backgroundColor = "black";
		}	
	}
	bars[0].classList.toggle("southWest");
	bars[2].classList.toggle("northEast");
		
} // End of function navToggle()

/* Adjust size of video player whenever browser window changes size with JQuery */
$(window).resize(function() {

	scaleBoxText();
	
});

/* Scales text size in boxes relative to proportions of box width */
function scaleBoxText()
{
	// EDIT THIS for mobile site!!! It needs to be completely different for mobile users
	var boxWidth = parseInt(document.getElementById("box01").clientWidth);
	var boxWords = document.getElementsByClassName("boxword");
	
	// Loop through and change every instance of boxWord font size to fit box best
	var i = 0;
	for(i = 0; i < boxWords.length; i++)
	{
		boxWords[i].style.fontSize = (boxWidth/8) + "pt";
	}
	
} // End of function scaleBoxText
