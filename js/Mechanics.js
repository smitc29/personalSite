var i = 0;
var txt = " ";

$(document).ready(function(){
    $(".flip").click(function(){
        $(".panel").slideToggle("fast");
    });
});
	
$(document).ready(function(){
    $(".flip01").click(function(){
        $(".panel01").slideToggle("fast");
    });
});
	
$(document).ready(function(){
    $(".flip02").click(function(){
        $(".panel02").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip03").click(function(){
        $(".panel03").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip04").click(function(){
        $(".panel04").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip05").click(function(){
        $(".panel05").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip06").click(function(){
        $(".panel06").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip07").click(function(){
        $(".panel07").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip08").click(function(){
        $(".panel08").slideToggle("fast");
    });
});

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

$(document).ready(function(){
    $("#About").hover(function(){
        $("#AboutSection").fadeIn("fast");
    });
});

$(document).ready(function(){
    $("#Projects").hover(function(){
        $("#ProjectSection").fadeIn("fast");
    });
});

$(document).ready(function(){
    $(".flipEmployment").click(function(){
        $("#panelEmployment").fadeToggle("fast");
    });
});

$(document).ready(function(){
    $(".flipWork").click(function(){
        $("#panelWork").fadeToggle("fast");
    });
});

$(document).ready(function(){
    $(".flipEducation").click(function(){
        $("#panelEducation").fadeToggle("fast");
    });
});

/*$(document).ready(function(){
    $(".flipContact").click(function(){
        $(".panelContact").fadeToggle();
    });
});*/

$(document).ready(function(){
    $(".flipBackdrop").click(function(){
        $("#Backdrop").fadeToggle();
    });
});


function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

// Slideshow Mechanics
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-opacity-off";
}

$(document).ready(function() {
  $("#cf7_controls").on('click', 'span', function() {
    $("#cf7 img").removeClass("opaque");

    var newImage = $(this).index();

    $("#cf7 img").eq(newImage).addClass("opaque");

    $("#cf7_controls span").removeClass("selected");
    $(this).addClass("selected");
  });
});


// Functionality for Social Media Icons
/*
$(function() {
    var div = $('.SocialMediaIcon');
    var width = div.width();
    
    div.css('height', width);
});*/

/*  Functionality for Gallery  */

var getname = "Design0" + 1;
var buttname = "Button" + 1;

 
function UpdateGallery(x)
{
	"use strict";
	
	document.getElementById("Design00").className = "HideMe";
	document.getElementById("DesignDisplay").style.marginTop = "0px";
	
	if (x < 10)
	{
		getname = "Design0" + x;
	}
	else
	{
		getname = "Design" + x;
	}
	
	if(document.getElementById(getname).className !== "ShowMe") // Selected photos aren't visible
	{ 
	
		var count = 1; // Go through each variable and set its div to hidden via animation
		while(count < 8)
		{
				// Set current name 
				if (count < 10)
				{
					getname = "Design0" + count;
				}
				else
				{
					getname = "Design" + count;
				}

				buttname = "Button" + count;
				document.getElementById(buttname).classList.remove("Inverted");


				if(document.getElementById(getname).className)
				{ 
					document.getElementById(getname).className = "HideMe"; 
				}

				count++; // Next iteration of loop
		}
		
					buttname = "Button" + x;
					document.getElementById(buttname).classList.add("Inverted");
		
		
		$("#GalleryDisplay02").fadeOut(5);
		$("#GalleryDisplay03").fadeOut(5);
		$("#GalleryDisplay04").fadeOut(5);
		$("#GalleryDisplay05").fadeOut(5);
	
	switch(x)
		{
			case 7:
				if (document.getElementById("Design07").className !== "ShowMe")
					{
        		document.getElementById("Design07").className = "ShowMe";
				document.getElementById("GalleryTitle01").innerHTML = "Typography";
				document.getElementById("GalleryDesc01").innerHTML = "Type was the center of a brief study I undertook in college. Since then, several clientele have requested type-centric projects which I've completed in stride. While these projects don't have a cohesive theme, font styling is the main feature of each piece.";
				document.getElementById("GalleryDisplay02").src = "images/subimages/type03.png";
				document.getElementById("GalleryDisplay03").src = "images/subimages/type02.png";
				document.getElementById("GalleryDisplay04").src = "images/subimages/type05.png";
				document.getElementById("GalleryDisplay05").src = "images/subimages/type04.png";
					}
        		break;
			case 6:
				if (document.getElementById("Design06").className !== "ShowMe")
					{
        		document.getElementById("Design06").className = "ShowMe";
				document.getElementById("GalleryTitle01").innerHTML = "Figure Drawing";
				document.getElementById("GalleryDesc01").innerHTML = "Drawing the human form is a challenge I've been trying to get better at for several years now. Digital and web design has been my forte when it comes to art, so drawing human forms and realistic animals has been a welcome change of pace from the art I'm more comfortable with. ";
				document.getElementById("GalleryDisplay02").src = "images/subimages/fig01.png";
				document.getElementById("GalleryDisplay03").src = "images/subimages/fig02.png";
				document.getElementById("GalleryDisplay04").src = "images/subimages/fig03.png";
				document.getElementById("GalleryDisplay05").src = "images/subimages/fig04.png";
					}
        		break;
			case 5:
				if (document.getElementById("Design05").className !== "ShowMe")
					{
        		document.getElementById("Design05").className = "ShowMe";
				document.getElementById("GalleryTitle01").innerHTML = "Gaming Lounge";
				document.getElementById("GalleryDesc01").innerHTML = "While enrolled in university, my main employer was the Dragon's Lair video game lounge. The position allowed me to develop various promotional content and get more experience in the fields of graphic design, PR, and customer service.";
				document.getElementById("GalleryDisplay02").src = "images/subimages/lair01.png";
				document.getElementById("GalleryDisplay03").src = "images/subimages/lair02.png";
				document.getElementById("GalleryDisplay04").src = "images/subimages/lair03.png";
				document.getElementById("GalleryDisplay05").src = "images/subimages/lair04.png";
					}
        		break;
				
			case 4:
				if (document.getElementById("Design04").className !== "ShowMe")
					{
        		document.getElementById("Design04").className = "ShowMe";
				document.getElementById("GalleryTitle01").innerHTML = "Hotel Lobby";
				document.getElementById("GalleryDesc01").innerHTML = "3D modeling is a field I'm relatively new to, but I still felt comfortable with getting my feet wet with a few projects. This hotel lobby was made as part of a study, using Maya to model and the complete project. This project helped get me interested in game development.";
				document.getElementById("GalleryDisplay02").src = "images/subimages/hotel01.png";
				document.getElementById("GalleryDisplay03").src = "images/subimages/hotel02.png";
				document.getElementById("GalleryDisplay04").src = "images/subimages/hotel03.png";
				document.getElementById("GalleryDisplay05").src = "images/subimages/hotel04.png";
					}
        		break;
				
			case 3:
				
				
				if (document.getElementById("Design03").className !== "ShowMe")
					{
        		document.getElementById("Design03").className = "ShowMe";
				document.getElementById("GalleryTitle01").innerHTML = "Game Design";
				document.getElementById("GalleryDesc01").innerHTML = "During my junior year of college, I decided to begin studying and learning about the process of developing a board game. I ended up with a prototype of the board game, complete with package design! While the game hasn't been fully released yet, development on the title is still underway.";
				document.getElementById("GalleryDisplay02").src = "images/subimages/dungeon01.png";
				document.getElementById("GalleryDisplay03").src = "images/subimages/dungeon02.png";
				document.getElementById("GalleryDisplay04").src = "images/subimages/dungeon03.png";
				document.getElementById("GalleryDisplay05").src = "images/subimages/dungeon04.png";
					}
        		break;
				
			case 2:
				if (document.getElementById("Design02").className !== "ShowMe")
					{
						document.getElementById("Design02").className = "ShowMe";
						document.getElementById("GalleryTitle01").innerHTML = "Web Design";
						document.getElementById("GalleryDesc01").innerHTML = "From navigating this site, you've probably guessed that I have some experience designing websites. You'd be absolutely correct - I have been working with web design and programming since my Freshmen year of college.";
						document.getElementById("GalleryDisplay02").src = "images/subimages/web01.png";
						document.getElementById("GalleryDisplay03").src = "images/subimages/web02.png";
						document.getElementById("GalleryDisplay04").src = "images/subimages/web03.png";
						document.getElementById("GalleryDisplay05").src = "images/subimages/web04.png";
					}
        		
        		break;				
    		default: // 1 in this case
				if (document.getElementById("Design01").className !== "ShowMe")
					{
				document.getElementById("Design01").className = "ShowMe";
				document.getElementById("GalleryTitle01").innerHTML = "Autumn Collection";
				document.getElementById("GalleryDesc01").innerHTML = "In my softmore year of college, I produced a series using Fall colors and experiences as reference. I was invited to present my work at the Autumn Café in Oneonta, which sponsors local artists regularly. You can find the full gallery at my Behance profile.";
				document.getElementById("GalleryDisplay02").src = "images/subimages/quiet.png";
				document.getElementById("GalleryDisplay03").src = "images/subimages/fireball.png";
				document.getElementById("GalleryDisplay04").src = "images/subimages/owl.png";
				document.getElementById("GalleryDisplay05").src = "images/subimages/without.png";
					}
				break;	
				
		}
		
		$("#GalleryDisplay02").fadeIn(250);
		$("#GalleryDisplay03").fadeIn(250);
	// Prevent too many images from loading on mobile devices
		if(screen.width > 500)
		{
			$("#GalleryDisplay04").fadeIn(250);
			$("#GalleryDisplay05").fadeIn(250);
		}
		
		
		

		} // end of large if statement
	
} // End of updategallery()
